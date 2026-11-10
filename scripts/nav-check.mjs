#!/usr/bin/env node
/**
 * Navigation check — `npm run nav:check` (after `npm run build`; also in CI).
 * Owner decisions D1/D2 (TO-DO_2026-11-03.md), verified on the built HTML of all four locales,
 * for the desktop header AND the mobile menu:
 *   D1  no "Start a Project" button in header, mobile menu or footer; "Contact" stays; the CTA stays in page content
 *   D2  one "Islands" group with exactly Koh Phangan, Koh Samui, Koh Tao, Bali — no Koh Phangan districts
 *   all nav/footer hrefs resolve to a built page; Islands label is translated; 13 service links; RTL on Hebrew
 * Exits 1 on any failure.
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const LOCALES = ['en', 'ru', 'th', 'he'];
const ISLANDS = ['koh-phangan', 'koh-samui', 'koh-tao', 'bali'];
const DISTRICTS = ['thong-sala', 'sri-thanu', 'haad-rin', 'chaloklum', 'baan-tai', 'haad-yao', 'haad-salad'];
const SERVICES = ['architecture', 'villa-design', 'interior-design', 'construction', 'renovation', 'project-management', 'construction-supervision', 'technical-supervision', 'landscape-design', 'permits-planning', 'turnkey-projects', 'eco-construction', 'concrete-construction'];

let failures = 0;
const check = (name, ok, detail = '') => { if (!ok) failures++; console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ` — ${detail}` : ''}`); };
const page = (loc, p) => path.join(dist, loc === 'en' ? '' : loc, p, 'index.html');
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
const section = (html, startRe, endRe) => { const s = html.search(startRe); if (s < 0) return ''; const rest = html.slice(s); const e = rest.search(endRe); return e < 0 ? rest : rest.slice(0, e); };
const links = (html) => [...html.matchAll(/<a [^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }));
const exists = (href) => { const clean = href.split('#')[0].split('?')[0]; return !clean.startsWith('/') || fs.existsSync(path.join(dist, clean, 'index.html')) || fs.existsSync(path.join(dist, clean)); };

// "Start a Project" labels per locale from the dictionary (cta.startProject), to detect the CTA text anywhere in nav.
const dict = fs.readFileSync('src/i18n/dictionary.ts', 'utf8');
const ctaLabels = [...dict.matchAll(/startProject: ['"]([^'"]+)['"]/g)].map((m) => m[1]);
check('found the four "Start a Project" labels in the dictionary', ctaLabels.length >= 4, String(ctaLabels.length));

const enIslandsLabel = (dict.match(/islands: ["']([^"']+)["']/) || [])[1];
for (const loc of LOCALES) {
  const home = read(page(loc, ''));
  check(`${loc}: home page built`, home.length > 0);
  const header = section(home, /<header/, /<\/header>/);
  const mobile = section(home, /id="mobile-menu"/, /<script/);
  const footer = section(home, /<footer/, /<\/footer>/);
  for (const [name, html] of [['header', header], ['mobile menu', mobile]]) {
    const ls = links(html);
    const contact = ls.filter((l) => /\/contact\/$/.test(l.href));
    check(`${loc} ${name}: exactly one Contact link (no extra Start-a-Project button)`, contact.length === 1, contact.map((c) => c.text).join(' | '));
    check(`${loc} ${name}: no "Start a Project" label`, !ls.some((l) => ctaLabels.includes(l.text)), ls.filter((l) => ctaLabels.includes(l.text)).map((l) => l.text).join());
    const islandHrefs = ISLANDS.map((s) => ls.find((l) => l.href.endsWith(`/locations/${s}/`))).filter(Boolean);
    check(`${loc} ${name}: all four islands present`, islandHrefs.length === 4);
    check(`${loc} ${name}: no Koh Phangan district links`, !ls.some((l) => DISTRICTS.some((d) => l.href.includes(`/locations/${d}/`))), ls.filter((l) => DISTRICTS.some((d) => l.href.includes(d))).map((l) => l.href).join());
    check(`${loc} ${name}: 13 service links`, SERVICES.every((s) => ls.some((l) => l.href.includes(`/services/${s}/`))));
    check(`${loc} ${name}: every internal href resolves to a built page`, ls.every((l) => exists(l.href)), ls.filter((l) => !exists(l.href)).map((l) => l.href).join());
  }
  check(`${loc}: Islands group label present in the header`, /<a [^>]*href="[^"]*\/locations\/"[^>]*>[\s\S]*?<\/a>/.test(header) && links(header).some((l) => l.href.endsWith('/locations/')));
  if (loc !== 'en' && enIslandsLabel) {
    const label = links(header).find((l) => l.href.endsWith('/locations/'))?.text;
    check(`${loc}: Islands label is translated`, Boolean(label) && label !== enIslandsLabel, label);
  }
  check(`${loc} footer: no "Start a Project" link`, !links(footer).some((l) => ctaLabels.includes(l.text)));
  const main = section(home, /<main/, /<\/main>/);
  check(`${loc}: the Start-a-Project CTA is still available inside page content`, links(main).some((l) => /\/contact\/(\?|$)/.test(l.href) && ctaLabels.includes(l.text)));
  check(`${loc}: <html dir> is ${loc === 'he' ? 'rtl' : 'ltr'}`, new RegExp(`<html[^>]*dir="${loc === 'he' ? 'rtl' : 'ltr'}"`).test(home));
}
console.log(failures ? `\nnav-check: ${failures} failure(s)` : '\nnav-check: all checks passed');
process.exit(failures ? 1 : 0);
