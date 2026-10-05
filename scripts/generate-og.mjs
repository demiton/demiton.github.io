#!/usr/bin/env node
/**
 * Génère la carte Open Graph par défaut du site : `public/og-default.png`,
 * en 1200×630 (le format attendu par Facebook, X, LinkedIn, Slack…).
 *
 * La carte est rendue en HTML/CSS dans Chromium plutôt qu'avec une
 * bibliothèque de dessin : on réutilise ainsi exactement les polices, les
 * couleurs et le fond du site, sans avoir à les rejouer autrement.
 *
 * Usage :
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/generate-og.mjs
 *
 * Le PNG produit est versionné : cette commande n'a besoin d'être relancée que
 * si l'identité visuelle change.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'og-default.jpg');
const PORT = 4404;

/** Fichiers servis au rendu : le fond du hero et les polices du site. */
const FILES = {
	'/bg.webp': join(ROOT, 'public', 'background_demiton.webp'),
	'/anton.woff2': join(ROOT, 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2'),
	'/barlow-400.woff2': join(ROOT, 'node_modules/@fontsource/barlow/files/barlow-latin-400-normal.woff2'),
	'/barlow-600.woff2': join(ROOT, 'node_modules/@fontsource/barlow/files/barlow-latin-600-normal.woff2'),
};

const HTML = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  @font-face { font-family: Anton; src: url('/anton.woff2') format('woff2'); }
  @font-face { font-family: Barlow; font-weight: 400; src: url('/barlow-400.woff2') format('woff2'); }
  @font-face { font-family: Barlow; font-weight: 600; src: url('/barlow-600.woff2') format('woff2'); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
  .card {
    position: relative; width: 1200px; height: 630px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: url('/bg.webp') center / cover no-repeat #0b0b0e;
    font-family: Barlow, sans-serif;
  }
  /* Même voile que le hero de l'accueil : #08080ACC. */
  .overlay { position: absolute; inset: 0; background: #08080acc; }
  .content { position: relative; text-align: center; }
  h1 {
    font-family: Anton, sans-serif; font-weight: 400;
    font-size: 118px; line-height: 1; letter-spacing: 0.02em;
    color: #f2f1ed;
  }
  h1 .accent { color: #e8352b; }
  .sub {
    margin-top: 26px; font-size: 27px; font-weight: 600;
    letter-spacing: 0.16em; color: #35d6d6;
  }
  .bar { width: 132px; height: 5px; margin: 40px auto 0; background: #e8352b; }
  .url {
    position: absolute; left: 0; right: 0; bottom: 44px;
    text-align: center; font-size: 22px; letter-spacing: 0.06em; color: #93939c;
  }
</style></head>
<body>
  <div class="card">
    <div class="overlay"></div>
    <div class="content">
      <h1><span>DEMITON</span> <span class="accent">DOCS</span></h1>
      <p class="sub">GUIDES &amp; NOTES DE DÉVELOPPEMENT</p>
      <div class="bar"></div>
    </div>
    <p class="url">demiton.github.io</p>
  </div>
</body></html>`;

const server = createServer(async (req, res) => {
	const path = new URL(req.url, 'http://x').pathname;
	if (path === '/') {
		res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(HTML);
		return;
	}
	const file = FILES[path];
	if (!file) {
		res.writeHead(404).end();
		return;
	}
	const type = extname(file) === '.woff2' ? 'font/woff2' : 'image/webp';
	res.writeHead(200, { 'content-type': type }).end(await readFile(file));
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

await mkdir(dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready.then(() => true));

// Contrôle : les polices doivent avoir été réellement chargées, sinon la carte
// partirait en production avec une police de substitution.
const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family));
console.log('polices chargées :', [...new Set(loaded)].join(', ') || '(AUCUNE — rendu dégradé)');

const png = await page.screenshot({ type: 'png' });
await browser.close();
server.close();

// Le rendu direct pèse ~730 Kio : inutilement lourd pour un visuel de partage
// qui est retéléchargé à chaque aperçu de lien. Le fond étant une illustration,
// JPEG donne le même résultat pour une fraction de la taille.
const info = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT);
console.log(`✓ ${OUT} (${Math.round(info.size / 1024)} Kio, ${info.width}×${info.height})`);
