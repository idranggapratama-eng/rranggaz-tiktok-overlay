/**
 * STREAM INFO CARDS COMPONENT
 * Renders NEW FOLLOWER, NEW SUBSCRIBER, DONATION, TOP DONATE, and Saweria QR.
 * ZERO DUMMY DATA - Displays "-" or "Belum ada data" by default.
 * Triggers alert highlight animation when real state updates.
 */

import { streamConfig } from '../config/streamConfig.js';
import { streamState } from '../data/state.js';
import { AnimationManager } from '../animations/animationManager.js';

export class InfoCardsComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="stream-info-grid">
        <!-- 1. NEW FOLLOWER -->
        <div class="info-card follower" id="cardFollower">
          <span class="info-label">NEW FOLLOWER</span>
          <span class="info-value empty" id="valFollower">-</span>
        </div>

        <!-- 2. NEW SUBSCRIBER -->
        <div class="info-card subscriber" id="cardSubscriber">
          <span class="info-label">NEW SUBSCRIBER</span>
          <span class="info-value empty" id="valSubscriber">-</span>
        </div>

        <!-- 3. LATEST DONATION -->
        <div class="info-card donation" id="cardDonation">
          <span class="info-label">LATEST DONATION</span>
          <span class="info-value empty" id="valDonation">-</span>
        </div>

        <!-- 4. TOP DONATE -->
        <div class="info-card top-donate" id="cardTopDonate">
          <span class="info-label">TOP DONOR</span>
          <span class="info-value empty" id="valTopDonate">-</span>
        </div>

        <!-- 5. SAWERIA QR MINI CARD -->
        <div class="saweria-mini-card">
          <div class="saweria-mini-qr">
            <img src="${streamConfig.donation.qrImage}" alt="Saweria QR">
          </div>
          <span class="saweria-mini-text">SAWERIA</span>
        </div>
      </div>
    `;

    this.cardFollower = this.container.querySelector('#cardFollower');
    this.valFollower = this.container.querySelector('#valFollower');

    this.cardSubscriber = this.container.querySelector('#cardSubscriber');
    this.valSubscriber = this.container.querySelector('#valSubscriber');

    this.cardDonation = this.container.querySelector('#cardDonation');
    this.valDonation = this.container.querySelector('#valDonation');

    this.cardTopDonate = this.container.querySelector('#cardTopDonate');
    this.valTopDonate = this.container.querySelector('#valTopDonate');

    this.initSubscriptions();
  }

  initSubscriptions() {
    // 1. Follower
    streamState.subscribe('latestFollower', (follower) => {
      if (!this.valFollower) return;
      if (!follower) {
        this.valFollower.textContent = '-';
        this.valFollower.className = 'info-value empty';
      } else {
        this.valFollower.textContent = follower;
        this.valFollower.className = 'info-value';
        AnimationManager.triggerAlert(this.cardFollower);
      }
    });

    // 2. Subscriber
    streamState.subscribe('latestSubscriber', (subscriber) => {
      if (!this.valSubscriber) return;
      if (!subscriber) {
        this.valSubscriber.textContent = '-';
        this.valSubscriber.className = 'info-value empty';
      } else {
        this.valSubscriber.textContent = subscriber;
        this.valSubscriber.className = 'info-value';
        AnimationManager.triggerAlert(this.cardSubscriber);
      }
    });

    // 3. Donation
    streamState.subscribe('latestDonation', (donation) => {
      if (!this.valDonation) return;
      if (!donation) {
        this.valDonation.textContent = '-';
        this.valDonation.className = 'info-value empty';
      } else {
        // e.g. "Budi: Rp 50.000"
        const text = typeof donation === 'string' 
          ? donation 
          : `${donation.donor} (${donation.amount || donation.gift || 'Gift'})`;
        this.valDonation.textContent = text;
        this.valDonation.className = 'info-value';
        AnimationManager.triggerAlert(this.cardDonation);
      }
    });

    // 4. Top Donor
    streamState.subscribe('topDonor', (topDonor) => {
      if (!this.valTopDonate) return;
      if (!topDonor) {
        this.valTopDonate.textContent = '-';
        this.valTopDonate.className = 'info-value empty';
      } else {
        const text = typeof topDonor === 'string'
          ? topDonor
          : `${topDonor.donor} (${topDonor.amount || ''})`;
        this.valTopDonate.textContent = text;
        this.valTopDonate.className = 'info-value';
        AnimationManager.triggerAlert(this.cardTopDonate);
      }
    });
  }
}
