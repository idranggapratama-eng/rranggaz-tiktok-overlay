/**
 * HEADER COMPONENT (MAGIC CHESS EDITION)
 * Renders Official MLBB Logo, RANZ GAMING, Animated Little Commander Hero Icon,
 * Live status, and dynamic viewer counter.
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
      <div class="header-container magic-chess-theme">
        <!-- Top Status Bar -->
        <div class="header-top-bar">
          <div class="status-live-badge">
            <span class="live-pulse-dot"></span>
            <span>LIVE MAGIC CHESS</span>
          </div>

          <div class="header-clock" id="headerClock">00:00:00</div>

          <div class="viewer-counter-badge">
            <span class="eye-icon">👁️</span>
            <span id="viewerCountNum">-</span>
          </div>
        </div>

        <!-- Main Branding Identity with MLBB Logo & Animated Hero Icon -->
        <div class="header-branding">
          <!-- Left: MLBB Official Logo + RANZ GAMING -->
          <div class="brand-left-with-logo">
            <div class="mlbb-logo-wrapper">
              <img src="${streamConfig.logo.src}" alt="MLBB Logo" class="mlbb-gold-crest">
            </div>

            <div class="brand-text-stack">
              <h1 class="brand-streamer-name" id="brandStreamerName">${streamConfig.streamerName}</h1>
              <div class="brand-game-title">
                <span>⚔️</span> ${streamConfig.gameTitle}
              </div>
              <div class="commander-tag-pill">
                <span class="commander-rank-stars">⭐⭐⭐⭐⭐</span>
                <span>MYTHIC COMMANDER</span>
              </div>
            </div>
          </div>

          <!-- Right: ANIMATED MAGIC CHESS COMMANDER HERO ICON -->
          <div class="brand-right-commander">
            <div class="commander-avatar-portal">
              <div class="portal-ring-outer"></div>
              <div class="portal-ring-runes"></div>
              <div class="commander-avatar-inner">
                <img src="${streamConfig.hero.src}" alt="Magic Chess Commander" class="commander-avatar-img">
              </div>
              <div class="portal-floating-star">★</div>
            </div>

            <div class="commander-social-stack">
              <div class="tiktok-handle-pill" id="brandTiktokHandle">
                <span>🎵</span>
                <span>${streamConfig.tiktokUsername}</span>
              </div>
              <div class="tagline-text">${streamConfig.tagline}</div>
            </div>
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
    setInterval(updateClock, 1000);
    updateClock();
  }

  initSubscriptions() {
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

    streamState.subscribe('liveStatus', (isLive) => {
      const liveBadge = this.container.querySelector('.status-live-badge');
      if (liveBadge) {
        liveBadge.style.opacity = isLive ? '1' : '0.4';
      }
    });
  }
}
