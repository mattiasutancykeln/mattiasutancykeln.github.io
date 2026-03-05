# PROJECT.md — Mattias Akke Personal Website

> A personal research website for Mattias Akke: nanoscientist, computational chemist, and competitive programmer.
> Inspired by znah.net but with a wet-lab / structural-biology colour palette.

---

## 0. Design Philosophy

**Aesthetic direction:** *Lab Notebook Meets Particle Simulation* — dark, scientific, alive.

The site should feel like looking through an electron microscope crossed with a computational chemistry paper. Not pharma-clean, not startup-minimal — *researcher's desk*: dense with meaning, occasionally beautiful, always precise.

**Reference:** znah.net — card-based project layout, dark background, no bloat, personality in the physics.

**Color palette (CSS variables):**
```css
--bg:           #0D1A14;   /* deep forest/dark-room green */
--bg-surface:   #121F18;   /* card/panel bg */
--bg-hover:     #1A2E22;   /* hover state */
--accent-teal:  #3ECFB2;   /* primary accent — cyan-teal, phosphorescent */
--accent-sage:  #7EB89A;   /* secondary — muted sage green */
--accent-amber: #D4A84B;   /* highlight, links, interactive — warm gold */
--text-primary: #EAE8E0;   /* off-white, warm */
--text-muted:   #6E8A7A;   /* dimmed text */
--border:       #1E3328;   /* subtle borders */
--particle-sm:  rgba(62, 207, 178, 0.55);
--particle-lg:  rgba(126, 184, 154, 0.4);
```

**Typography:**
- Display / Name: `"Playfair Display"` or `"EB Garamond"` — classical, scholarly
- Body: `"IBM Plex Sans"` — clean, technical
- Monospace labels / metadata: `"IBM Plex Mono"`
- Load from Google Fonts

**Tone:** Quiet confidence. No hero-text superlatives. Let the physics simulation and the work speak.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Vite + React 18** | Fast dev, small bundle |
| Routing | **React Router v6** (`HashRouter`) | Works on GitHub Pages without server config |
| Physics sim | **Custom Canvas 2D** (no lib needed) | Full control, zero dependency |
| Content | **JSON + Markdown files** in `/src/content/` | Easy to edit, no CMS needed |
| PDF viewer | **`@react-pdf-viewer/core`** + `pdfjs-dist` | Renders PDF in-page cleanly |
| Markdown renderer | **`react-markdown` + `remark-gfm`** | For post body text |
| Animations | **Framer Motion** | Page transitions, card reveals |
| Hosting | **GitHub Pages** via `gh-pages` npm script | Free, simple |
| Styling | **CSS Modules** (or plain CSS with variables) | No Tailwind — keep full design control |

**`package.json` scripts:**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

**`vite.config.js`:**
```js
export default {
  base: '/your-repo-name/',  // set to GitHub repo name
}
```

---

## 2. Project Structure

```
/
├── public/
│   ├── cv.pdf                    # Mattias's CV
│   ├── headshot.jpg              # Profile photo
│   └── content/
│       ├── research/
│       │   └── [slug]/
│       │       ├── meta.json     # title, date, summary, tags, link, pdfFile
│       │       └── figure.png
│       └── lectures/
│           └── [slug]/
│               ├── meta.json
│               └── figure.png
│
├── src/
│   ├── components/
│   │   ├── BrownianCanvas.jsx    # Landing page simulation
│   │   ├── NavOverlay.jsx        # Floating nav on landing page
│   │   ├── PostCard.jsx          # Shared research/lecture card
│   │   ├── PostModal.jsx         # Opens post detail with PDF viewer
│   │   └── Layout.jsx            # Wrapper for inner pages (nav bar, footer)
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   ├── Research.jsx
│   │   ├── Lectures.jsx
│   │   └── CV.jsx
│   │
│   ├── content/
│   │   ├── research.js           # imports all research meta.json files
│   │   └── lectures.js           # imports all lecture meta.json files
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       ├── global.css
│       └── variables.css
```

---

## 3. Page Specifications

### 3.1 Landing Page (`/`)

**Layout:** Full-viewport canvas. No scrolling. Floating nav pills.

**The simulation — `BrownianCanvas.jsx`:**

