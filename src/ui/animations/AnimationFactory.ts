import { IGiftAnimation } from './base/IGiftAnimation';
import { BirthdayAnimation } from './themes/BirthdayAnimation';
import { FathersDayAnimation } from './themes/FathersDayAnimation';
import { WeddingAnimation } from './themes/WeddingAnimation';
import { BalloonAnimation } from './themes/BalloonAnimation';

/**
 * Supported animation theme types
 */
export type AnimationTheme = 'birthday' | 'fathersday' | 'wedding' | 'balloon' | 'generic';

/**
 * Factory for creating gift reveal animations based on theme
 */
export class AnimationFactory {
  /**
   * Create an animation instance based on the specified theme
   * @param theme - The animation theme to use
   * @returns An instance of IGiftAnimation
   */
  static create(theme: AnimationTheme): IGiftAnimation {
    switch (theme) {
      case 'birthday':
        return new BirthdayAnimation();

      case 'fathersday':
        return new FathersDayAnimation();

      case 'wedding':
        return new WeddingAnimation();

      case 'balloon':
        return new BalloonAnimation();

      case 'generic':
      default:
        // Default to birthday animation for generic/unknown types
        console.warn(`[AnimationFactory] Unknown theme "${theme}", using birthday as fallback`);
        return new BirthdayAnimation();
    }
  }

  /**
   * Get list of all available themes
   */
  static getAvailableThemes(): AnimationTheme[] {
    return ['birthday', 'fathersday', 'wedding', 'balloon', 'generic'];
  }
}
