// Build-time prerender: renders each public route to static HTML so search
// engines and link-preview bots (which often don't run JavaScript) get real
// content, titles, canonicals and Open Graph tags instead of an empty shell.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// Keep in sync with public/sitemap-pages.xml. Alias routes (/privacidad, /tyc, ...)
// aren't listed: nginx 301-redirects them to these canonical paths.
const ROUTES = [
  '/',
  '/precios',
  '/casos-de-uso',
  '/politica-de-tratamiento-de-datos',
  '/terminos-y-condiciones',
];

const { render } = await import(path.join(root, 'dist-ssr/entry-server.js'));
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

// React 19 emits hoistable tags (<title>, <meta>, <link>) at the very start of
// the rendered markup. Peel them off and move them into <head>; React's
// hydration reuses matching tags already in <head> instead of duplicating them.
const HOISTABLE = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function splitHead(markup) {
  let head = '';
  let rest = markup;
  let match;
  while ((match = rest.match(HOISTABLE))) {
    head += match[0];
    rest = rest.slice(match[0].length);
  }
  return { head, body: rest };
}

function renderPage(url) {
  const { head, body } = splitHead(render(url));
  if (!head.includes('<title>')) {
    throw new Error(`Prerender of ${url} produced no <title> — SEO tags missing`);
  }
  return template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body);
}

for (const url of ROUTES) {
  const outFile = url === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, renderPage(url));
  console.log(`prerendered ${url} -> ${path.relative(root, outFile)}`);
}

// Any unmatched path renders the NotFound route; nginx serves this with a
// real 404 status for unknown URLs.
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/__404__'));
console.log('prerendered 404 -> dist/404.html');