Physics rules:
- ~120 particles total. 85% small (radius 3–6px), 15% large (radius 10–20px).
- Each particle has a random velocity vector. Brownian random walk: each frame, add a tiny random delta to velocity (`brownianForce`), then dampen slightly.
- Particles bounce elastically off canvas edges.
- **Mouse repulsion:** Each frame compute distance from mouse to each particle. If `dist < 120px`, apply a repulsion force scaled by `1/dist²` — particles scatter outward like a bullet through water molecules. Large particles scatter less (higher mass).
- **Name-as-walls:** Render "MATTIAS AKKE" in large display font to a hidden off-screen canvas. Read pixel data. Build a grid of occupied cells. Each frame, check if a particle would move into an occupied cell → reflect its velocity component perpendicular to the text surface. The text should glow faintly in `--accent-teal` like phosphorescent lettering. Tip: use font size ~140px, centered. Sample every 3px for the collision grid.
- Particle colors: small → `--particle-sm`, large → `--particle-lg`. Slight motion blur: set canvas globalAlpha to 0.18 on the background clear rect.

**Floating nav — `NavOverlay.jsx`:**
- Four pill buttons positioned absolutely: "About", "Research", "Lectures", "CV"
- Positioned like: About (top-left area), Research (top-right), Lectures (bottom-left), CV (bottom-right) — roughly symmetric but slightly organic, not perfectly grid-aligned.
- Style: `backdrop-filter: blur(8px)`, semi-transparent background using `--bg-surface`, `--accent-teal` border, hover → fill with `--accent-teal`, text flips to dark.
- Subtle pulse animation on initial load (Framer Motion `animate` keyframe).
- On click: navigate via React Router, with a fade-out transition of the canvas.

**Metadata label:**
- Small monospace text bottom-center: `"Brownian dynamics — Langevin thermostat"` — a little scientist easter egg.

---

### 3.2 About Page (`/about`)

**Layout:** Single centered column, max-width 680px, comfortable padding.

**Contents (top to bottom):**
1. Small breadcrumb: `← home`
2. Headshot image: circular crop, `160px` diameter, `--accent-teal` ring border, slight drop shadow.
3. Name: `"Mattias Akke"` in display font, `2.4rem`.
4. One-liner subtitle in monospace: `"MSc.Eng. Nanoscience · AI for science · Competitive programmer"`
5. Bio paragraph (~150 words): Write something warm but precise. Pull from CV. Suggested draft:

> *I'm a graduate researcher at the intersection of computational chemistry, machine learning, and mathematical modelling. My work spans molecular dynamics simulations of self-assembling supramolecular systems, Bayesian optimisation for biochemical discovery, and the design of generative models for molecular structure.*
>
> *I completed my MSc.Eng. in Engineering Nanoscience at Lund University, with research stints at MIT (Gómez-Bombarelli group), University of Cambridge (Knowles group), Politecnico di Torino (Pavan group), and Karolinska Institute. I'm a Physics Olympiad medalist, EUCYS winner in Biochemistry, and founded the European Girls' Olympiad in Informatics.*
>
> *Outside research I run long distances, climb rocks, and teach competitive programming.*

6. Contact links row (icons): GitHub (`mattiasutancykeln`), LinkedIn (`mattias-akke`), email — using simple SVG icons.

**Design notes:**
- No heavy decoration. Clean, confident.
- Subtle entrance animation: headshot fades in from slight blur, text slides up staggered.

---

### 3.3 Research Page (`/research`)

**Layout:** Masonry-style card grid (2 columns on desktop, 1 on mobile). Cards have slight height variation.

**Data source:** `/public/content/research/` — each entry is a folder with `meta.json`:
```json
{
  "slug": "bayesian-opt-llms",
  "title": "Bayesian Optimization for Biochemical Discovery with LLMs",
  "institution": "MIT — Gómez-Bombarelli Group",
  "date": "2025",
  "summary": "Combining large language models with Bayesian optimization loops for accelerated biochemical property prediction and molecular design.",
  "tags": ["Bayesian Optimization", "LLMs", "Drug Discovery"],
  "figure": "figure.png",
  "externalLink": "https://neurips.cc/...",
  "pdfFile": "paper.pdf",
  "status": "Under review — Nature Machine Intelligence"
}
```

**Pre-populate with these entries from CV:**
1. Bayesian Optimization for Biochemical Discovery with LLMs (MIT, 2025) — NeurIPS 2025, under review Nature MI
2. Multiscale Modelling of Supramolecular Assemblies of Light-Driven Molecular Motors (Politecnico di Torino, 2023) — GRC poster, JCTC under revision
3. Nano-scale heat engine efficiency (Lund, 2022) — Research assistant work
4. Protein ion binding with microfluidics + Physics-informed NN for amyloids (Cambridge, 2021)
5. iGEM: Anti-oomycete peptides with ensemble models (Lund, 2021) — Gold medal
6. HIV-1 immunogen T-cell response (Karolinska, 2018)

