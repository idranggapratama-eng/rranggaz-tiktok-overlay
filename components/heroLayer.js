/**
 * HERO LAYER COMPONENT
 * Renders Mobile Legends hero artwork as a decoupled decorative background element.
 * Floating parallax, breathing energy aura, and light sweep effects.
 */

import { streamConfig } from '../config/streamConfig.js';

export class HeroLayerComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    if (!streamConfig.hero.enabled) {
      this.container.innerHTML = '';
      return;
    }

    this.container.innerHTML = `
      <div class="hero-artwork-layer" id="heroLayerWrapper">
        <div class="hero-aura-glow"></div>
        <img src="${streamConfig.hero.src}" alt="${streamConfig.hero.name}" id="heroImageElement" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'400\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'none\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2300e5ff\\' font-size=\\'20\\' font-family=\\'sans-serif\\' text-anchor=\\'middle\\'>HERO ARTWORK</text></svg>'">
      </div>
    `;
  }

  setHeroAsset(newSrc, heroName = 'Hero') {
    streamConfig.hero.src = newSrc;
    streamConfig.hero.name = heroName;
    const img = this.container.querySelector('#heroImageElement');
    if (img) img.src = newSrc;
  }

  toggleHero(visible) {
    streamConfig.hero.enabled = visible;
    this.container.style.display = visible ? 'block' : 'none';
  }
}
