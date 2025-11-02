import './ui/styles/main.scss';
import { Router } from './router';
import { GiftRevealController } from './controllers/GiftRevealController';
import { createGiftService } from './core/services/gift.service';
import { config } from './config/app.config';

class App {
  private router: Router;
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('app')!;
    this.router = new Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Gift reveal route: /g/{code} - supports codes between 4-12 characters
    this.router.register(/^\/g\/([a-zA-Z0-9]{4,12})$/, async (match: RegExpMatchArray) => {
      const code = match[1];

      const controller = new GiftRevealController(
        this.container,
        createGiftService(config.USE_MOCKS)
      );
      await controller.initialize(code);
    });

    // Default/home route - match / or empty
    this.router.register(/^\/?$/, () => {
      this.showHomepage();
    });

    // Catch-all route for invalid paths
    this.router.register(/^.*$/, () => {
      this.showError('Ugyldig gave-link');
    });
  }

  private showHomepage(): void {
    this.container.innerHTML = `
      <div class="homepage">
        <h1>🎁 Gift Reveal PoC</h1>
        <p>Interaktiv gavekortåpning med <strong>Anime.js</strong> animasjoner</p>

        <div class="engine-section" style="background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 100%); border: 2px solid #ff1744;">
          <h2>✨ Test Gift Reveal (1 trykk)</h2>
          <div class="test-links">
            <a href="/g/TEST1234" class="test-link anime" style="font-size: 18px; padding: 20px 24px;">
              <span class="link-label">🎂 Bursdagsgave</span>
              <span class="link-code">TEST1234</span>
            </a>
            <a href="/g/TESTFAR" class="test-link anime">
              <span class="link-label">👔 Farsdag</span>
              <span class="link-code">TESTFAR</span>
            </a>
            <a href="/g/TESTBRYL" class="test-link anime">
              <span class="link-label">💍 Bryllupsgave (Ring)</span>
              <span class="link-code">TESTBRYL</span>
            </a>
            <a href="/g/TESTBAL" class="test-link anime">
              <span class="link-label">🎈 Ballong (Sprekker!)</span>
              <span class="link-code">TESTBAL</span>
            </a>
          </div>
          <p style="margin-top: 16px; font-size: 14px; color: #666;">
            <strong>Hver animasjon er unik!</strong> Bursdagsgave har gaveboks, Farsdag har maskulin boks, Bryllup har ringboks med diamant, Ballong sprekker! ✨
          </p>
        </div>

        <div class="engine-section">
          <h3>⚠️ Test error states:</h3>
          <div class="test-links">
            <a href="/g/TESTUSED" class="test-link">
              <span class="link-label">✅ Allerede aktivert</span>
              <span class="link-code">TESTUSED</span>
            </a>
            <a href="/g/TESTERR1" class="test-link">
              <span class="link-label">❌ Feil - finnes ikke</span>
              <span class="link-code">TESTERR1</span>
            </a>
          </div>
        </div>

        <div class="engine-section" style="background: #f9f9f9;">
          <h3>📦 Teknisk info</h3>
          <ul style="text-align: left; font-size: 14px; color: #666; line-height: 1.8;">
            <li><strong>Framework:</strong> Vite + TypeScript</li>
            <li><strong>Animasjoner:</strong> Anime.js (~8 KB)</li>
            <li><strong>Konfetti:</strong> Canvas Confetti</li>
            <li><strong>Mobile-first:</strong> Optimalisert for iOS Safari/Chrome</li>
          </ul>
        </div>
      </div>
    `;
  }

  private showError(message: string): void {
    this.container.innerHTML = `
      <div class="status-container error-state">
        <div class="status-icon">😕</div>
        <h1>Oops!</h1>
        <p>${message}</p>
        <a href="/" class="cta-button">Tilbake til forsiden</a>
      </div>
    `;
  }

  public start(): void {
    // Parse URL and navigate
    const path = window.location.pathname;
    this.router.navigate(path);

    // Handle browser navigation
    window.addEventListener('popstate', () => {
      const newPath = window.location.pathname;
      this.router.navigate(newPath);
    });

    // Handle link clicks for SPA navigation
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link.hostname === window.location.hostname) {
        e.preventDefault();
        const path = link.pathname + link.search; // Include query parameters
        window.history.pushState({}, '', path);
        this.router.navigate(link.pathname);
      }
    });
  }
}

// Start application
const app = new App();
app.start();