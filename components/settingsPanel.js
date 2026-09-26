/**
 * SETTINGS PANEL DRAWER
 * Interactive real-time controls for customization and testing without reload.
 */

import { streamConfig } from '../config/streamConfig.js';
import { liveDataAdapter } from '../adapters/liveDataAdapter.js';

export class SettingsPanelComponent {
  constructor(container, options = {}) {
    this.container = container;
    this.onUpdate = options.onUpdate || (() => {});
    this.isOpen = false;
  }

  render() {
    this.container.innerHTML = `
      <!-- Trigger Floating Button -->
      <button class="gear-toggle-btn" id="gearToggleBtn" title="Pengaturan Overlay (Tekan 'S')">⚙️</button>

      <!-- Drawer Content -->
      <aside class="settings-drawer" id="settingsDrawer">
        <div class="drawer-header">
          <h2 class="drawer-title">PENGATURAN OVERLAY</h2>
          <button class="close-drawer-btn" id="closeDrawerBtn">✕</button>
        </div>

        <!-- 1. Streamer Identity -->
        <div class="settings-group">
          <label>Streamer Name</label>
          <input type="text" id="cfgStreamerName" value="${streamConfig.streamerName}">
        </div>

        <div class="settings-group">
          <label>TikTok Username</label>
          <input type="text" id="cfgTiktokUser" value="${streamConfig.tiktokUsername}">
        </div>

        <div class="settings-group">
          <label>Mode Tampilan (OBS)</label>
          <select id="cfgDisplayMode">
            <option value="FULL_OVERLAY" ${streamConfig.mode === 'FULL_OVERLAY' ? 'selected' : ''}>Full Overlay (Dengan Background)</option>
            <option value="TRANSPARENT_OVERLAY" ${streamConfig.mode === 'TRANSPARENT_OVERLAY' ? 'selected' : ''}>Transparent Overlay (Hanya Frame & HUD)</option>
          </select>
        </div>

        <!-- 2. Hero Settings -->
        <div class="settings-group">
          <label class="checkbox-label">
            <input type="checkbox" id="cfgHeroToggle" ${streamConfig.hero.enabled ? 'checked' : ''}>
            <span>Tampilkan Hero Mobile Legends</span>
          </label>
        </div>

        <!-- 3. Animation Controls -->
        <div class="settings-group">
          <label>Animasi</label>
          <label class="checkbox-label">
            <input type="checkbox" id="cfgBorderLight" ${streamConfig.animations.borderSweep ? 'checked' : ''}>
            <span>Border Light Beam Bergerak</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="cfgParticles" ${streamConfig.animations.particleSystem ? 'checked' : ''}>
            <span>Particle System (Stardust)</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="cfgSoundwave" ${streamConfig.animations.equalizer ? 'checked' : ''}>
            <span>Equalizer Soundwave</span>
          </label>
        </div>

        <!-- 4. Real-time Adapter Testing -->
        <div class="settings-group" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px;">
          <label style="color: var(--electric-blue);">⚡ Test Realtime Event (Data Adapter)</label>
          <button class="btn-test" id="btnTestViewer">Simulate Viewers (1.450 👁️)</button>
          <button class="btn-test" id="btnTestFollower">Simulate Follower Masuk</button>
          <button class="btn-test" id="btnTestDonation">Simulate Donasi (Saweria)</button>
          <button class="btn-test" id="btnTestChat">Simulate Chat Message</button>
        </div>
      </aside>
    `;

    this.drawer = this.container.querySelector('#settingsDrawer');
    this.gearBtn = this.container.querySelector('#gearToggleBtn');
    this.closeBtn = this.container.querySelector('#closeDrawerBtn');

    this.bindEvents();
  }

  bindEvents() {
    const toggle = () => {
      this.isOpen = !this.isOpen;
      this.drawer.classList.toggle('open', this.isOpen);
    };

    this.gearBtn.addEventListener('click', toggle);
    this.closeBtn.addEventListener('click', toggle);

    // Keyboard shortcut 'S'
    window.addEventListener('keydown', (e) => {
      if ((e.key === 's' || e.key === 'S') && e.target.tagName !== 'INPUT') {
        toggle();
      }
    });

    // Inputs real-time reactive
    const cfgName = this.container.querySelector('#cfgStreamerName');
    cfgName.addEventListener('input', (e) => {
      streamConfig.streamerName = e.target.value;
      const el = document.getElementById('brandStreamerName');
      if (el) el.textContent = e.target.value;
    });

    const cfgTiktok = this.container.querySelector('#cfgTiktokUser');
    cfgTiktok.addEventListener('input', (e) => {
      streamConfig.tiktokUsername = e.target.value;
      const el = document.getElementById('brandTiktokHandle');
      if (el) el.innerHTML = `<span>🎵</span><span>${e.target.value}</span>`;
    });

    const cfgMode = this.container.querySelector('#cfgDisplayMode');
    cfgMode.addEventListener('change', (e) => {
      const isTransparent = e.target.value === 'TRANSPARENT_OVERLAY';
      document.body.classList.toggle('mode-transparent', isTransparent);
    });

    const cfgHero = this.container.querySelector('#cfgHeroToggle');
    cfgHero.addEventListener('change', (e) => {
      const heroEl = document.getElementById('heroLayerWrapper');
      if (heroEl) heroEl.style.display = e.target.checked ? 'flex' : 'none';
    });

    // Test real-time triggers
    this.container.querySelector('#btnTestViewer').addEventListener('click', () => {
      const count = Math.floor(Math.random() * 2000) + 500;
      liveDataAdapter.handleViewerCount(count);
    });

    this.container.querySelector('#btnTestFollower').addEventListener('click', () => {
      const names = ['RanggaPratama', 'MobileLegendsPro', 'SultanGamer', 'MythicKing', 'AlucardGod'];
      const name = names[Math.floor(Math.random() * names.length)];
      liveDataAdapter.handleNewFollower(name);
    });

    this.container.querySelector('#btnTestDonation').addEventListener('click', () => {
      const donors = [
        { donor: 'SultanDepok', amount: 'Rp 100.000', gift: 'Mawar x500' },
        { donor: 'BangRanz_Fans', amount: 'Rp 50.000', gift: 'Paus Laut' },
        { donor: 'GusionGanteng', amount: 'Rp 25.000', gift: 'Kembang Api' }
      ];
      const d = donors[Math.floor(Math.random() * donors.length)];
      liveDataAdapter.handleDonation(d);
      liveDataAdapter.handleTopDonor(d);
    });

    this.container.querySelector('#btnTestChat').addEventListener('click', () => {
      const chats = [
        { user: 'BocilML', text: 'Bang spill build Alucard tersakit!' },
        { user: 'MythicPlayer', text: 'GG gameplay-nya bang RANZ! 🔥' },
        { user: 'Rina_Gamer', text: 'Udah bantu tap-tap layar 1.000 likes bang!' }
      ];
      const c = chats[Math.floor(Math.random() * chats.length)];
      liveDataAdapter.handleChatMessage(c);
    });
  }
}
