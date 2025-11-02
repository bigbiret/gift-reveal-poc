import anime from 'animejs';
import { IGiftAnimation } from '../base/IGiftAnimation';

/**
 * Balloon-themed gift reveal animation
 * Balloon floats and pops when tapped
 */
export class BalloonAnimation implements IGiftAnimation {
  private container: HTMLElement | null = null;
  private balloonMain!: HTMLElement;
  private balloon!: HTMLElement;
  private string!: HTMLElement;
  private fragments: HTMLElement[] = [];
  private idleAnimation: any = null;

  async load(container: HTMLElement): Promise<void> {
    this.container = container;

    // Create HTML structure - balloon with string and fragments
    this.container.innerHTML = `
      <div class="balloon-container">
        <div class="balloon-main">
          <div class="balloon-balloon"></div>
          <div class="balloon-string"></div>
          ${[...Array(8)].map((_, i) => `
            <div class="balloon-fragment balloon-fragment-${i}"></div>
          `).join('')}
        </div>
      </div>
    `;

    this.balloonMain = this.container.querySelector('.balloon-main')!;
    this.balloon = this.container.querySelector('.balloon-balloon')!;
    this.string = this.container.querySelector('.balloon-string')!;

    // Collect all fragments
    this.fragments = Array.from(this.container.querySelectorAll('.balloon-fragment'));

    console.log('[Balloon Animation] Loaded with floating balloon');
    return Promise.resolve();
  }

  playIdle(): void {
    // Balloon floats up and down gently
    this.idleAnimation = anime({
      targets: this.balloonMain,
      translateY: [0, -15, 0],
      rotate: [0, -2, 2, 0],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true
    });

    // String sways slightly
    anime({
      targets: this.string,
      rotate: [0, 3, -3, 0],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });
  }

  stopIdle(): void {
    if (this.idleAnimation) {
      this.idleAnimation.pause();
      this.idleAnimation = null;
    }
    anime.remove(this.string);
  }

  async playReveal(): Promise<void> {
    console.log('[Balloon Animation] Balloon is popping!');

    // Stop idle animation
    this.stopIdle();

    // SEQUENCE: Balloon inflates → POP! → Fragments fly out → String falls

    // 1. Balloon inflates quickly (stretches) (0-400ms)
    anime({
      targets: this.balloon,
      scaleX: [1, 1.3],
      scaleY: [1, 1.2],
      duration: 400,
      easing: 'easeInOutQuad'
    });

    await new Promise(resolve => setTimeout(resolve, 400));

    // 2. BALLOON POPS! (400-600ms)
    // Balloon disappears instantly
    anime({
      targets: this.balloon,
      scale: [1.3, 0],
      opacity: [1, 0],
      duration: 200,
      easing: 'easeOutCubic'
    });

    // 3. Fragments explode outward (400-1200ms)
    this.fragments.forEach((fragment, i) => {
      const angle = (i / this.fragments.length) * Math.PI * 2;
      const distance = 120 + Math.random() * 40;

      anime({
        targets: fragment,
        translateX: Math.cos(angle) * distance,
        translateY: Math.sin(angle) * distance - 30,
        rotate: Math.random() * 720 - 360,
        scale: [0, 1.2, 0.8, 0],
        opacity: [0, 1, 0.8, 0],
        duration: 800,
        delay: i * 30,
        easing: 'easeOutQuad'
      });
    });

    // 4. String falls down (400-1000ms)
    anime({
      targets: this.string,
      translateY: 100,
      rotate: [0, 45],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeInQuad'
    });

    // Wait for pop animation to finish
    await new Promise(resolve => setTimeout(resolve, 600));

    // Confetti is triggered by controller at ~900ms
    return Promise.resolve();
  }

  destroy(): void {
    // Remove all animations
    anime.remove(this.balloonMain);
    anime.remove(this.balloon);
    anime.remove(this.string);
    this.fragments.forEach(f => anime.remove(f));

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
