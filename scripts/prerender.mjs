/**
 * After `vite build`, injects SSR HTML into each route's index.html and JSON-LD.
 * Copies dist/index.html → dist/404.html for GitHub Pages SPA fallback.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE = 'https://mattiasakke.com';

const ROUTES = [
  {
    path: '/',
    outDir: '',
    title: 'Mattias Akke — Nanoscience & ML for Science',
    description:
      'Mattias Akke — computational chemistry & machine learning researcher (Molecular AI Lab, AstraZeneca). MSc nanoscience Lund. Molecular dynamics, Bayesian optimisation, LLMs in active learning, GROMACS, iGEM, lectures, IMO-oriented teaching & competitive programming — Sweden.',
  },
  {
    path: '/about',
    outDir: 'about',
    title: 'About — Mattias Akke',
    description:
      'About Mattias Akke: MSc.Eng. engineering nanoscience, computational chemistry, AI for science at AstraZeneca, MIT Gómez-Bombarelli, Cambridge Knowles, Politecnico Pavan, Lund, Karolinska; Physics Olympiad & EGMO outreach with Kodsport.',
  },
  {
    path: '/research',
    outDir: 'research',
    title: 'Research — Mattias Akke',
    description:
      'Research portfolio: LLM-mediated Bayesian optimisation, molecular dynamics & metadynamics (GROMACS, PLUMED, Martini), amyloid microfluidics, physics-informed networks, iGEM peptide & synthetic biology projects — papers & PDFs.',
  },
  {
    path: '/lectures',
    outDir: 'lectures',
    title: 'Lectures — Mattias Akke',
    description:
      'Teaching: Nordic IMO “optimised learning for elite mathematicians”, Kodsport Sverige competitive programming, Ung Vetenskapssport advanced mathematics — materials for high-school & university.',
  },
  {
    path: '/cv',
    outDir: 'cv',
    title: 'CV — Mattias Akke',
    description:
      'CV / resume: Mattias Akke — PDF viewer, line-oriented cv.txt & structured cv.json; nanoscience, ML, internships (MIT, Cambridge, Turin), awards (IPhO, EUCYS, iGEM), military service, references.',
  },
];

function escapeHtmlAttr(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\s+/g, ' ')
    .trim();
}

function injectHead(html, { title, description, canonical }, jsonLdScript) {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlAttr(title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtmlAttr(description)}" />`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeHtmlAttr(canonical)}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtmlAttr(title)}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtmlAttr(description)}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeHtmlAttr(canonical)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(title)}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(description)}" />`
  );

  const ldTag = `    <script type="application/ld+json">${jsonLdScript}</script>\n`;
  if (out.includes('application/ld+json')) {
    out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/m, ldTag);
  } else {
    out = out.replace('  </head>', `${ldTag}  </head>`);
  }

  return out;
}

async function main() {
  const templatePath = path.join(dist, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html missing — run vite build first');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    // Do NOT list react-dom here: bundling it pulls in server.node.js (CommonJS `require`),
    // which fails in Vite's ESM SSR evaluator ("require is not defined"). Let Node load it.
    ssr: {
      noExternal: ['framer-motion'],
    },
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/prerender/entry-prerender.jsx');
    const { buildJsonLdScriptContent } = await vite.ssrLoadModule('/src/prerender/buildJsonLd.js');
    const jsonLdScript = buildJsonLdScriptContent();

    for (const route of ROUTES) {
      const canonical = `${SITE}${route.path === '/' ? '/' : `${route.path}/`}`;
      const appHtml = render(route.path);
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      html = injectHead(html, { title: route.title, description: route.description, canonical }, jsonLdScript);

      if (route.outDir) {
        const dir = path.join(dist, route.outDir);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
      } else {
        fs.writeFileSync(templatePath, html, 'utf-8');
      }
    }

    fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
    console.log('Prerender complete:', ROUTES.map((r) => r.path).join(', '));
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
