/**
 * WEBCAM FRAME COMPONENT
 * Renders dedicated webcam frame with metallic gold/blue border and transparent cutout for OBS camera source.
 */

export class WebcamFrameComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="webcam-frame-box" id="webcamFrame">
        <!-- Transparent Viewport for OBS Camera Capture -->
        <div class="webcam-viewport">
          <!-- Translucent hint that is hidden during OBS stream -->
        </div>

        <div class="webcam-label-bar">
          <span>🎙️ WEBCAM</span>
        </div>

        <div class="webcam-name-bottom">
          <span>RANZ</span>
        </div>
      </div>
    `;
  }

  toggle(visible) {
    this.container.style.display = visible ? 'block' : 'none';
  }
}
