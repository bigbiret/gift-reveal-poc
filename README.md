# 🎁 Gift Reveal PoC

En interaktiv gavekort-opplevelse prototype som demonstrerer en engasjerende måte å åpne digitale gavekort på.

## 📋 Oversikt

Dette er en proof of concept for en digital gavekort "unwrapping" opplevelse. Mottakere får en link via SMS/e-post og kan åpne gaven med ett enkelt trykk som trigger en elegant animasjonssekvens.

## 🚀 Kom i gang

### Forutsetninger
- Node.js 18+
- npm 9+

### Installasjon
```bash
# Klone repo
git clone [your-repo-url]
cd gift-reveal-poc

# Installer dependencies
npm install

# Start development server
npm run dev
```

Appen kjører nå på `http://localhost:3000`

## 🧪 Testing

Besøk hjemmesiden for å se alle test-scenarioer, eller gå direkte til:

- **Bursdagsgave:** `/g/TEST1234`
- **Bryllupsgave:** `/g/TESTBRYL`
- **Allerede aktivert:** `/g/TESTUSED`
- **Feil - finnes ikke:** `/g/TESTERR1`
- **Feil - utløpt:** `/g/TESTEXP1`

## 📱 Brukerflyt

1. **Mottaker får link** - SMS/e-post med deeplink til `/g/{CODE}`
2. **Åpner link** - Ser animert gaveboks med senderens navn
3. **Ett trykk** - Trigger enkel og elegant animasjonssekvens:
   - Sløyfe knytes helt opp og forsvinner (0-600ms)
   - Lokket flyr av samtidig som boksen fader bort (600-1200ms)
   - Sparkles eksploderer når lokket flyr (800ms)
   - Konfetti trigges (800ms)
   - Gift content fader subtilt inn (1200ms)
4. **Gavekort vises** - Beløp, melding og "Hent gavekort" knapp
5. **Overføring** - Knapp for deeplink til app (demo: viser alert)

## 🏗 Teknologi

- **Framework:** Vite + TypeScript
- **Styling:** SCSS med mobile-first responsive design
- **Animasjoner:** Anime.js (~8 KB gzipped)
- **Konfetti:** Canvas Confetti
- **Routing:** Custom SPA router
- **Bundle size:** ~16 KB gzipped (production)

## 📂 Prosjektstruktur

```
src/
├── core/           # Forretningslogikk
│   ├── models/     # TypeScript interfaces
│   └── services/   # Service layer (mock/real)
├── controllers/    # Applikasjonslogikk
├── ui/            # Presentasjon
│   ├── animations/ # Animasjonslogikk
│   ├── components/ # UI komponenter
│   └── styles/     # SCSS styles
├── mocks/         # Mock data
├── config/        # Konfigurasjon
├── router.ts      # SPA routing
└── main.ts        # Entry point
```

## 🎨 Features

- ✅ Minimalistisk design med hvit bakgrunn
- ✅ Mobile-first responsive (iOS Safari/Chrome optimalisert)
- ✅ **Anime.js animasjoner** for smooth pakkeåpning
- ✅ **1-trykks elegant reveal** - enkel og subtil animasjonssekvens
- ✅ Synkronisert konfetti og sparkle-effekter
- ✅ Subtile fade-overganger - ikke distraherende bevegelser
- ✅ Personlige meldinger fra sender
- ✅ Tema-spesifikke farger (birthday/wedding/generic)
- ✅ Error handling og status states
- ✅ Mock data for testing

## 📦 Deploy til GitHub Pages

```bash
# Build for production
npm run build

# Deploy til GitHub Pages
npm run deploy
```

**Merk:** Husk å oppdatere `base` i `vite.config.ts` med riktig repository navn.

## 🔄 Neste steg for produksjon

1. **Erstatte mock service** med real API integrasjon
2. **Implementere deeplinks** til faktisk app (iOS/Android universal links)
3. **Legge til analytics** (GA4/Mixpanel) for tracking
4. **Sikkerhet og error logging** (Sentry)
5. **Multi-språk support** (i18n)
6. **A/B testing** for ulike animasjoner og flows
7. **Optimalisere caching** og PWA support
8. **Backend integrasjon** for gift activation og transfer

## 💡 Notater

- Bruker **Anime.js** for kode-baserte animasjoner (~8 KB)
- Animasjoner med tema-farger:
  - Birthday: Rosa (#FFB6C1 / #FF69B4 / #FF1493)
  - Wedding: Hvit/sølv (#FFF0F5 / #FFE4E1 / #C0C0C0)
  - Generic: Grå (#F0F0F0 / #E0E0E0 / #888888)
- **1-trykks subtil sekvens:**
  - 0-600ms: Sløyfe knytes helt opp og forsvinner
  - 600-1200ms: Lokk flyr av, hele boksen fader subtilt bort
  - 800ms: Sparkles + konfetti eksploderer (synkronisert)
  - 1200ms: Gift content fader rolig inn
- Ingen gave-emoji vises - går direkte til gift content (beløp + melding)
- Subtile fade-overganger for profesjonelt uttrykk
- Boksen "forsvinner" uten store bevegelser
- "Hent gavekort"-knappen viser kun alert (ingen real app-integrasjon)
- Alle API-kall er mocket via `MockGiftService`
- Optimalisert for mobil Safari/Chrome
- Total animasjonstid: ~1.2-1.5 sekunder

## 📄 Lisens

Privat prosjekt - ikke for distribusjon