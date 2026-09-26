/**
 * ANIMATION MANAGER (GPU 60 FPS ENGINE)
 * Controls particle systems, requestAnimationFrame cycles, and state transitions.
 * Methods: start(), stop(), pause(), resume()
 */

export class AnimationManager {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext('2d') : null;
    this.particles = [];
    this.particleCount = options.particleCount || 30; // Capped for peak performance
    this.isRunning = false;
    this.isPaused = false;
    this.rafId = null;
    this.lastTime = 0;

    this.initParticles();
  }

  initParticles() {
    if (!this.canvas) return;
    this.particles = [];
    const w = this.canvas.width || 1080;
    const h = this.canvas.height || 1920;

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 229, 255,' : 'rgba(255, 215, 0,',
        speedY: -(Math.random() * 0.7 + 0.25),
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.65 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  resizeCanvas(width = 1080, height = 1920) {
    if (!this.canvas) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.initParticles();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.loop = this.loop.bind(this);
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.loop);
    }
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    if (!this.isPaused) {
      const delta = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;

      this.updateAndRenderParticles(delta);
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  updateAndRenderParticles(delta) {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.pulseSpeed;

      // Wrap around screen
      if (p.y < 0) {
        p.y = h;
        p.x = Math.random() * w;
      }
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;

      const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.angle) * 0.2);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${dynamicAlpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `${p.color} 0.8)`;
      this.ctx.fill();
    }
  }

  // Smooth number transition utility (viewer counter)
  static animateValue(element, start, end, duration = 800) {
    if (!element) return;
    if (start === null || isNaN(start)) start = 0;
    if (end === null || isNaN(end)) {
      element.textContent = '-';
      return;
    }

    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeProgress);

      element.textContent = current.toLocaleString('id-ID');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger flash/highlight alert on an element
  static triggerAlert(element, alertClass = 'panel-alert-active', duration = 2500) {
    if (!element) return;
    element.classList.remove(alertClass);
    // Force DOM reflow
    void element.offsetWidth;
    element.classList.add(alertClass);

    setTimeout(() => {
      element.classList.remove(alertClass);
    }, duration);
  }
}
