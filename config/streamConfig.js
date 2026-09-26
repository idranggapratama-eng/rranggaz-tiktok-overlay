/**
 * RANZ GAMING STREAM OVERLAY CONFIGURATION
 * Professional Esports Mobile Legends Overlay for TikTok Live
 */

export const streamConfig = {
  // Streamer Branding
  streamerName: "RANZ GAMING",
  gameTitle: "MOBILE LEGENDS: BANG BANG",
  tiktokUsername: "@rranggaz_",
  tagline: "PLAY • IMPROVE • BE BETTER",

  // Theme Colors
  theme: {
    name: "blue-gold",
    bgDark: "#05070B",
    electricBlue: "#00e5ff",
    electricBlueGlow: "rgba(0, 229, 255, 0.45)",
    premiumGold: "#ffd700",
    premiumGoldGlow: "rgba(255, 215, 0, 0.45)",
    cleanWhite: "#ffffff",
    liveRed: "#ff0055"
  },

  // Display Mode: 'FULL_OVERLAY' | 'TRANSPARENT_OVERLAY' | 'PREVIEW_MODE'
  mode: "FULL_OVERLAY",

  // Hero Asset
  hero: {
    enabled: true,
    name: "Alucard / Warrior",
    src: "assets/heroes/hero_warrior.png",
    auraColor: "rgba(0, 229, 255, 0.35)",
    floatingSpeed: 3.5, // seconds
    scaleAmplitude: 0.03
  },

  // Animation Switches
  animations: {
    borderSweep: true,
    goldEnergy: true,
    blueEnergy: true,
    heroFloating: true,
    particleSystem: true,
    liveIndicatorPulse: true,
    equalizer: true,
    particleCount: 32 // Capped for 60 FPS performance
  },

  // Panel Visibility
  visibility: {
    header: true,
    hero: true,
    gameplay: true,
    webcam: true,
    chat: true,
    streamInfo: true,
    ticker: true
  },

  // Saweria / Donation Info
  donation: {
    saweriaUrl: "saweria.co/rranggaz_",
    qrImage: "assets/saweria_qr.png"
  }
};
