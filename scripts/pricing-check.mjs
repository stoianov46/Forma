#!/usr/bin/env node
/**
 * Pricing consistency check — see PRICING_MASTER.md.
 *   npm run pricing:check     verify (after `npm run build`)
 *   npm run pricing:master    regenerate the table in PRICING_MASTER.md
 *
 * 1. Every price has 0 < min <= max; every id is used by SERVICE_PRICE_IDS; ids exist.
 * 2. Locale content files contain no price figures (no ฿ / THB / "NN,NNN" numbers, no `range:` keys).
 * 3. In dist/: every service page in every locale renders exactly the ids/figures from pricing.ts
 *    (identical numbers in EN/RU/TH/HE).
 * 4. No schema.org Offer / priceSpecification is emitted while prices are drafts.
 * 5. PRICING_MASTER.md matches pricing.ts.
 * Exit 1 on any error.
 */
import fs from 'node:fs';
import path from 'node:path';
import { PRICES, SERVICE_PRICE_IDS, PRICING_UPDATED, PRICING_STATUS, formatPrice, formatAmount } from '../src/content/pricing.ts';

const root = process.cwd();
let errors = 0;
const fail = (m) => { errors++; console.error('  ERROR ' + m); };

const UNIT_LABEL = { 'per-m2': 'THB / m²', fixed: 'THB (fixed)', 'per-month': 'THB / month', percent: '% of construction cost', 'percent-uplift': '% above standard construction cost' };
function masterTable() {
  const rows = Object.entries(SERVICE_PRICE_IDS).flatMap(([slug, ids]) => ids.map((id) => `| ${slug} | \`${id}\` | ${formatAmount(id)} | ${UNIT_LABEL[PRICES[id].unit]} |`));
  return ['| Service | Price id | Range | Unit |', '|---|---|---|---|', ...rows].join('\n');
}
const START = '<!-- pricing:table:start -->', END = '<!-- pricing:table:end -->';
const masterPath = path.join(root, 'PRICING_MASTER.md');

if (process.argv.includes('--write')) {
  const body = `# Pricing Master\n\nStatus: **${PRICING_STATUS}** · reviewed ${PRICING_UPDATED} · currency THB\n\nGenerated from [\`src/content/pricing.ts\`](src/content/pricing.ts) by \`npm run pricing:master\`. **Do not edit the table by hand.** Reasoning and evidence: [PRICING_STRATEGY.md](PRICING_STRATEGY.md).\n\nAll prices are indicative drafts, exclude VAT, government fees and land, and are not quotations. Structured data must not present them as offers.\n\n${START}\n${masterTable()}\n${END}\n`;
  fs.writeFileSync(masterPath, body);
  console.log('PRICING_MASTER.md written');
  process.exit(0);
}

for (const [id, p] of Object.entries(PRICES)) if (!(p.min > 0 && p.max >= p.min)) fail(`PRICES["${id}"]: need 0 < min <= max`);
const used = new Set();
for (const [slug, ids] of Object.entries(SERVICE_PRICE_IDS)) for (const id of ids) { used.add(id); if (!(id in PRICES)) fail(`${slug}: unknown price id ${id}`); }
for (const id of Object.keys(PRICES)) if (!used.has(id)) fail(`PRICES["${id}"] is not used by any service`);

// 2. locale files hold no figures
const dir = path.join(root, 'src/content/services');
for (const f of fs.readdirSync(dir).filter((x) => /^(en|ru|th|he)\.ts$/.test(x))) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const blocks = [...src.matchAll(/pricingRows:\s*\[([\s\S]*?)\n\s*\],/g)].map((m) => m[1]);
  if (blocks.length !== Object.keys(SERVICE_PRICE_IDS).length) fail(`${f}: ${blocks.length} pricingRows blocks, expected ${Object.keys(SERVICE_PRICE_IDS).length}`);
  for (const b of blocks) {
    if (/range:|priceId:/.test(b)) fail(`${f}: pricingRows contain a range/priceId key`);
    if (/฿|THB|\d{1,3}[,.]\d{3}|\d\s?(?:baht|บาท)/i.test(b)) fail(`${f}: a price figure is typed into content: ${b.match(/฿|THB|\d{1,3}[,.]\d{3}/)?.[0]}`);
  }
}

// 3 + 4. dist
const distDir = path.join(root, 'dist');
if (!fs.existsSync(distDir)) fail('dist/ missing — run `npm run build` first');
else {
  for (const [slug, ids] of Object.entries(SERVICE_PRICE_IDS)) for (const loc of ['', 'ru/', 'th/', 'he/']) {
    const file = path.join(distDir, loc, 'services', slug, 'index.html');
    if (!fs.existsSync(file)) { fail(`missing page ${loc}services/${slug}/`); continue; }
    const html = fs.readFileSync(file, 'utf8');
    const found = [...html.matchAll(/<bdi dir="ltr" data-price-id="([^"]+)">([^<]*)<\/bdi>/g)].map((m) => [m[1], m[2].replace(/&#x?[0-9a-f]+;/gi, (e) => String.fromCodePoint(parseInt(e.replace(/&#x?|;/g, ''), e.includes('x') ? 16 : 10)))]);
    if (found.length !== ids.length) { fail(`${loc}services/${slug}/: ${found.length} priced rows, expected ${ids.length}`); continue; }
    found.forEach(([id, text], i) => { if (id !== ids[i]) fail(`${loc}services/${slug}/ row ${i}: id ${id} != ${ids[i]}`); else if (text !== formatPrice(ids[i])) fail(`${loc}services/${slug}/ row ${i}: shows "${text}", expected "${formatPrice(ids[i])}"`); });
  }
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== '_astro') walk(f); } else if (e.name.endsWith('.html')) { const h = fs.readFileSync(f, 'utf8'); if (/"@type":"(Offer|AggregateOffer|OfferCatalog|PriceSpecification)"|"priceSpecification"/.test(h)) fail(`${f.slice(distDir.length)}: Offer/price schema emitted while prices are drafts`); } } })(distDir);
}

// 5. master doc in sync
if (!fs.existsSync(masterPath)) fail('PRICING_MASTER.md missing — run `npm run pricing:master`');
else { const m = fs.readFileSync(masterPath, 'utf8'); const a = m.indexOf(START), b = m.indexOf(END); if (a < 0 || m.slice(a + START.length, b).trim() !== masterTable()) fail('PRICING_MASTER.md is out of date — run `npm run pricing:master`'); }

console.log(errors ? `\npricing:check FAILED (${errors} error${errors > 1 ? 's' : ''})` : `pricing:check OK — ${Object.keys(PRICES).length} prices, ${Object.keys(SERVICE_PRICE_IDS).length} services × 4 locales`);
process.exit(errors ? 1 : 0);
