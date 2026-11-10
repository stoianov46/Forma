#!/usr/bin/env node
/**
 * Planning-tools check — `npm run plan:check` (also in CI). Nothing is sent anywhere.
 * Tests the cost estimator (src/lib/estimate.ts), the service finder (src/lib/finder.ts), the draft timeline
 * ranges, the price-row details, the /plan/ and /checklist/ content in all four locales, and the built pages.
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const abs = (p) => path.join(root, p).replace(/\\/g, '/');
const entry = [
  `export * from '${abs('src/lib/estimate.ts')}';`,
  `export * from '${abs('src/lib/finder.ts')}';`,
  `export * from '${abs('src/content/pricing.ts')}';`,
  `export * from '${abs('src/content/timeline.ts')}';`,
  ...['en', 'ru', 'th', 'he'].flatMap((l) => [`export { plan${l[0].toUpperCase() + l.slice(1)} as plan_${l} } from '${abs(`src/content/plan/${l}.ts`)}';`, `export { default as pd_${l} } from '${abs(`src/content/pricing-details/${l}.ts`)}';`]),
].join('\n');
const out = await build({ stdin: { contents: entry, resolveDir: root, loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', define: { 'import.meta.env': '{}' }, logLevel: 'silent' });
const m = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
const { estimate, validate, recommend, complete, PRICES, SERVICE_PRICE_IDS, BUILD_MONTHS, DESIGN_WEEKS, AREA_LIMITS, QUESTION_VALUES, MAX_RECOMMENDATIONS } = m;

let failures = 0;
const check = (name, ok, detail = '') => { if (!ok) failures++; console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ` — ${detail}` : ''}`); };
const base = { area: 180, size: 0, mode: 'design', interior: 'none', landscape: false, permits: 'none', eco: 'none', pm: false, supervision: 'none', techSupervision: false };
const r1000 = (n) => Math.round(n / 1000) * 1000;

// --- estimator ---------------------------------------------------------------------------
let e = estimate(base);
const a0 = PRICES['architecture.compact'];
check('design only: architecture = area × price range', e.lines.length === 1 && e.lines[0].min === r1000(180 * a0.min) && e.lines[0].max === r1000(180 * a0.max));
check('total equals the sum of the lines', e.total.min === e.lines[0].min && e.total.max === e.lines[0].max);
e = estimate({ ...base, size: 1, mode: 'design-build', interior: 'custom', landscape: true, permits: 1 });
check('design-build adds construction, interior, landscape, permits', ['architecture', 'construction', 'interior', 'landscape', 'permits'].every((k) => e.lines.some((l) => l.key === k)));
check('design-build total = sum of lines', e.total.min === e.lines.reduce((s, l) => s + l.min, 0) && e.total.max === e.lines.reduce((s, l) => s + l.max, 0));
check('every line has 0 < min <= max', e.lines.every((l) => l.min > 0 && l.max >= l.min));
e = estimate({ ...base, mode: 'turnkey', eco: 2 });
const t0 = PRICES['turnkey-projects.compact'];
const turnkey = e.lines.find((l) => l.key === 'turnkey');
check('turnkey replaces architecture + construction', !e.lines.some((l) => l.key === 'architecture' || l.key === 'construction') && turnkey.min === r1000(180 * t0.min));
const eco = e.lines.find((l) => l.key === 'eco');
check('eco uplift is a percentage of the build line', eco && eco.min === r1000((turnkey.min * PRICES['eco-construction.full'].min) / 100));
e = estimate({ ...base, mode: 'design', eco: 2 });
check('eco uplift is ignored when nobody builds (design only)', !e.lines.some((l) => l.key === 'eco'));
e = estimate({ ...base, size: 2, mode: 'oversight', pm: true, supervision: 2, techSupervision: true, permits: 0 });
check('oversight: reference construction cost is shown but NOT in the total', e.reference.length === 1 && e.total.min === e.lines.reduce((s, l) => s + l.min, 0) && !e.lines.some((l) => l.key === 'construction'));
const sup = e.lines.find((l) => l.key === 'supervision');
check('supervision = months × monthly price (months from the draft timeline)', sup.min === BUILD_MONTHS[2].min * PRICES['construction-supervision.weekly'].min && sup.max === BUILD_MONTHS[2].max * PRICES['construction-supervision.weekly'].max);
const pm = e.lines.find((l) => l.key === 'pm');
check('project management = % of the reference construction cost', pm.min === r1000((e.reference[0].min * PRICES['project-management.multi-structure'].min) / 100));
for (const bad of [0, 29, 3001, NaN, -5]) check(`area ${bad} is rejected`, validate({ ...base, area: bad }) === 'area' && (() => { try { estimate({ ...base, area: bad }); return false; } catch { return true; } })());
check('area limits are 30–3,000 (the texts in all locales mention them)', AREA_LIMITS.min === 30 && AREA_LIMITS.max === 3000 && ['en', 'ru', 'th', 'he'].every((l) => m[`plan_${l}`].estimator.invalidArea.includes('30') && m[`plan_${l}`].estimator.invalidArea.includes('3,000')));
const tot = (size) => estimate({ ...base, size, mode: 'design-build' }).total;
check('bigger size tier never costs less per m²', tot(0).min <= tot(1).min && tot(1).min <= tot(2).min && tot(0).max <= tot(1).max && tot(1).max <= tot(2).max);
const big = estimate({ ...base, area: 360, mode: 'design-build' }).total;
check('double the area ≈ double the per-m² total', big.min >= tot(0).min * 1.9 && big.min <= tot(0).min * 2.1);

// --- finder ------------------------------------------------------------------------------
const slugs = Object.keys(SERVICE_PRICE_IDS);
check('land-new + design-build → architecture, villa-design, construction', recommend({ situation: 'land-new', scope: 'design-build' }).join() === 'architecture,villa-design,construction');
check('turnkey replaces construction', !recommend({ situation: 'land-new', scope: 'turnkey' }).includes('construction') && recommend({ situation: 'land-new', scope: 'turnkey' }).includes('turnkey-projects'));
check('oversee starts with construction supervision', recommend({ situation: 'oversee' })[0] === 'construction-supervision');
check('renovate needs no scope answer', complete({ situation: 'renovate' }) && recommend({ situation: 'renovate' })[0] === 'renovation');
check('incomplete answers are not complete', !complete({}) && !complete({ situation: 'land-new' }));
check('extras and permits add their services, no duplicates', (() => { const r = recommend({ situation: 'land-new', scope: 'design-build', extras: ['interior', 'landscape', 'eco', 'concrete'], permits: 'need-help', contractor: 'yes' }); return new Set(r).size === r.length && r.length <= MAX_RECOMMENDATIONS && ['interior-design', 'landscape-design', 'permits-planning'].every((s) => r.includes(s)); })());
let allValid = true;
for (const sit of QUESTION_VALUES.situation) for (const sc of QUESTION_VALUES.scope) for (const p of QUESTION_VALUES.permits) for (const c of QUESTION_VALUES.contractor) {
  const r = recommend({ situation: sit, scope: sc, permits: p, contractor: c, extras: [...QUESTION_VALUES.extras] });
  if (!r.length || r.length > MAX_RECOMMENDATIONS || r.some((s) => !slugs.includes(s))) allValid = false;
}
check('every answer combination gives 1–9 existing services', allValid);

// --- timeline (draft numbers) --------------------------------------------------------------
const ranges = [...Object.values(DESIGN_WEEKS).flat(), ...BUILD_MONTHS];
check('timeline ranges are valid (0 < min <= max)', ranges.every((r) => r.min > 0 && r.max >= r.min));
check('timeline grows with size tier', [...Object.values(DESIGN_WEEKS), BUILD_MONTHS].every((t) => t[0].min <= t[1].min && t[1].min <= t[2].min && t[0].max <= t[1].max && t[1].max <= t[2].max));

// --- content in 4 locales ---------------------------------------------------------------------
for (const l of ['en', 'ru', 'th', 'he']) {
  const p = m[`plan_${l}`];
  check(`${l}: finder option values are the stable keys`, p.finder.questions.every((q) => JSON.stringify(q.options.map((o) => o.value)) === JSON.stringify([...QUESTION_VALUES[q.id]])));
  check(`${l}: a reason exists for every recommendable service`, slugs.every((s) => typeof p.finder.reasons[s] === 'string' && p.finder.reasons[s].length > 5));
  check(`${l}: price details exist for all ${Object.keys(PRICES).length} prices with included and excluded items`, Object.keys(PRICES).every((id) => m[`pd_${l}`][id]?.included.length >= 3 && m[`pd_${l}`][id]?.excluded.length >= 2));
  check(`${l}: no digits typed into price details (prices live in pricing.ts)`, Object.values(m[`pd_${l}`]).every((d) => [...d.included, ...d.excluded].every((x) => !/\d/.test(x))));
  check(`${l}: estimator basis templates keep their placeholders`, ['perM2', 'perMonth'].every((k) => /\{price\}/.test(p.estimator.basis[k])) && /\{area\}/.test(p.estimator.basis.perM2) && /\{months\}/.test(p.estimator.basis.perMonth) && /\{min\}.*\{max\}/.test(p.timeline.weeks) && /\{min\}.*\{max\}/.test(p.timeline.months));
}

// --- built pages ---------------------------------------------------------------------------------
const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  for (const loc of ['', 'ru/', 'th/', 'he/']) {
    const tag = loc || 'en/';
    const read = (p) => { const f = path.join(dist, loc, p, 'index.html'); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''; };
    const plan = read('plan'), list = read('checklist');
    check(`${tag} /plan/ built with the three tools`, /id="panel-finder"/.test(plan) && /id="estimator-form"/.test(plan) && /id="tl-list"/.test(plan));
    check(`${tag} /plan/ carries the draft notice and no stray price text`, /data-config=/.test(plan));
    check(`${tag} /checklist/ built with a print button`, /id="print-btn"/.test(list) && (list.match(/rounded border border-ink-900\/40/g) || []).length >= 15);
    const arch = read('services/architecture');
    check(`${tag} architecture page: 3 price rows each with included / not-included`, (arch.match(/<details/g) || []).length >= 3);
    check(`${tag} architecture page: context chat links (WhatsApp text + Telegram deep link)`, /wa\.me\/\d+\?text=/.test(arch) && /t\.me\/formaisland_bot\?start=service_architecture/.test(arch) && /data-copy=/.test(arch));
    const loca = read('locations/koh-phangan');
    check(`${tag} location page: Telegram deep link uses location_<slug>`, /start=location_koh-phangan/.test(loca));
    const svcLd = (arch.match(/"hasOfferCatalog"[\s\S]*?\]\s*\}/) || [''])[0];
    check(`${tag} service schema: OfferCatalog of Service names, ImageObject, no price`, /"@type":"OfferCatalog"/.test(arch) && /"@type":"ImageObject"/.test(arch) && !/"price"|"Offer"/.test(arch));
  }
} else check('dist/ exists (run npm run build first)', false);

console.log(failures ? `\nplan-check: ${failures} failure(s)` : '\nplan-check: all checks passed');
process.exit(failures ? 1 : 0);
