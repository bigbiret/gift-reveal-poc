import anime from 'animejs';
import { IGiftAnimation } from '../base/IGiftAnimation';

/**
 * Birthday-themed gift reveal animation
 * Pink and gold color scheme with festive sparkle effects
 */
export class BirthdayAnimation implements IGiftAnimation {
  private container: HTMLElement | null = null;
  private box!: HTMLElement;
  private lid!: HTMLElement;
  private ribbonV!: HTMLElement;
  private ribbonH!: HTMLElement;
  private bow!: HTMLElement;
  private sparkles: HTMLElement[] = [];
  private idleAnimation: any = null;

  // Birthday color theme - pink and gold
  private readonly colors = {
    box: '#FFB6C1',      // Light pink
    lid: '#FF69B4',      // Hot pink
    ribbon: '#FF1493',   // Deep pink
    sparkle: '#FFD700'   // Gold
  };

  async load(container: HTMLElement): Promise<void> {
    this.container = container;

    // Create HTML structure with sparkle effects
    this.container.innerHTML = `
      <div class="birthday-container">
        <div class="birthday-box">
          <div class="birthday-body" style="background: ${this.colors.box}"></div>
          <div class="birthday-lid" style="background: ${this.colors.lid}"></div>
          <div class="birthday-ribbon-vertical" style="background: ${this.colors.ribbon}"></div>
          <div class="birthday-ribbon-horizontal" style="background: ${this.colors.ribbon}"></div>
          <div class="birthday-bow" style="background: ${this.colors.ribbon}"></div>
          ${[...Array(6)].map((_, i) => `
            <div class="sparkle sparkle-${i}" style="background: ${this.colors.sparkle}"></div>
          `).join('')}
        </div>
      </div>
    `;

    this.box = this.container.querySelector('.birthday-box')!;
    this.lid = this.container.querySelector('.birthday-lid')!;
    this.ribbonV = this.container.querySelector('.birthday-ribbon-vertical')!;
    this.ribbonH = this.container.querySelector('.birthday-ribbon-horizontal')!;
    this.bow = this.container.querySelector('.birthday-bow')!

    // Collect all sparkles
    this.sparkles = Array.from(this.container.querySelectorAll('.sparkle'));

    console.log('[Birthday Animation] Loaded with pink and gold theme');
    return Promise.resolve();
  }

  playIdle(): void {
    // Subtle bounce animation to invite interaction
    this.idleAnimation = anime({
      targets: this.box,
      translateY: [0, -8, 0],
      rotate: [0, -1, 1, 0],
      scale: [1, 1.02, 1],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true
    });
  }

  stopIdle(): void {
    if (this.idleAnimation) {
      this.idleAnimation.pause();
      this.idleAnimation = null;
    }
  }

  async playReveal(): Promise<void> {
    console.log('[Birthday Animation] Playing reveal sequence');

    // Stop idle animation
    this.stopIdle();

    // SEQUENCE: Bow flies up → Ribbons fly away → Lid + Box fade → Sparkles explode

    // 1. Bow unties and flies out of view (0-800ms)
    anime({
      targets: this.bow,
      translateY: [0, -20, -60, -120, -250, -400],
      translateX: [0, 5, 15, 30, 50, 70],
      rotate: [0, -25, 20, -15, 45, 90],
      scale: [1, 1.05, 1, 0.8, 0.6, 0.3],
      opacity: [1, 1, 0.9, 0.7, 0.4, 0],
      duration: 800,
      easing: 'easeInCubic'
    });

    // 2a. Vertical ribbon flies upward (0-700ms)
    anime({
      targets: this.ribbonV,
      translateY: [0, -50, -120, -220, -350],
      rotate: [0, 10, 25, 45, 70],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      scaleX: [1, 0.9, 0.7, 0.5, 0.3],
      duration: 700,
      easing: 'easeInCubic'
    });

    // 2b. Horizontal ribbon flies to the side (0-700ms)
    anime({
      targets: this.ribbonH,
      translateX: [0, 30, 80, 150, 250],
      translateY: [0, -20, -40, -60, -80],
      rotate: [0, -15, -30, -50, -75],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      scaleY: [1, 0.9, 0.7, 0.5, 0.3],
      duration: 700,
      easing: 'easeInCubic'
    });

    // Wait for bow to fly out and ribbons to disappear
    await new Promise(resolve => setTimeout(resolve, 700));

    // 3. Lid flies off while box fades (600-1200ms)
    anime({
      targets: this.lid,
      translateY: -350,
      rotateX: -160,
      rotateZ: 25,
      opacity: 0,
      duration: 600,
      easing: 'easeInCubic'
    });

    // Gift box body fades subtly while lid flies
    anime({
      targets: this.box.querySelector('.birthday-body'),
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad'
    });

    // 4. SPARKLES EXPLODE when lid flies (800ms)
    await new Promise(resolve => setTimeout(resolve, 200));

    this.sparkles.forEach((sparkle, i) => {
      const angle = (i / this.sparkles.length) * Math.PI * 2;
      anime({
        targets: sparkle,
        translateX: Math.cos(angle) * 200,
        translateY: Math.sin(angle) * 200 - 80,
        scale: [0, 2.5, 0],
        opacity: [0, 1, 0],
        duration: 1000,
        delay: i * 50,
        easing: 'easeOutQuad'
      });
    });

    // Wait a bit - gift content comes now
    await new Promise(resolve => setTimeout(resolve, 400));
    return Promise.resolve();
  }

  destroy(): void {
    // Remove all animations
    anime.remove(this.box);
    anime.remove(this.lid);
    anime.remove(this.ribbonV);
    anime.remove(this.ribbonH);
    anime.remove(this.bow);
    this.sparkles.forEach(s => anime.remove(s));

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
