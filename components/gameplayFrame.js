/**
 * GAMEPLAY FRAME COMPONENT
 * Renders 16:9 esports metallic frame with animated traveling light beam and corner accents.
 * 100% transparent in the center for OBS game capture.
 */

export class GameplayFrameComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="gameplay-wrapper">
        <div class="gameplay-screen-frame" id="gameplayScreen">
          <!-- Metallic Corner Accents -->
          <div class="corner-esport ce-tl"></div>
          <div class="corner-esport ce-tr"></div>
          <div class="corner-esport ce-bl"></div>
          <div class="corner-esport ce-br"></div>

          <!-- Animated Traveling Light Beam Track (TOP -> RIGHT -> BOTTOM -> LEFT -> TOP) -->
          <div class="light-beam-track">
            <div class="beam-particle"></div>
          </div>

          <!-- Equalizer soundwave on bottom rim -->
          <div class="game-soundwave-rim">
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
          </div>
        </div>
      </div>
    `;
  }
}
