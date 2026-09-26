/**
 * BOTTOM SECTION COMPONENT (CLEAN & NATURAL - ZERO DUMMY DATA)
 * Designed for TikTok Live Studio 9:16 vertical layout.
 * Features:
 * 1. Streamer Webcam Frame with transparent cutout for OBS / TikTok Live Studio camera
 * 2. Saweria QR Code Card with animated laser scanline and custom link
 * 3. Streamer Brand & Social Ribbon (tagline, TikTok handle, and Magic Chess badge)
 * 100% natural: NO artificial follower/donation placeholders, NO fake stats!
 */

import { streamConfig } from '../config/streamConfig.js';

export class BottomSectionComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="bottom-clean-container">
        <!-- TOP ROW: WEBCAM + SAWERIA QR SIDE-BY-SIDE -->
        <div class="bottom-interactive-row">
          <!-- 1. STREAMER WEBCAM FRAME -->
          <div class="webcam-box-clean">
            <div class="webcam-glass-frame">
              <!-- Corner accents -->
              <div class="cam-corner cc-tl"></div>
              <div class="cam-corner cc-tr"></div>
              <div class="cam-corner cc-bl"></div>
              <div class="cam-corner cc-br"></div>
              
              <div class="webcam-viewport-cutout">
                <!-- Center transparent cutout for TikTok Live Studio Camera Capture -->
                <div class="cam-guide-crosshair"></div>
              </div>

              <!-- Top webcam badge -->
              <div class="webcam-top-badge">
                <span class="mic-dot"></span>
                <span>STREAMER CAM • RANZ</span>
              </div>

              <!-- Bottom camera tag -->
              <div class="webcam-bottom-tag">
                <span>COMMANDER IN ACTION</span>
              </div>
            </div>
          </div>

          <!-- 2. SAWERIA QR DONATION CARD -->
          <div class="saweria-box-clean">
            <div class="saweria-card-frame">
              <div class="saweria-header-pill">
                <span class="heart-pulse">💛</span>
                <span>SUPPORT VIA SAWERIA</span>
              </div>
              
              <div class="saweria-qr-viewport">
                <div class="laser-scanner-line"></div>
                <img src="${streamConfig.donation.qrImage}" alt="Saweria QRIS" class="qr-code-image">
              </div>

              <div class="saweria-link-badge">
                <span class="saweria-url-text">${streamConfig.donation.saweriaUrl}</span>
              </div>

              <div class="saweria-sub-info">
                <span>QRIS • GOPAY • OVO • DANA</span>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM BRANDING RIBBON (CLEAN & PROFESSIONAL) -->
        <div class="bottom-brand-ribbon">
          <div class="brand-ribbon-left">
            <span class="ribbon-brand-title">RANZ GAMING</span>
            <span class="ribbon-tagline">${streamConfig.tagline}</span>
          </div>
          <div class="brand-ribbon-divider"></div>
          <div class="brand-ribbon-right">
            <span class="ribbon-social-item">🎵 ${streamConfig.tiktokUsername}</span>
            <span class="ribbon-social-item highlight">🏆 MAGIC CHESS</span>
          </div>
        </div>
      </div>
    `;
  }
}