**`PostCard` component:**
```
┌─────────────────────────────────┐
│  [figure image, aspect 16:9]    │
├─────────────────────────────────┤
│  INSTITUTION · YEAR  [tag][tag] │
│  Title in display font          │
│  Summary (2 lines, truncated)   │
│  ─────────────────────────────  │
│  [↗ Paper]  [⬇ PDF]  [→ More]  │
└─────────────────────────────────┘
```
- Card bg: `--bg-surface`. Border: `1px solid --border`.
- Hover: border color → `--accent-teal`, very subtle box-shadow glow.
- `status` badge if present: pill in amber, top-right corner of figure.
- Tags: small monospace pills.

**`PostModal` (click "→ More"):**
- Full-screen overlay with `backdrop-filter: blur(12px)`.
- Left half: full summary + tags + links.
- Right half: PDF viewer (`@react-pdf-viewer`) if `pdfFile` exists, else figure enlarged.
- Close button top-right. ESC key closes.

---

### 3.4 Lectures Page (`/lectures`)

Same architecture as Research page. Different icon set (chalkboard/book instead of molecule).

**Pre-populate entries:**
1. "Optimised learning for elite mathematicians" — Nordic IMO Teams workshop (2025)
2. Competitive programming workshops — Kodsport Sverige (2019–now)
3. Advanced mathematics workshops — Ung Vetenskapssport (2018–now)

`meta.json` schema same as Research but add `"venue"` and `"audience"` fields.

**Cards slightly different visual treatment:** Use `--accent-sage` as the accent instead of teal, to visually differentiate the section from Research.

---

### 3.5 CV Page (`/cv`)

**Layout:** Full-height iframe-style PDF embed.

```jsx
// Use @react-pdf-viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Render:
<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.x.x/build/pdf.worker.min.js">
  <Viewer fileUrl="/cv.pdf" plugins={[defaultLayoutPlugin()]} />
</Worker>
```

- Override the PDF viewer toolbar to match site colors.
- Also add a top-right download button: `<a href="/cv.pdf" download>Download CV ↓</a>`.
- Page: 92vh height viewer, small padding, breadcrumb at top.

---

## 4. Navigation (Inner Pages)

Inner pages (About, Research, Lectures, CV) share a `Layout` component:

```
┌──────────────────────────────────────────────────────────────────┐
│  MA  ·  About  Research  Lectures  CV       [in] [gh] [ig] [← ] │  ← top nav bar
└──────────────────────────────────────────────────────────────────┘
```

