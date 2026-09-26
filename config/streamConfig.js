/**
 * RANZ GAMING STREAM OVERLAY CONFIGURATION
 * Magic Chess Mobile Legends Esports Edition
 */

export const streamConfig = {
  // Streamer Branding
  streamerName: "RANZ GAMING",
  gameTitle: "MOBILE LEGENDS: MAGIC CHESS",
  commanderName: "COMMANDER ALUCARD",
  tiktokUsername: "@rranggaz_",
  tagline: "PLAY • IMPROVE • BE BETTER",

  // Theme Colors
  theme: {
    name: "magic-chess-cosmic",
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

  // Magic Chess Commander Hero Asset
  hero: {
    enabled: true,
    name: "Commander Alucard",
    src: "assets/heroes/commander_hero.png",
    auraColor: "rgba(0, 229, 255, 0.4)",
    floatingSpeed: 2.8,
    scaleAmplitude: 0.04
  },

  // MLBB Crest Logo
  logo: {
    src: "assets/icons/mlbb_logo.png"
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
    commanderSpin: true,
    particleCount: 32
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
