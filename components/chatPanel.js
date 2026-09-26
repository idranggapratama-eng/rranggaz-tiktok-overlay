/**
 * LIVE CHAT COMPONENT
 * Renders dynamic live chat feed from real data adapters.
 * Displays "Menunggu chat..." empty state when no messages exist. ZERO DUMMY DATA.
 */

import { streamState } from '../data/state.js';

export class ChatPanelComponent {
  constructor(container) {
    this.container = container;
    this.messagesContainer = null;
  }

  render() {
    this.container.innerHTML = `
      <div class="chat-panel-box">
        <div class="chat-header-bar">
          <div class="chat-title-tag">
            <span class="chat-dot-live"></span>
            <span>LIVE CHAT</span>
          </div>
          <span class="chat-subnote">TIKTOK STREAM</span>
        </div>

        <div class="chat-messages-scroll" id="chatMessagesContainer">
          <div class="chat-empty-state" id="chatEmptyState">
            Menunggu chat...
          </div>
        </div>
      </div>
    `;

    this.messagesContainer = this.container.querySelector('#chatMessagesContainer');
    this.emptyStateEl = this.container.querySelector('#chatEmptyState');

    this.initSubscription();
  }

  initSubscription() {
    streamState.subscribe('chatMessages', (messages) => {
      if (!this.messagesContainer) return;

      if (!messages || messages.length === 0) {
        this.messagesContainer.innerHTML = `
          <div class="chat-empty-state" id="chatEmptyState">
            Menunggu chat...
          </div>
        `;
        return;
      }

      // Render actual dynamic messages
      this.messagesContainer.innerHTML = '';
      messages.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `
          <span class="user-nick">${this.escapeHtml(msg.user)}:</span>
          <span class="user-msg">${this.escapeHtml(msg.text)}</span>
        `;
        this.messagesContainer.appendChild(bubble);
      });

      // Auto scroll to latest
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    });
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}