- `MA` monogram links back to `/`.
- Nav links: subtle underline on active, `--accent-teal` color.
- **Social icons — top right of nav bar:** LinkedIn, GitHub, Instagram. Use SVG icons from `lucide-react` (`Linkedin`, `Github`) and a plain Instagram SVG (lucide doesn't have one — use the official SVG path or `react-icons/fa` `FaInstagram`). Links:
  - LinkedIn: `https://linkedin.com/in/mattias-akke`
  - GitHub: `https://github.com/mattiasutancykeln`
  - Instagram: find handle from CV/context or leave as a `TODO` placeholder
  - Icons: `20px`, color `--text-muted` by default, hover → `--accent-teal` with a 150ms transition. No labels, just icons. Small gap between them (`8px`).
- Bar bg: `--bg` with `border-bottom: 1px solid --border` and `backdrop-filter: blur(10px)` when scrolled.
- Footer: `"Mattias Akke · Lund, Sweden · [year]"` — tiny, right-aligned.

Page transitions: Framer Motion `AnimatePresence` with a 200ms fade.

---

## 5. GitHub Pages Deployment

```bash
# Initial setup
npm install gh-pages --save-dev

# In vite.config.js: set base: '/repo-name/'
# In package.json: add "homepage": "https://mattiasutancykeln.github.io/repo-name/"

# Deploy
npm run deploy
```

Use GitHub Actions for auto-deploy on push to `main`:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 18 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 6. Implementation Order (for Cursor agent)

Build in this sequence to see results fast:

1. **Scaffold:** `npm create vite@latest . -- --template react`, install deps, set up Router, global CSS with color variables + font imports.
2. **Landing page canvas:** Get `BrownianCanvas.jsx` working — particles bouncing, mouse repulsion. Confirm physics feels right before adding text walls.
3. **Text collision grid:** Add name-as-walls pixel sampling. Tune font size and glow.
4. **Floating nav:** Add `NavOverlay` pills on top of canvas.
5. **Layout component + routing:** Set up all routes, inner page shell with nav bar.
6. **About page:** Static, just needs headshot + text + styling.
7. **Content loading:** Write `research.js` and `lectures.js` to load JSON metadata.
8. **PostCard component:** Build shared card with all variants.
9. **Research + Lectures pages:** Grid of cards using PostCard.
10. **PostModal:** Overlay with PDF viewer.
11. **CV page:** PDF embed + download button.
12. **Polish:** Page transitions, hover states, mobile responsive layout.
13. **Deploy:** GitHub Actions setup, first deploy.

---

## 7. Key Implementation Notes for Cursor

### Brownian Canvas — physics pseudocode
```js
// Each frame:
ctx.fillStyle = 'rgba(13, 26, 20, 0.18)'; // --bg with low alpha = motion blur
ctx.fillRect(0, 0, W, H);

for (const p of particles) {
  // Brownian noise
  p.vx += (Math.random() - 0.5) * BROWNIAN_FORCE;
  p.vy += (Math.random() - 0.5) * BROWNIAN_FORCE;
  
  // Dampen
  p.vx *= 0.995;
  p.vy *= 0.995;
  
  // Mouse repulsion
  const dx = p.x - mouse.x, dy = p.y - mouse.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < REPULSION_RADIUS && dist > 1) {
    const force = REPULSION_STRENGTH / (dist * dist * p.mass);
    p.vx += (dx / dist) * force;
    p.vy += (dy / dist) * force;
  }
  
  // Text collision grid check
  const nx = p.x + p.vx, ny = p.y + p.vy;
  if (isTextPixel(nx, ny, textGrid)) {
    // Reflect: simple velocity sign flip + nudge
    p.vx *= -0.8;
    p.vy *= -0.8;
  } else {
    p.x = nx; p.y = ny;
  }
  
  // Wall bounce
  if (p.x < p.r || p.x > W - p.r) p.vx *= -1;
  if (p.y < p.r || p.y > H - p.r) p.vy *= -1;
  
  // Draw
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fillStyle = p.r > 8 ? VAR_PARTICLE_LG : VAR_PARTICLE_SM;
  ctx.fill();
}
```

### Text pixel grid — setup (run once on mount)
```js
const offscreen = document.createElement('canvas');
offscreen.width = W; offscreen.height = H;
const octx = offscreen.getContext('2d');
octx.fillStyle = '#000';
octx.fillRect(0, 0, W, H);
octx.font = 'bold 130px "Playfair Display", serif';
octx.fillStyle = '#fff';
octx.textAlign = 'center';
octx.textBaseline = 'middle';
octx.fillText('MATTIAS AKKE', W / 2, H / 2);

const imageData = octx.getImageData(0, 0, W, H).data;
// Build boolean grid sampled every GRID_CELL pixels
const CELL = 3;
const grid = new Uint8Array(Math.ceil(W/CELL) * Math.ceil(H/CELL));
for (let y = 0; y < H; y += CELL)
  for (let x = 0; x < W; x += CELL)
    if (imageData[((y * W + x) * 4) + 3] > 128)
      grid[Math.floor(y/CELL) * Math.ceil(W/CELL) + Math.floor(x/CELL)] = 1;

// isTextPixel:
function isTextPixel(x, y, grid) {
  const gx = Math.floor(x / CELL), gy = Math.floor(y / CELL);
  return grid[gy * Math.ceil(W/CELL) + gx] === 1;
}
```

### PDF viewer pdfjs worker version
Match `pdfjs-dist` version in `package.json` exactly. Use `3.11.174` which is stable:
```
npm install pdfjs-dist@3.11.174 @react-pdf-viewer/core @react-pdf-viewer/default-layout
```
Worker URL: `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`

### Content loading pattern
```js
// src/content/research.js
// Use Vite's import.meta.glob for JSON files in public:
// NOTE: for /public assets, just fetch them at runtime:
export async function loadResearchPosts() {
  const index = await fetch('/content/research/index.json').then(r => r.json());
  return index; // index.json lists all slugs
}
```
Simpler alternative: hardcode the posts array directly in `research.js` and `lectures.js` — content won't change often. Only use dynamic loading if you want the site to scale to 50+ posts.

---

## 8. Assets Needed (gather before starting)

- [ ] `public/headshot.jpg` — the photo from the CV, cropped square, min 400×400px
- [ ] `public/cv.pdf` — the full CV PDF
- [ ] Figure images for each research/lecture entry (can use placeholder images initially)
- [ ] GitHub repo name (for `vite.config.js` base path)
- [ ] Custom domain? (optional — if yes, add CNAME file to `public/`)

---

## 9. Mobile Responsiveness

- Landing: canvas scales to viewport. Nav pills reposition to bottom strip (2×2 grid) on small screens. Text size: 80px on mobile.
- Inner pages: single column below 768px. Card grid: 1 column on mobile.
- PostModal: full screen on mobile, no split-pane layout.
- PDF viewer: still works on mobile (pinch zoom supported by default layout plugin).

---

*This document is the single source of truth for the Cursor agent. All design, architecture, and implementation decisions flow from here. No feature not listed here should be added without updating this document first.*