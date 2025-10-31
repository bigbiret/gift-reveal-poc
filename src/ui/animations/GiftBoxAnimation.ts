import lottie, { AnimationItem } from 'lottie-web';

export class GiftBoxAnimation {
  private animation: AnimationItem | null = null;
  private totalFrames: number = 0;

  async load(container: HTMLElement, _type: 'birthday' | 'wedding' | 'generic'): Promise<void> {
    // For now, use the same animation for all types
    // You can add different URLs for birthday/wedding/generic later
    const animationUrl = 'https://lottie.host/dd51182e-38e3-4463-9509-87d866407708/HjpW2hQ9Og.json';

    this.animation = lottie.loadAnimation({
      container,
      path: animationUrl,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    });

    return new Promise((resolve) => {
      this.animation!.addEventListener('DOMLoaded', () => {
        this.totalFrames = this.animation!.totalFrames || 100;
        console.log('[Lottie] Animation loaded. Total frames:', this.totalFrames);
        resolve();
      });
    });
  }

  async playShake(): Promise<void> {
    if (!this.animation) return;

    // Play first third of animation (shake/wiggle)
    const endFrame = Math.floor(this.totalFrames * 0.33);

    console.log('[Lottie] Playing shake: 0 to', endFrame);
    this.animation.playSegments([0, endFrame], true);

    return new Promise(resolve => {
      const handler = () => {
        this.animation!.removeEventListener('complete', handler);
        resolve();
      };
      this.animation!.addEventListener('complete', handler);
    });
  }

  async playUnwrap(): Promise<void> {
    if (!this.animation) return;

    // Play middle third of animation (unwrapping)
    const startFrame = Math.floor(this.totalFrames * 0.33);
    const endFrame = Math.floor(this.totalFrames * 0.66);

    console.log('[Lottie] Playing unwrap:', startFrame, 'to', endFrame);
    this.animation.playSegments([startFrame, endFrame], true);

    return new Promise(resolve => {
      const handler = () => {
        this.animation!.removeEventListener('complete', handler);
        resolve();
      };
      this.animation!.addEventListener('complete', handler);
    });
  }

  async playReveal(): Promise<void> {
    if (!this.animation) return;

    // Play final third of animation (reveal)
    const startFrame = Math.floor(this.totalFrames * 0.66);
    const endFrame = this.totalFrames;

    console.log('[Lottie] Playing reveal:', startFrame, 'to', endFrame);
    this.animation.playSegments([startFrame, endFrame], true);

    return new Promise(resolve => {
      const handler = () => {
        this.animation!.removeEventListener('complete', handler);
        resolve();
      };
      this.animation!.addEventListener('complete', handler);
    });
  }

  destroy(): void {
    this.animation?.destroy();
  }
}