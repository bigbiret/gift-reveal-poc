import anime from 'animejs';
import { IGiftAnimation } from '../base/IGiftAnimation';

/**
 * Wedding-themed gift reveal animation
 * Elegant jewelry ring box that opens to reveal a diamond ring
 */
export class WeddingAnimation implements IGiftAnimation {
  private container: HTMLElement | null = null;
  private box!: HTMLElement;
  private boxBottom!: HTMLElement;
  private lid!: HTMLElement;
  private cushion!: HTMLElement;
  private ring!: HTMLElement;
  private idleAnimation: any = null;

  async load(container: HTMLElement): Promise<void> {
    this.container = container;

    // Create HTML structure - simple jewelry ring box
    this.container.innerHTML = `
      <div class="wedding-container">
        <div class="wedding-box">
          <div class="wedding-box-bottom"></div>
          <div class="wedding-box-lid"></div>
          <div class="wedding-cushion"></div>
          <div class="wedding-ring"></div>
        </div>
      </div>
    `;

    this.box = this.container.querySelector('.wedding-box')!;
    this.boxBottom = this.container.querySelector('.wedding-box-bottom')!;
    this.lid = this.container.querySelector('.wedding-box-lid')!;
    this.cushion = this.container.querySelector('.wedding-cushion')!;
    this.ring = this.container.querySelector('.wedding-ring')!;

    console.log('[Wedding Animation] Loaded with jewelry ring box');
    return Promise.resolve();
  }

  playIdle(): void {
    // Very gentle pulse - elegant and subtle
    this.idleAnimation = anime({
      targets: this.box,
      translateY: [0, -4, 0],
      scale: [1, 1.005, 1],
      duration: 3500,
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
    console.log('[Wedding Animation] Playing REVERSE reveal - ring first, box opens after!');

    // Stop idle animation
    this.stopIdle();

    // REVERSED SEQUENCE: Ring flies up FIRST → THEN box opens → THEN box closes

    // 1. RING FLIES UP FIRST (from closed box!) (0-1000ms)
    console.log('[Wedding Animation] Ring flying up from closed box');
    anime({
      targets: this.ring,
      translateY: -150,
      rotate: 360,
      scale: 1.4,
      duration: 1000,
      easing: 'easeOutCubic'
    });

    // 2. Diamond sparkle (parallel with ring)
    anime({
      targets: this.ring,
      boxShadow: [
        { value: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.3)' },
        { value: '0 0 40px rgba(255, 215, 0, 1), inset 0 0 20px rgba(255, 215, 0, 0.7)' },
        { value: '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.5)' }
      ],
      duration: 1000,
      easing: 'easeInOutSine'
    });

    // Wait for ring to finish flying up
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('[Wedding Animation] Ring is up!');

    // Small pause with ring floating
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3. NOW box opens (AFTER ring is up!) (1500-2500ms)
    console.log('[Wedding Animation] Opening box now');
    anime({
      targets: this.lid,
      rotateX: -180,
      translateY: -10,
      duration: 1000,
      easing: 'easeOutCubic'
    });

    // 4. Cushion fades out as box opens
    anime({
      targets: this.cushion,
      opacity: 0,
      duration: 500,
      delay: 200,
      easing: 'easeOutQuad'
    });

    // Wait for box to open
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Pause with box open
    await new Promise(resolve => setTimeout(resolve, 800));

    // 5. Close box (3300-3900ms)
    console.log('[Wedding Animation] Closing box');
    anime({
      targets: this.lid,
      rotateX: 0,
      translateY: 0,
      duration: 600,
      easing: 'easeInCubic'
    });

    // 6. Fade out box while closing
    anime({
      targets: [this.boxBottom, this.lid],
      opacity: 0,
      duration: 400,
      easing: 'easeOutQuad'
    });

    await new Promise(resolve => setTimeout(resolve, 600));

    return Promise.resolve();
  }

  destroy(): void {
    // Remove all animations
    anime.remove(this.box);
    anime.remove(this.boxBottom);
    anime.remove(this.lid);
    anime.remove(this.cushion);
    anime.remove(this.ring);

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
