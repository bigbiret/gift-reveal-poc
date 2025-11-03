/**
 * Animation module exports
 * Centralized exports for all animation-related functionality
 */

// Base interface
export type { IGiftAnimation } from './base/IGiftAnimation';

// Factory
export { AnimationFactory } from './AnimationFactory';
export type { AnimationTheme } from './AnimationFactory';

// Theme implementations (optional direct imports)
export { BirthdayAnimation } from './themes/BirthdayAnimation';
export { FathersDayAnimation } from './themes/FathersDayAnimation';
export { WeddingAnimation } from './themes/WeddingAnimation';
export { BalloonAnimation } from './themes/BalloonAnimation';
export { ChristmasAnimation } from './themes/ChristmasAnimation';

// Effects
export { ConfettiEffect } from './effects/Confetti';
export { SnowflakeEffect } from './effects/Snowflake';
