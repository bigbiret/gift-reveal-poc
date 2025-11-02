/**
 * Interface for all gift reveal animations.
 * All animation themes must implement this interface to ensure consistency.
 */
export interface IGiftAnimation {
  /**
   * Load and initialize the animation with DOM elements
   * @param container - The HTML container element where animation will be rendered
   */
  load(container: HTMLElement): Promise<void>;

  /**
   * Play the idle/waiting animation loop (before user interaction)
   */
  playIdle(): void;

  /**
   * Stop the idle animation
   */
  stopIdle(): void;

  /**
   * Play the main reveal animation sequence
   * @returns Promise that resolves when animation completes
   */
  playReveal(): Promise<void>;

  /**
   * Clean up and destroy the animation, removing all DOM elements and listeners
   */
  destroy(): void;
}
