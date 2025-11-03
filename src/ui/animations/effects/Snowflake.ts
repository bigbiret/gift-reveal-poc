import confetti from 'canvas-confetti';

/**
 * Snowflake effect using canvas-confetti
 * Creates beautiful falling snowflakes using custom shapes
 */
export class SnowflakeEffect {
  /**
   * Create a gentle snowfall effect
   */
  snowfall(): void {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const duration = 3000; // 3 seconds of snow
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 0,
      ticks: 300,
      zIndex: 1000,
      gravity: 0.5, // Slower fall for snowflakes
    };

    // Snowflake shape configuration
    function snowflake() {
      confetti({
        ...defaults,
        particleCount: 3,
        angle: 90, // Fall straight down
        spread: 180, // Wide spread
        origin: { x: Math.random(), y: -0.1 }, // Random X position, above screen
        colors: ['#ffffff', '#e8f4f8', '#cce7f0'], // White and light blue tones
        shapes: ['circle'], // Using circles for snowflakes
        scalar: 0.8, // Smaller particles
        drift: Math.random() * 0.5 - 0.25, // Gentle side-to-side drift
      });
    }

    // Continuous snowfall during the duration
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(interval);
        return;
      }
      snowflake();
    }, 50);
  }

  /**
   * Create a burst of snowflakes (like opening a gift)
   */
  burst(): void {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const count = 80; // Fewer particles than confetti
    const defaults = {
      origin: { y: 0.4 }, // Start a bit higher
      zIndex: 1000,
      gravity: 0.4, // Gentle fall
      drift: 0.5, // Snowflakes drift as they fall
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#ffffff', '#e8f4f8', '#cce7f0', '#b8dce8'], // White and ice blue
        shapes: ['circle'], // Circular snowflakes
      });
    }

    // Multiple bursts with different spreads for natural effect
    fire(0.3, {
      spread: 30,
      startVelocity: 20,
      scalar: 0.6,
    });

    fire(0.25, {
      spread: 60,
      startVelocity: 15,
      scalar: 0.8,
    });

    fire(0.25, {
      spread: 100,
      startVelocity: 10,
      decay: 0.92,
      scalar: 1.0,
    });

    fire(0.2, {
      spread: 120,
      startVelocity: 8,
      decay: 0.94,
      scalar: 0.7,
    });
  }

  /**
   * Create an EXPLOSIVE magical winter effect with stars and snowflakes! 💥❄️⭐
   */
  winterMagic(): void {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const count = 250; // MORE PARTICLES!
    const defaults = {
      origin: { y: 0.35 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // === 70% WHITE SNOWFLAKES ===

    // EXPLOSIVE CENTER BURST - Big white snowflakes! (28% of total)
    fire(0.4, {
      spread: 60,
      startVelocity: 65, // MUCH FASTER!
      colors: ['#ffffff', '#f0f8ff', '#e8f4f8'],
      shapes: ['circle'],
      scalar: 1.2, // BIGGER!
      gravity: 0.6,
      drift: 0.3,
    });

    // MEGA WIDE - White snowflakes everywhere! (24.5% of total)
    fire(0.35, {
      spread: 180, // FULL SPREAD!
      startVelocity: 45,
      colors: ['#ffffff', '#f0f8ff', '#e0f2ff'],
      shapes: ['circle'],
      scalar: 1.0,
      gravity: 0.5,
      drift: 0.7,
    });

    // === 30% GOLD STARS ===

    // WIDE SPREAD - Gold stars shooting out! (17.5% of total)
    fire(0.25, {
      spread: 120,
      startVelocity: 55,
      colors: ['#FFD700', '#FFA500', '#FFED4E', '#FFB84D'],
      shapes: ['star'],
      scalar: 0.9,
      gravity: 0.7,
    });

    // EXTRA GOLD STARS - More magic! (12.5% of total)
    fire(0.18, {
      spread: 90,
      startVelocity: 70, // SUPER FAST!
      colors: ['#FFD700', '#FFED4E'],
      shapes: ['star'],
      scalar: 0.7,
      gravity: 0.8,
    });

    // === DELAYED WAVES (maintaining 70/30 ratio) ===

    // DELAYED BURST - Second wave of WHITE snowflakes! (12% of total)
    setTimeout(() => {
      fire(0.3, {
        spread: 100,
        startVelocity: 40,
        colors: ['#ffffff', '#e8f4f8', '#f5fbff'],
        shapes: ['circle'],
        scalar: 1.1,
        gravity: 0.45,
        drift: 0.9,
      });
    }, 150);

    // THIRD WAVE - More WHITE snowflakes! (10.5% of total)
    setTimeout(() => {
      fire(0.25, {
        spread: 140,
        startVelocity: 35,
        colors: ['#ffffff', '#cce7f0', '#e0f2ff'],
        shapes: ['circle'],
        scalar: 0.9,
        gravity: 0.4,
        drift: 1.0,
      });
    }, 300);
  }
}
