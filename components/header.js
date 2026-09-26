/**
 * HEADER COMPONENT (NATURAL & CLEAN MAGIC CHESS EDITION)
 * Pure authentic esports header.
 * NO artificial LIVE indicator, NO fake clocks, NO dummy viewer counters.
 * Features Official MLBB Logo, RANZ GAMING, @rranggaz_, and Animated Little Commander Hero Icon.
 */

import { streamConfig } from '../config/streamConfig.js';

export class HeaderComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="header-container clean-natural">
        <div class="header-branding-row">
          <!-- Left: Official Golden MLBB Logo -->
          <div class="mlbb-logo-container">
            <img src="${streamConfig.logo.src}" alt="Mobile Legends Bang Bang" class="mlbb-gold-crest">
          </div>

          <!-- Center: RANZ GAMING & MAGIC CHESS Title -->
          <div class="streamer-title-group">
            <h1 class="brand-streamer-name">${streamConfig.streamerName}</h1>
            <div class="brand-game-title">
              <span class="game-sword-icon">⚔️</span>
              <span>${streamConfig.gameTitle}</span>
            </div>
            <div class="streamer-badge-pills">
              <span class="badge-pill gold-rank">⭐ MYTHIC COMMANDER</span>
              <span class="badge-pill tiktok-tag">🎵 ${streamConfig.tiktokUsername}</span>
            </div>
          </div>

          <!-- Right: ANIMATED MAGIC CHESS LITTLE COMMANDER HERO ICON -->
          <div class="commander-hero-badge">
            <div class="commander-portal-ring">
              <div class="portal-outer-spin"></div>
              <div class="portal-inner-runes"></div>
              <div class="commander-img-wrap">
                <img src="${streamConfig.hero.src}" alt="Magic Chess Commander" class="commander-chibi-img">
              </div>
              <div class="portal-star-sparkle">★</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
