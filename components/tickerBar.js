/**
 * TICKER BAR COMPONENT
 * Renders smooth continuous moving marquee below the gameplay frame.
 */

import { streamConfig } from '../config/streamConfig.js';

export class TickerBarComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="ticker-ribbon">
        <div class="ticker-title-chip">📢 INFO</div>
        <div class="ticker-viewport">
          <div class="ticker-content" id="tickerTextContent">
            🔥 WELCOME TO LIVE STREAM <span class="highlight-cyan">${streamConfig.streamerName}</span>!  •  
            <span class="highlight-gold">TAP-TAP LAYAR & SHARE YA GUYS!</span>  •  
            TIKTOK: <span class="highlight-cyan">${streamConfig.tiktokUsername}</span>  •  
            SUPPORT VIA SAWERIA: <span class="highlight-cyan">${streamConfig.donation.saweriaUrl}</span>  •  
            <span class="highlight-gold">${streamConfig.tagline}</span>  •  
            MABAR? SPAM NICK & ID DI CHAT! 🔥
          </div>
        </div>
      </div>
    `;
  }

  updateText(customHtml) {
    const el = this.container.querySelector('#tickerTextContent');
    if (el) el.innerHTML = customHtml;
  }
}
