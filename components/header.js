/**
 * HEADER COMPONENT
 * Renders RANZ GAMING branding, status, clock, and viewer counter.
 */

import { streamConfig } from '../config/streamConfig.js';
import { streamState } from '../data/state.js';
import { AnimationManager } from '../animations/animationManager.js';

export class HeaderComponent {
  constructor(container) {
    this.container = container;
    this.viewerCounterEl = null;
    this.clockEl = null;
    this.currentViewerCount = 0;
  }

  render() {
    this.container.innerHTML = `
      <div class="header-container">
        <!-- Top Status Bar -->
        <div class="header-top-bar">
          <div class="status-live-badge">
            <span class="live-pulse-dot"></span>
            <span>LIVE STREAM</span>
          </div>

          <div class="header-clock" id="headerClock">00:00:00</div>

          <div class="viewer-counter-badge">
            <span class="eye-icon">👁️</span>
            <span id="viewerCountNum">-</span>
          </div>
        </div>

        <!-- Main Branding Identity -->
        <div class="header-branding">
          <div class="brand-left">
            <h1 class="brand-streamer-name" id="brandStreamerName">${streamConfig.streamerName}</h1>
            <div class="brand-game-title">${streamConfig.gameTitle}</div>
          </div>

          <div class="brand-right">
            <div class="tiktok-handle-pill" id="brandTiktokHandle">
              <span>🎵</span>
              <span>${streamConfig.tiktokUsername}</span>
            </div>
            <div class="tagline-text">${streamConfig.tagline}</div>
          </div>
        </div>
      </div>
    `;

    this.viewerCounterEl = this.container.querySelector('#viewerCountNum');
    this.clockEl = this.container.querySelector('#headerClock');

    this.initClock();
    this.initSubscriptions();
  }

  initClock() {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      if (this.clockEl) this.clockEl.textContent = `${h}:${m}:${s}`;
    };
    setInterval(update, 1000);
    update();
  }

  initSubscriptions() {
    // Dynamic viewer count subscription
    streamState.subscribe('viewerCount', (newCount) => {
      if (!this.viewerCounterEl) return;
      if (newCount === null || newCount === undefined) {
        this.viewerCounterEl.textContent = '-';
        this.currentViewerCount = 0;
      } else {
        AnimationManager.animateValue(this.viewerCounterEl, this.currentViewerCount, newCount, 600);
        this.currentViewerCount = newCount;
      }
    });

    // Live status toggle
    streamState.subscribe('liveStatus', (isLive) => {
      const liveBadge = this.container.querySelector('.status-live-badge');
      if (liveBadge) {
        liveBadge.style.opacity = isLive ? '1' : '0.4';
      }
    });
  }
}
