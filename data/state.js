/**
 * REACTIVE STREAM STATE STORE
 * Manages dynamic stream state with event subscriptions.
 * ZERO DUMMY DATA - Pure real-time state with clean empty fallbacks.
 */

class StreamStateStore {
  constructor() {
    this.state = {
      liveStatus: true,
      viewerCount: null,       // Renders "-" when null
      latestFollower: null,    // Renders "Belum ada data" when null
      latestSubscriber: null,  // Renders "Belum ada data" when null
      latestDonation: null,    // Renders "Belum ada data" when null
      topDonor: null,          // Renders "Belum ada data" when null
      chatMessages: []         // Renders "Menunggu chat..." empty state when []
    };

    this.subscribers = new Map();
  }

  // Subscribe to state changes on a specific key
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);

    // Immediate callback with current state
    callback(this.state[key]);

    // Return unsubscribe function
    return () => {
      const set = this.subscribers.get(key);
      if (set) set.delete(callback);
    };
  }

  // Update a single key or multiple keys
  set(key, value) {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this.notify(key, value);
    }
  }

  get(key) {
    return this.state[key];
  }

  // Append a live chat message
  addChatMessage(message) {
    // message: { id, user, text, badge, timestamp }
    const updated = [...this.state.chatMessages, message];
    // Keep last 15 messages max for memory efficiency
    if (updated.length > 15) updated.shift();
    this.state.chatMessages = updated;
    this.notify('chatMessages', this.state.chatMessages, message);
  }

  notify(key, value, extra) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(value, extra);
        } catch (err) {
          console.error(`Error in state subscriber for ${key}:`, err);
        }
      });
    }
  }
}

export const streamState = new StreamStateStore();
