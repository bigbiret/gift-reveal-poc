import anime from 'animejs';

export class AnimeGiftAnimation {
  private container: HTMLElement | null = null;
  private box!: HTMLElement;
  private lid!: HTMLElement;
  private ribbonV!: HTMLElement;
  private ribbonH!: HTMLElement;
  private bow!: HTMLElement;
  private sparkles: HTMLElement[] = [];
  private idleAnimation: any = null;

  async load(container: HTMLElement, type: 'birthday' | 'wedding' | 'generic'): Promise<void> {
    this.container = container;

    // Theme colors - focus on birthday
    const themes = {
      birthday: { box: '#FFB6C1', lid: '#FF69B4', ribbon: '#FF1493', sparkle: '#FFD700' },
      wedding: { box: '#FFF0F5', lid: '#FFE4E1', ribbon: '#C0C0C0', sparkle: '#FFFFFF' },
      generic: { box: '#F0F0F0', lid: '#E0E0E0', ribbon: '#888888', sparkle: '#CCCCCC' }
    };

    const colors = themes[type];

    // Lag HTML-struktur med sparkle effekter
    this.container.innerHTML = `
      <div class="anime-gift-container">
        <div class="anime-gift-box">
          <div class="anime-gift-body" style="background: ${colors.box}"></div>
          <div class="anime-gift-lid" style="background: ${colors.lid}"></div>
          <div class="anime-ribbon-vertical" style="background: ${colors.ribbon}"></div>
          <div class="anime-ribbon-horizontal" style="background: ${colors.ribbon}"></div>
          <div class="anime-bow" style="background: ${colors.ribbon}"></div>
          ${[...Array(6)].map((_, i) => `
            <div class="sparkle sparkle-${i}" style="background: ${colors.sparkle}"></div>
          `).join('')}
        </div>
      </div>
    `;

    this.box = this.container.querySelector('.anime-gift-box')!;
    this.lid = this.container.querySelector('.anime-gift-lid')!;
    this.ribbonV = this.container.querySelector('.anime-ribbon-vertical')!;
    this.ribbonH = this.container.querySelector('.anime-ribbon-horizontal')!;
    this.bow = this.container.querySelector('.anime-bow')!;

    // Samle alle sparkles
    this.sparkles = Array.from(this.container.querySelectorAll('.sparkle'));

    console.log('[Anime.js] Birthday animation loaded');
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

  async playShake(): Promise<void> {
    // Ikke i bruk lenger
    return Promise.resolve();
  }

  async playUnwrap(): Promise<void> {
    // Ikke i bruk lenger - alt skjer i reveal
    return Promise.resolve();
  }

  async playReveal(): Promise<void> {
    console.log('[Anime.js] Playing simple reveal sequence');

    // Stop idle animation
    this.stopIdle();

    // SEKVENS: Sløyfe opp → Lokk + Box fades bort → Content fades inn

    // 1. Sløyfe knytes HELT opp og flyr ut av vinduet (0-800ms)
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

    // 2a. Vertikalt bånd flyr oppover ut (0-700ms)
    anime({
      targets: this.ribbonV,
      translateY: [0, -50, -120, -220, -350],
      rotate: [0, 10, 25, 45, 70],
      opacity: [1, 0.9, 0.7, 0.4, 0],
      scaleX: [1, 0.9, 0.7, 0.5, 0.3],
      duration: 700,
      easing: 'easeInCubic'
    });

    // 2b. Horisontalt bånd flyr til siden (0-700ms)
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

    // Vent på at sløyfe flyr ut og bånd er borte
    await new Promise(resolve => setTimeout(resolve, 700));

    // 3. Lokket flyr av SAMTIDIG som hele boksen fader bort (600-1200ms)
    anime({
      targets: this.lid,
      translateY: -350,
      rotateX: -160,
      rotateZ: 25,
      opacity: 0,
      duration: 600,
      easing: 'easeInCubic'
    });

    // Gift box body fader subtilt bort mens lokket flyr
    anime({
      targets: this.box.querySelector('.anime-gift-body'),
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad'
    });

    // 4. SPARKLES EKSPLODERER når lokket flyr (800ms)
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

    // Vent litt til - gift content kommer nå
    await new Promise(resolve => setTimeout(resolve, 400));
    return Promise.resolve();
  }

  destroy(): void {
    // Fjern alle animasjoner
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
