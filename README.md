# Syarif Adrian - Personal Portfolio

A fast, responsive, static personal portfolio built with vanilla HTML, modern CSS, and JavaScript. Designed with an Apple-inspired aesthetic, clean editorial hierarchy, and zero build-step or runtime dependencies.

## Structure

```text
Portfolio Syarif Adrian/
├── index.html           # Main single-page application structure
├── styles.css           # Vanilla CSS design system, typography, and responsive layouts
├── script.js            # Interactive tab switcher, deep linking, lightbox, and navigation
├── .nojekyll            # Prevents GitHub Pages from ignoring directories with leading underscores
├── Projects.MD          # Technical documentation and specifications for selected systems
├── README.md            # Setup and deployment documentation
└── assets/              # All optimized WebP images, screenshots, and PDF documents
    ├── portrait.webp
    ├── student-portrait.webp
    ├── amc-*.webp
    ├── sentiment-*.webp
    ├── spotifai-*.webp
    ├── exp-*.webp
    ├── cv-syarif-adrian.pdf
    ├── toefl-certificate.pdf
    └── claude-code-in-action.pdf
```

## Preview Locally

You can open `index.html` directly in any modern browser. For embedded PDF viewers to render reliably, start a local static server:

### Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

### Using Node / npx:
```bash
npx serve
```

## Deploying to GitHub Pages

1. Create a GitHub repository under your account (e.g., `SyarifAdriann/portfolio` or `SyarifAdriann.github.io`).
2. Copy the contents of this folder into your repository root.
3. Push to your `main` branch.
4. On GitHub, navigate to **Settings -> Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, choose `main` branch and `/(root)` directory, then click **Save**.
6. Your live portfolio will be available at your GitHub Pages URL (e.g., `https://syarifadriann.github.io/`).

## Key Features

- **Apple-Inspired Design Engineering:** Clean frosted materials (`backdrop-filter`), tailored neutral color palette, and zero purple gradients.
- **Interactive Project Selection Deck:** Prominent 3-card project deck allowing reviewers to inspect the Aircraft Parking Recommender, Airline Sentiment Platform, and spotifai Android player with zero scroll fatigue.
- **Embedded Document Previews:** Integrated inline PDF viewers for Syarif's Curriculum Vitae, official TOEFL certificate (Score: 663), and Anthropic Claude Code in Action certificate.
- **Responsive & Accessible:** Fluid scaling across ultra-wide monitors, laptops, tablets, and mobile devices with full keyboard navigation and high-contrast typography.
