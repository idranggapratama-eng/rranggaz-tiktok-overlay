/**
 * LIVE DATA ADAPTER (ABSTRACTION LAYER)
 * Decouples the UI and overlay components from specific stream data sources.
 * Supports TikTok Live Connectors, TikFinity, WebSockets, REST APIs, or local events.
 */

import { streamState } from '../data/state.js';

export class LiveDataAdapter {
  constructor(options = {}) {
    this.options = {
      wsUrl: options.wsUrl || null,       // e.g. 'ws://localhost:21213/' for TikFinity / TikTok Live Connector
      restUrl: options.restUrl || null,
      pollInterval: options.pollInterval || 5000,
      autoConnect: options.autoConnect || false
    };

    this.socket = null;
    this.eventListeners = new Map();
    this.pollTimer = null;

    if (this.options.autoConnect && this.options.wsUrl) {
      this.connectWebSocket(this.options.wsUrl);
    }
  }

  // --- Abstract Interface Methods (Required by Spec) ---
  getViewerCount() {
    return streamState.get('viewerCount');
  }

  getChatMessages() {
    return streamState.get('chatMessages');
  }

  getLatestFollower() {
    return streamState.get('latestFollower');
  }

  getLatestSubscriber() {
    return streamState.get('latestSubscriber');
  }

  getLatestDonation() {
    return streamState.get('latestDonation');
  }

  getTopDonations() {
    return streamState.get('topDonor');
  }

  getLiveStatus() {
    return streamState.get('liveStatus');
  }

  // --- Event Subscription ---
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
    return () => this.eventListeners.get(event).delete(callback);
  }

  emit(event, data) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(cb => cb(data));
    }
  }

  // --- Ingestion Handlers (Receives from External API / Webhook / WebSocket) ---
  handleViewerCount(count) {
    streamState.set('viewerCount', typeof count === 'number' ? count : parseInt(count, 10));
    this.emit('viewerCount', count);
  }

  handleNewFollower(followerName) {
    streamState.set('latestFollower', followerName);
    this.emit('newFollower', followerName);
  }

  handleNewSubscriber(subscriberName) {
    streamState.set('latestSubscriber', subscriberName);
    this.emit('newSubscriber', subscriberName);
  }

  handleDonation(donationData) {
    // donationData: { donor: "Name", amount: "Rp 50.000", gift: "Mawar x100" }
    streamState.set('latestDonation', donationData);
    this.emit('donation', donationData);
  }

  handleTopDonor(topDonorData) {
    streamState.set('topDonor', topDonorData);
    this.emit('topDonor', topDonorData);
  }

  handleChatMessage(chatData) {
    // chatData: { user: "Name", text: "Message", badge?: "MOD"|"VIP" }
    const msg = {
      id: Date.now() + Math.random().toString(36).substr(2, 4),
      user: chatData.user || 'Viewer',
      text: chatData.text || '',
      badge: chatData.badge || null,
      timestamp: Date.now()
    };
    streamState.addChatMessage(msg);
    this.emit('chatMessage', msg);
  }

  // --- Optional WebSocket Connection for Real TikTok Live Connector ---
  connectWebSocket(url) {
    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('[LiveDataAdapter] Connected to WebSocket at:', url);
        this.emit('connected', { url });
      };

      this.socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.parseIncomingPayload(payload);
        } catch (err) {
          console.error('[LiveDataAdapter] Failed to parse WebSocket payload:', err);
        }
      };

      this.socket.onerror = (err) => {
        console.warn('[LiveDataAdapter] WebSocket error:', err);
      };

      this.socket.onclose = () => {
        console.log('[LiveDataAdapter] WebSocket closed.');
        this.emit('disconnected', {});
      };
    } catch (e) {
      console.warn('[LiveDataAdapter] Cannot connect to WebSocket:', e);
    }
  }

  parseIncomingPayload(payload) {
    // Standard payload mapping
    if (!payload || !payload.type) return;

    switch (payload.type) {
      case 'chat':
        this.handleChatMessage({
          user: payload.nickname || payload.uniqueId || payload.user,
          text: payload.comment || payload.text,
          badge: payload.badge
        });
        break;
      case 'member':
      case 'follow':
        this.handleNewFollower(payload.nickname || payload.uniqueId || payload.user);
        break;
      case 'subscribe':
        this.handleNewSubscriber(payload.nickname || payload.uniqueId || payload.user);
        break;
      case 'gift':
      case 'donation':
        this.handleDonation({
          donor: payload.nickname || payload.uniqueId || payload.user,
          amount: payload.diamondCount ? `${payload.diamondCount} 💎` : payload.amount,
          gift: payload.giftName || 'Gift'
        });
        break;
      case 'roomUser':
      case 'viewers':
        this.handleViewerCount(payload.viewerCount || payload.count);
        break;
      default:
        break;
    }
  }
}

export const liveDataAdapter = new LiveDataAdapter();
