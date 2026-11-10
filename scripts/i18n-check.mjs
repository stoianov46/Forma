#!/usr/bin/env node
/**
 * Translation check — `npm run i18n:check` (also in CI). English is the master.
 *
 * For services, locations, projects, about, process, home, long-form service sections, the /plan/ page content, price-row details, the legal pages and the UI dictionary,
 * every RU / TH / HE entry must have the same structure as English (same keys, same list lengths, no empty
 * strings), every English page must exist in all locales, the digits in a string must survive translation,
 * and a translated string must not still be English (identical to the English text or mostly Latin letters).
 *
 *   npm run i18n:check               summary + errors; exits 1 on any error
 *   npm run i18n:check -- --verbose  list every finding
 * Allow-list (proper names that stay in English): scripts/i18n-allow.json.
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const verbose = process.argv.includes('--verbose');
const allow = JSON.parse(fs.readFileSync(path.join(root, 'scripts/i18n-allow.json'), 'utf8'));
const LOCALES = ['ru', 'th', 'he'];
const SLUG_GROUPS = ['services', 'locations', 'projects'];
const abs = (p) => path.join(root, p).replace(/\\/g, '/');

const services = fs.readdirSync(path.join(root, 'src/content/services/extended/en')).map((f) => f.replace(/\.ts$/, ''));
const lines = [
  ...SLUG_GROUPS.flatMap((g) => ['en', ...LOCALES].map((l) => `export { ${g}${l[0].toUpperCase() + l.slice(1)}Content as ${g}_${l} } from '${abs(`src/content/${g}/${l}.ts`)}';`)),
  ...['about', 'process', 'home'].flatMap((g) => ['en', ...LOCALES].map((l) => `export { ${g}${l[0].toUpperCase() + l.slice(1)} as ${g}_${l} } from '${abs(`src/content/${g}/${l}.ts`)}';`)),
  `export { dictionaries } from '${abs('src/i18n/dictionary.ts')}';`,
  ...['en', ...LOCALES].map((l) => `export { plan${l[0].toUpperCase() + l.slice(1)} as plan_${l} } from '${abs(`src/content/plan/${l}.ts`)}';`),
  ...['en', ...LOCALES].map((l) => `export { legal${l[0].toUpperCase() + l.slice(1)} as legal_${l} } from '${abs(`src/content/legal/${l}.ts`)}';`),
  ...['en', ...LOCALES].map((l) => `export { default as pd_${l} } from '${abs(`src/content/pricing-details/${l}.ts`)}';`),
  ...['en', ...LOCALES].flatMap((l, i) => services.map((s, j) => (fs.existsSync(path.join(root, `src/content/services/extended/${l}/${s}.ts`)) ? `export { default as ext_${l}_${j} } from '${abs(`src/content/services/extended/${l}/${s}.ts`)}';` : ''))),
];
// about/process/home exports can be null in a locale; the bundle re-exports whatever exists.
const out = await build({ stdin: { contents: lines.join('\n'), resolveDir: root, loader: 'ts' }, bundle: true, write: false, format: 'esm', platform: 'node', define: { 'import.meta.env': '{"BASE_URL":"/"}' }, logLevel: 'silent' });
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));

const errors = [];
const stats = Object.fromEntries(LOCALES.map((l) => [l, { compared: 0, errors: 0 }]));
const err = (loc, where, msg) => { errors.push(`${loc} ${where}: ${msg}`); stats[loc].errors++; };
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const letters = (s) => (s.match(/\p{L}/gu) || []).length;
const latin = (s) => (s.match(/[A-Za-z]/g) || []).length;
// "3D" / "2D" are spelled out in Hebrew/Thai/Russian, so they are not compared as digits.
const digits = (s) => (s.replace(/\b\d+D\b/gi, '').match(/\d+/g) || []).slice().sort().join(',');
const allowed = (where, text) => allow.paths.some((p) => where.endsWith(p)) || allow.strings.includes(text) || allow.regex.some((r) => new RegExp(r).test(where));

function compare(loc, where, e, t) {
  if (typeof e === 'string') {
    stats[loc].compared++;
    if (typeof t !== 'string') return err(loc, where, 'not a string');
    if (!t.trim()) return allow.emptyPaths.some((p) => where.endsWith(p)) && !e.trim() ? undefined : err(loc, where, 'empty');
    if (allowed(where, e)) return;
    if (/^(https?:|\/|[\w.+-]+@)/.test(e) || letters(e) < 4) return;
    if (t === e && /\s/.test(e.trim())) return err(loc, where, `identical to English: "${e.slice(0, 50)}"`);
    if (letters(t) > 25 && latin(t) / letters(t) > 0.6) return err(loc, where, `looks untranslated: "${t.slice(0, 50)}"`);
    if (digits(e) && !digits(e).split(',').every((d) => digits(t).split(',').includes(d))) err(loc, where, `digits changed: "${digits(e)}" -> "${digits(t)}"`);
    return;
  }
  if (Array.isArray(e)) {
    if (!Array.isArray(t)) return err(loc, where, 'not a list');
    if (t.length !== e.length) err(loc, where, `list length ${t.length} != ${e.length}`);
    e.forEach((x, i) => i < t.length && compare(loc, `${where}[${i}]`, x, t[i]));
    return;
  }
  if (isObj(e)) {
    if (!isObj(t)) return err(loc, where, 'missing object');
    for (const k of Object.keys(e)) { if (!(k in t)) err(loc, `${where}.${k}`, 'missing key'); else compare(loc, `${where}.${k}`, e[k], t[k]); }
    for (const k of Object.keys(t)) if (!(k in e)) err(loc, `${where}.${k}`, 'extra key not in English');
  }
}

for (const g of SLUG_GROUPS) {
  const en = mod[`${g}_en`];
  for (const loc of LOCALES) {
    const t = mod[`${g}_${loc}`] ?? {};
    for (const slug of Object.keys(en)) { if (!(slug in t)) err(loc, `${g}.${slug}`, 'page not translated'); else compare(loc, `${g}.${slug}`, en[slug], t[slug]); }
    for (const slug of Object.keys(t)) if (!(slug in en)) err(loc, `${g}.${slug}`, 'translation without English page');
  }
}
for (const g of ['about', 'process', 'home']) for (const loc of LOCALES) compare(loc, g, mod[`${g}_en`], mod[`${g}_${loc}`] ?? null);
for (const loc of LOCALES) compare(loc, 'dictionary', mod.dictionaries.en, mod.dictionaries[loc]);
for (const loc of LOCALES) { compare(loc, 'plan', mod.plan_en, mod[`plan_${loc}`]); compare(loc, 'pricingDetails', mod.pd_en, mod[`pd_${loc}`]); compare(loc, 'legal', mod.legal_en, mod[`legal_${loc}`]); }
services.forEach((s, j) => { const en = mod[`ext_en_${j}`]; for (const loc of LOCALES) { const idx = ['en', ...LOCALES].indexOf(loc) * services.length + j; const t = mod[`ext_${loc}_${j}`]; if (!t) err(loc, `extended.${s}`, 'long-form sections not translated'); else compare(loc, `extended.${s}`, en, t); } });

for (const loc of LOCALES) console.log(`${loc}: ${stats[loc].compared} strings compared, ${stats[loc].errors} problem(s)`);
const show = verbose ? errors : errors.slice(0, 25);
show.forEach((e) => console.error('  ERROR ' + e));
if (!verbose && errors.length > 25) console.error(`  … ${errors.length - 25} more (use --verbose)`);
console.log(errors.length ? `\ni18n-check FAILED (${errors.length})` : '\ni18n-check OK');
process.exit(errors.length ? 1 : 0);
