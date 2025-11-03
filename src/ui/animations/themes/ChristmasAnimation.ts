import anime from 'animejs';
import { IGiftAnimation } from '../base/IGiftAnimation';

/**
 * Christmas-themed gift reveal animation
 * Red, green, and gold color scheme with star and snowflakes
 */
export class ChristmasAnimation implements IGiftAnimation {
  private container: HTMLElement | null = null;
  private box!: HTMLElement;
  private lid!: HTMLElement;
  private ribbonV!: HTMLElement;
  private ribbonH!: HTMLElement;
  private bow!: HTMLElement;
  private star!: HTMLElement;
  private idleAnimation: any = null;
  private starAnimation: any = null;

  // Christmas color theme - festive and warm
  private readonly colors = {
    box: '#C41E3A',        // Christmas red
    lid: '#165B33',        // Christmas green
    ribbon: '#FFD700',     // Gold
    star: '#FFD700'        // Gold star
  };

  async load(container: HTMLElement): Promise<void> {
    this.container = container;

    // Create HTML structure with Christmas elements
    this.container.innerHTML = `
      <div class="christmas-container">
        <div class="christmas-box">
          <div class="christmas-body" style="background: ${this.colors.box}"></div>
          <div class="christmas-lid" style="background: ${this.colors.lid}"></div>
          <div class="christmas-ribbon-vertical" style="background: ${this.colors.ribbon}"></div>
          <div class="christmas-ribbon-horizontal" style="background: ${this.colors.ribbon}"></div>
          <div class="christmas-bow" style="background: ${this.colors.ribbon}"></div>
          <div class="christmas-star" style="background: ${this.colors.star}"></div>
        </div>
      </div>
    `;

    this.box = this.container.querySelector('.christmas-box')!;
    this.lid = this.container.querySelector('.christmas-lid')!;
    this.ribbonV = this.container.querySelector('.christmas-ribbon-vertical')!;
    this.ribbonH = this.container.querySelector('.christmas-ribbon-horizontal')!;
    this.bow = this.container.querySelector('.christmas-bow')!;
    this.star = this.container.querySelector('.christmas-star')!

    console.log('[Christmas Animation] Loaded with festive theme 🎄');
    return Promise.resolve();
  }

  playIdle(): void {
    // Gentle rocking like a present under the tree
    this.idleAnimation = anime({
      targets: this.box,
      translateY: [0, -6, 0],
      rotate: [0, -0.5, 0.5, 0],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true
    });

    // Star twinkles on top
    this.starAnimation = anime({
      targets: this.star,
      scale: [1, 1.15, 1],
      opacity: [1, 0.7, 1],
      rotate: [0, 5, -5, 0],
      duration: 1500,
      easing: 'easeInOutQuad',
      loop: true
    });
  }

  stopIdle(): void {
    if (this.idleAnimation) {
      this.idleAnimation.pause();
      this.idleAnimation = null;
    }
    if (this.starAnimation) {
      this.starAnimation.pause();
      this.starAnimation = null;
    }
  }

  async playReveal(): Promise<void> {
    console.log('[Christmas Animation] Ho ho ho! Opening gift 🎅');

    // Stop idle animations
    this.stopIdle();

    // SEQUENCE: Star spins and shoots up → Snowflakes fall → Bow flies → Ribbons → Lid opens → Gold glitter explosion

    // 1. Star spins bright and shoots up like a shooting star (0-900ms)
    anime({
      targets: this.star,
      translateY: [0, -40, -100, -200, -400],
      translateX: [0, 10, 30, 60, 100],
      rotate: [0, 180, 360, 540, 720],
      scale: [1, 1.3, 1.5, 1.2, 0],
      opacity: [1, 1, 1, 0.7, 0],
      duration: 900,
      easing: 'easeInCubic'
    });

    // Wait for star to fly away (snowflakes will come from canvas-confetti)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3. Bow unties and flies away (500-1300ms)
    anime({
      targets: this.bow,
      translateY: [0, -30, -80, -150, -280, -450],
      translateX: [0, -10, -20, -35, -50, -65],
      rotate: [0, 30, -20, 40, -30, 60],
      scale: [1, 1.1, 1, 0.8, 0.5, 0.2],
      opacity: [1, 1, 0.9, 0.7, 0.4, 0],
      duration: 800,
      easing: 'easeInCubic'
    });

    // 4a. Vertical ribbon flies upward (500-1200ms)
    anime({
      targets: this.ribbonV,
      translateY: [0, -60, -140, -250, -400],
      rotate: [0, 15, 35, 60, 90],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      scaleX: [1, 0.9, 0.7, 0.4, 0.2],
      duration: 700,
      easing: 'easeInCubic'
    });

    // 4b. Horizontal ribbon flies to the side (500-1200ms)
    anime({
      targets: this.ribbonH,
      translateX: [0, 40, 100, 180, 300],
      translateY: [0, -25, -50, -75, -100],
      rotate: [0, -20, -40, -65, -90],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      scaleY: [1, 0.9, 0.7, 0.4, 0.2],
      duration: 700,
      easing: 'easeInCubic'
    });

    // Wait for ribbons to clear
    await new Promise(resolve => setTimeout(resolve, 700));

    // 5. Lid opens with a festive pop! (1200-1800ms)
    anime({
      targets: this.lid,
      translateY: -400,
      rotateX: -180,
      rotateZ: 30,
      opacity: 0,
      duration: 600,
      easing: 'easeInCubic'
    });

    // Box body fades with Christmas magic
    anime({
      targets: this.box.querySelector('.christmas-body'),
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad'
    });

    // Snowflakes and stars are now handled by canvas-confetti in the controller
    // Just wait a bit for the animation to complete
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
    anime.remove(this.star);

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
