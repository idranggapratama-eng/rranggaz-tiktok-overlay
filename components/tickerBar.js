/**
 * TICKER BAR COMPONENT (MAGIC CHESS EDITION)
 * Renders smooth continuous moving marquee tailored to Magic Chess live stream.
 */

import { streamConfig } from '../config/streamConfig.js';

export class TickerBarComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="ticker-ribbon">
        <div class="ticker-title-chip">⚔️ MAGIC CHESS</div>
        <div class="ticker-viewport">
          <div class="ticker-content" id="tickerTextContent">
            🔥 WELCOME TO MAGIC CHESS ARENA <span class="highlight-cyan">${streamConfig.streamerName}</span>!  •  
            <span class="highlight-gold">SPAM BUILD & REKOMENDASI SINERGI DI CHAT!</span>  •  
            TIKTOK: <span class="highlight-cyan">${streamConfig.tiktokUsername}</span>  •  
            TAP-TAP LAYAR & SHARE YA GUYS!  •  
            SUPPORT VIA SAWERIA: <span class="highlight-cyan">${streamConfig.donation.saweriaUrl}</span>  •  
            <span class="highlight-gold">TARGET HARI INI: PUSH MYTHICAL GLORY COMMANDER! 🏆</span>
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
