import anime from 'animejs';
import { IGiftAnimation } from '../base/IGiftAnimation';

/**
 * Father's Day themed gift reveal animation
 * Blue and brown color scheme with subtle, classy effects
 */
export class FathersDayAnimation implements IGiftAnimation {
  private container: HTMLElement | null = null;
  private box!: HTMLElement;
  private lid!: HTMLElement;
  private ribbonV!: HTMLElement;
  private ribbonH!: HTMLElement;
  private bow!: HTMLElement;
  private sparkles: HTMLElement[] = [];
  private idleAnimation: any = null;

  // Father's Day color theme - blue and brown (tie/suit inspired)
  private readonly colors = {
    box: '#2C3E50',      // Dark slate blue
    lid: '#3498DB',      // Bright blue
    ribbon: '#8B4513',   // Saddle brown (leather/tie)
    sparkle: '#C0C0C0'   // Silver
  };

  async load(container: HTMLElement): Promise<void> {
    this.container = container;

    // Create HTML structure with fewer sparkles (4 instead of 6 for more subtle effect)
    this.container.innerHTML = `
      <div class="fathersday-container">
        <div class="fathersday-box">
          <div class="fathersday-body" style="background: ${this.colors.box}"></div>
          <div class="fathersday-lid" style="background: ${this.colors.lid}"></div>
          <div class="fathersday-ribbon-vertical" style="background: ${this.colors.ribbon}"></div>
          <div class="fathersday-ribbon-horizontal" style="background: ${this.colors.ribbon}"></div>
          <div class="fathersday-bow" style="background: ${this.colors.ribbon}"></div>
          ${[...Array(4)].map((_, i) => `
            <div class="sparkle sparkle-${i}" style="background: ${this.colors.sparkle}"></div>
          `).join('')}
        </div>
      </div>
    `;

    this.box = this.container.querySelector('.fathersday-box')!;
    this.lid = this.container.querySelector('.fathersday-lid')!;
    this.ribbonV = this.container.querySelector('.fathersday-ribbon-vertical')!;
    this.ribbonH = this.container.querySelector('.fathersday-ribbon-horizontal')!;
    this.bow = this.container.querySelector('.fathersday-bow')!;

    // Collect all sparkles
    this.sparkles = Array.from(this.container.querySelectorAll('.sparkle'));

    console.log('[Father\'s Day Animation] Loaded with blue and brown theme');
    return Promise.resolve();
  }

  playIdle(): void {
    // More subtle idle animation - slower and less movement
    this.idleAnimation = anime({
      targets: this.box,
      translateY: [0, -6, 0],
      rotate: [0, -0.5, 0.5, 0],
      scale: [1, 1.01, 1],
      duration: 2500,
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
    console.log('[Father\'s Day Animation] Playing reveal sequence');

    // Stop idle animation
    this.stopIdle();

    // SEQUENCE: Similar to birthday but with slightly different timing for a more dignified feel

    // 1. Bow unties with more controlled movement (0-900ms, slightly slower)
    anime({
      targets: this.bow,
      translateY: [0, -15, -50, -110, -230, -380],
      translateX: [0, 3, 10, 25, 45, 65],
      rotate: [0, -20, 15, -12, 35, 75],
      scale: [1, 1.03, 1, 0.85, 0.65, 0.35],
      opacity: [1, 1, 0.95, 0.75, 0.45, 0],
      duration: 900,
      easing: 'easeInCubic'
    });

    // 2a. Vertical ribbon flies upward (0-750ms)
    anime({
      targets: this.ribbonV,
      translateY: [0, -45, -110, -200, -330],
      rotate: [0, 8, 22, 40, 65],
      opacity: [1, 0.95, 0.75, 0.45, 0],
      scaleX: [1, 0.92, 0.75, 0.55, 0.35],
      duration: 750,
      easing: 'easeInCubic'
    });

    // 2b. Horizontal ribbon flies to the side (0-750ms)
    anime({
      targets: this.ribbonH,
      translateX: [0, 25, 70, 140, 240],
      translateY: [0, -18, -35, -55, -75],
      rotate: [0, -12, -25, -45, -70],
      opacity: [1, 0.95, 0.75, 0.45, 0],
      scaleY: [1, 0.92, 0.75, 0.55, 0.35],
      duration: 750,
      easing: 'easeInCubic'
    });

    // Wait for bow to fly out and ribbons to disappear
    await new Promise(resolve => setTimeout(resolve, 750));

    // 3. Lid flies off while box fades (700ms, slightly slower for elegance)
    anime({
      targets: this.lid,
      translateY: -320,
      rotateX: -150,
      rotateZ: 20,
      opacity: 0,
      duration: 700,
      easing: 'easeInCubic'
    });

    // Gift box body fades
    anime({
      targets: this.box.querySelector('.fathersday-body'),
      opacity: 0,
      duration: 700,
      easing: 'easeOutQuad'
    });

    // 4. Sparkles appear - fewer and more subtle (only 4 sparkles)
    await new Promise(resolve => setTimeout(resolve, 150));

    this.sparkles.forEach((sparkle, i) => {
      const angle = (i / this.sparkles.length) * Math.PI * 2;
      anime({
        targets: sparkle,
        translateX: Math.cos(angle) * 180,
        translateY: Math.sin(angle) * 180 - 70,
        scale: [0, 2.0, 0],
        opacity: [0, 0.8, 0],
        duration: 1100,
        delay: i * 60,
        easing: 'easeOutQuad'
      });
    });

    // Wait a bit - gift content comes now
    await new Promise(resolve => setTimeout(resolve, 450));
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
