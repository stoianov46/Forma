#!/usr/bin/env node
// Automated SEO/content audit over the built dist/ output (all pages, all locales).
// Usage: npm run build && npm run seo:audit
// Reads thresholds from seo-audit.config.json and (optionally) keywords from the keyword map
// (src/content/keywords.json: { "/services/architecture/": { "en": { "primary": "...", "secondary": [] } } }).
// Writes reports/seo-audit.json and reports/seo-audit.md. Exit code 1 only if a FAIL (technical) is found.
// WARNINGs are editorial and never fail the run. Deterministic; does not modify any content.
const fs = require('fs');
const path = require('path');
const cfg = JSON.parse(fs.readFileSync('seo-audit.config.json', 'utf8'));
const dist = path.join(process.cwd(), 'dist');
const kwFile = path.join(process.cwd(), cfg.keywordMap);
const keywords = fs.existsSync(kwFile) ? JSON.parse(fs.readFileSync(kwFile, 'utf8')) : null;
const results = [];
const pages = [];
const add = (url, locale, check, status, actual, expected, fix) => {
  if ((cfg.exceptions[url] || []).includes(check)) status = 'PASS';
  results.push({ url, locale, check, status, actual: String(actual), expected: String(expected), fix: fix || '' });
};
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const wc = (t, loc) => (loc === 'th' ? Math.round(t.replace(/\s+/g, '').length / 6) : (t.match(/[\p{L}\p{N}'’-]+/gu) || []).length);

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (!['_astro', 'images'].includes(e.name)) walk(f); }
    else if (e.name.endsWith('.html')) load(f);
  }
}
function load(file) {
  const html = fs.readFileSync(file, 'utf8');
  const url = file.slice(dist.length).replace(/index\.html$/, '');
  const seg = url.split('/')[1];
  const locale = cfg.locales.includes(seg) && seg !== 'en' ? seg : 'en';
  const rest = locale === 'en' ? url : url.slice(locale.length + 1);
  const type = rest === '/' ? 'home' : /^\/services\/./.test(rest) ? 'service' : /^\/locations\/./.test(rest) ? 'location' : /^\/projects\/./.test(rest) ? 'project' : /^\/journal\/./.test(rest) ? 'article' : rest.replace(/\//g, '') || 'page';
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
  pages.push({ url, locale, rest, type, html, main });
}
walk(dist);

const norm = (u) => u.replace(/^https?:\/\/[^/]+/, '');
const byPath = new Map(pages.map((p) => [p.url, p]));
const titles = new Map(), descs = new Map();

for (const p of pages) {
  const { url, locale, type, html, main } = p;
  const is404 = url === '/404.html';
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const noindex = /name="robots"[^>]*noindex/.test(html);
  p.noindex = noindex; p.canon = canon;
  // metadata
  add(url, locale, 'title-present', title ? 'PASS' : 'FAIL', title || '(none)', 'non-empty');
  if (title) { (titles.get(title) || titles.set(title, []).get(title)).push(url);
    add(url, locale, 'title-length', title.length > cfg.titleMax || title.length < cfg.titleMin ? 'WARNING' : 'PASS', title.length, `${cfg.titleMin}-${cfg.titleMax}`, 'Shorten/lengthen title'); }
  add(url, locale, 'description-present', desc ? 'PASS' : 'FAIL', desc ? desc.length : '(none)', 'non-empty');
  if (desc) { (descs.get(desc) || descs.set(desc, []).get(desc)).push(url);
    { const dmin = (cfg.descMinByLocale || {})[locale] || cfg.descMin; add(url, locale, 'description-length', desc.length < dmin || desc.length > cfg.descMax ? 'WARNING' : 'PASS', desc.length, `${dmin}-${cfg.descMax}`, 'Rewrite meta description'); } }
  if (!is404) {
    add(url, locale, 'canonical-present', canon ? 'PASS' : 'FAIL', canon || '(none)', 'present');
    if (canon) add(url, locale, 'canonical-correct', norm(canon) === url ? 'PASS' : 'FAIL', norm(canon), url, 'Canonical must be the page itself (language-specific)');
  }
  // language / direction
  const lang = (html.match(/<html[^>]*lang="([^"]*)"/) || [])[1] || '';
  const dir = (html.match(/<html[^>]*dir="([^"]*)"/) || [])[1] || 'ltr';
  add(url, locale, 'html-lang', lang.startsWith(locale) ? 'PASS' : 'FAIL', lang || '(none)', locale);
  add(url, locale, 'rtl-config', (locale === 'he') === (dir === 'rtl') ? 'PASS' : 'FAIL', dir, locale === 'he' ? 'rtl' : 'ltr');
  // headings
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  add(url, locale, 'h1-single', h1s === 1 ? 'PASS' : 'FAIL', h1s, 1);
  const lv = [...main.matchAll(/<h([1-6])[ >]/g)].map((m) => +m[1]);
  let skip = false; for (let i = 1; i < lv.length; i++) if (lv[i] - lv[i - 1] > 1) skip = true;
  add(url, locale, 'heading-hierarchy', skip ? 'WARNING' : 'PASS', skip ? 'level skipped' : 'ok', 'no skipped levels');
  // content
  const text = strip(main);
  const words = wc(text, locale);
  p.words = words; p.text = text;
  const target = ((cfg.wordTargetByLocale || {})[locale] || {})[type] || cfg.wordTarget[type];
  if (target) add(url, locale, 'word-count', words >= target ? 'PASS' : 'WARNING', words, `>=${target}`, 'Expand with original, useful content (not filler)');
  if (cfg.directAnswerRequired.includes(type)) {
    const da = (main.match(/<section[^>]*data-direct-answer[^>]*>([\s\S]*?)<\/section>/) || [])[1];
    if (!da) add(url, locale, 'direct-answer', 'WARNING', '(none)', 'present');
    else { const n = wc(strip(da), locale), [lo, hi] = (cfg.directAnswerWordsByLocale || {})[locale] || cfg.directAnswerWords;
      add(url, locale, 'direct-answer', locale === 'th' || (n >= lo && n <= hi) ? 'PASS' : 'WARNING', n, `${lo}-${hi} words`, 'Tighten the opening answer'); }
  }
  if (cfg.faqRequired.includes(type)) add(url, locale, 'faq-present', /"@type":"FAQPage"/.test(html) ? 'PASS' : 'WARNING', /"@type":"FAQPage"/.test(html) ? 'yes' : 'no', 'FAQPage');
  const bad = cfg.placeholders.filter((w) => text.toLowerCase().includes(w.toLowerCase()));
  add(url, locale, 'placeholders', bad.length ? 'FAIL' : 'PASS', bad.join(',') || 'none', 'none', 'Remove placeholder text');
  if (/\[\[VERIFY/.test(text)) add(url, locale, 'owner-verify-markers', 'WARNING', '[[VERIFY]] present', 'resolved', 'OWNER INPUT REQUIRED (legal counsel)');
  if (locale === 'en') { const c = cfg.cliches.filter((w) => new RegExp('\\b' + w + '\\b', 'i').test(text)); add(url, locale, 'cliches', c.length ? 'WARNING' : 'PASS', c.join(',') || 'none', 'none'); }
  // keyword map
  const km = keywords && keywords[p.rest] && keywords[p.rest][locale];
  if (keywords && cfg.keywordLocales.includes(locale) && ['service', 'location', 'about', 'process', 'home', 'plan', 'checklist'].includes(type) && !km) add(url, locale, 'keyword-mapped', 'WARNING', 'no entry', 'entry in keyword map');
  if (km && km.primary) {
    const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').toLowerCase(), k = km.primary.toLowerCase();
    add(url, locale, 'keyword-in-h1', h1.includes(k) || (km.h1Exempt) ? 'PASS' : 'WARNING', h1, k);
    add(url, locale, 'keyword-in-opening', text.toLowerCase().slice(0, 600).includes(k) ? 'PASS' : 'WARNING', 'first 600 chars', k);
  }
  // technical
  const imgs = html.match(/<img[^>]*>/g) || [];
  const noAlt = imgs.filter((i) => !/\salt(="[^"]*"|[\s>\/])/.test(i)).length;
  add(url, locale, 'img-alt', noAlt ? 'FAIL' : 'PASS', noAlt, 0);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let okLd = ld.length > 0, ids = [], dup = false;
  for (const m of ld) { try { const j = JSON.parse(m[1]); (j['@graph'] || [j]).forEach((n) => { if (n['@id']) { if (ids.includes(n['@id'])) dup = true; ids.push(n['@id']); } }); } catch { okLd = false; } }
  add(url, locale, 'jsonld-valid', okLd ? 'PASS' : 'FAIL', ld.length + ' block(s)', 'valid JSON');
  add(url, locale, 'jsonld-no-duplicate-ids', dup ? 'FAIL' : 'PASS', dup ? 'duplicate @id' : 'ok', 'unique');
  if (cfg.indexableMustNotBeNoindex.includes(type)) add(url, locale, 'indexable', noindex ? 'FAIL' : 'PASS', noindex ? 'noindex' : 'index', 'index');
}
for (const [t, urls] of titles) if (urls.length > 1) urls.forEach((u) => add(u, '', 'title-unique', 'FAIL', 'shared with ' + urls.length, 'unique'));
for (const [d, urls] of descs) if (urls.length > 1) urls.forEach((u) => add(u, '', 'description-unique', 'FAIL', 'shared with ' + urls.length, 'unique'));

// hreflang: reciprocal + self + x-default
for (const p of pages) {
  const alts = [...p.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], norm(m[2])]);
  if (p.url === '/404.html' || !alts.length) continue;
  const map = new Map(alts);
  add(p.url, p.locale, 'hreflang-self', map.get(p.locale) === p.url ? 'PASS' : 'FAIL', map.get(p.locale) || '(none)', p.url);
  let bad = [];
  for (const [l, href] of alts) { if (l === 'x-default') continue; const t = byPath.get(href); if (!t) { bad.push(l + ' missing page'); continue; }
    const back = [...t.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].some((m) => m[1] === p.locale && norm(m[2]) === p.url); if (!back) bad.push(l + ' not reciprocal'); }
  add(p.url, p.locale, 'hreflang-reciprocal', bad.length ? 'FAIL' : 'PASS', bad.join('; ') || 'ok', 'reciprocal');
}
// locale parity + untranslated-text heuristic + concept truth rules
const enIndexable = pages.filter((p) => p.locale === 'en' && !p.noindex && cfg.parityTypes.includes(p.type));
for (const e of enIndexable) for (const l of cfg.locales.filter((x) => x !== 'en')) {
  const target = '/' + l + e.url;
  if (!byPath.has(target)) add(e.url, 'en', 'locale-parity', 'WARNING', 'missing ' + target, 'translated page exists', 'Translate (or document why EN-only)');
}
for (const p of pages) if (p.locale !== 'en' && !p.noindex) {
  const lat = (p.text.match(/[A-Za-z]/g) || []).length, all = (p.text.match(/\p{L}/gu) || []).length || 1, pct = Math.round((lat / all) * 100);
  add(p.url, p.locale, 'untranslated-text', pct > cfg.latinMaxPercent ? 'WARNING' : 'PASS', pct + '% Latin letters', `<=${cfg.latinMaxPercent}%`, 'Look for English fallback strings');
}
for (const p of pages.filter((q) => q.locale !== 'en' && !q.noindex && !cfg.englishOnlyUrls.includes(q.url))) {
  const heads = [...p.main.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((m) => strip(m[1])).filter((h) => /^[A-Za-z0-9 &,.'’:\/-]{4,}$/.test(h) && !cfg.latinHeadingAllow.includes(h));
  add(p.url, p.locale, 'english-heading', heads.length ? 'WARNING' : 'PASS', heads.slice(0, 3).join(' | ') || 'none', 'translated headings', 'Translate hard-coded English heading');
}
for (const p of pages.filter((q) => q.type === 'project')) {
  const hit = cfg.conceptForbidden.filter((w) => new RegExp('\\b' + w + '\\b', 'i').test(p.text));
  add(p.url, p.locale, 'concept-truth-rule', hit.length ? 'FAIL' : 'PASS', hit.join(',') || 'none', 'no result-like claims');
  add(p.url, p.locale, 'concept-labelled', /"genre":"Concept project"/.test(p.html) ? 'PASS' : 'FAIL', 'genre check', 'CreativeWork genre "Concept project"');
}
// near-duplicate content within same locale+type
const sh = (t) => { const w = t.toLowerCase().split(/\s+/); const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const groups = {};
pages.filter((p) => ['service', 'location', 'article'].includes(p.type)).forEach((p) => (groups[p.locale + p.type] = groups[p.locale + p.type] || []).push(p));
for (const g of Object.values(groups)) for (let i = 0; i < g.length; i++) { const a = sh(g[i].text); for (let j = i + 1; j < g.length; j++) { const b = sh(g[j].text); let n = 0; a.forEach((x) => b.has(x) && n++); const sim = n / Math.min(a.size, b.size || 1); if (sim > cfg.nearDuplicateThreshold) add(g[i].url, g[i].locale, 'near-duplicate', 'WARNING', `${(sim * 100) | 0}% shingle overlap with ${g[j].url}`, `<${cfg.nearDuplicateThreshold * 100}%`); } }
// sitemap vs indexable pages
const sm = fs.existsSync(path.join(dist, 'sitemap-0.xml')) ? fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8') : '';
const smUrls = new Set([...sm.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => norm(m[1])));
for (const p of pages) { if (p.url === '/404.html') continue; const inSm = smUrls.has(p.url);
  if (p.noindex && inSm) add(p.url, p.locale, 'sitemap', 'FAIL', 'noindex page in sitemap', 'absent');
  else if (!p.noindex && !inSm) add(p.url, p.locale, 'sitemap', 'FAIL', 'indexable page missing from sitemap', 'present'); }
// robots.txt
const robots = fs.existsSync(path.join(dist, 'robots.txt')) ? fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8') : '';
add('/robots.txt', '', 'robots-sitemap-line', /Sitemap:/i.test(robots) ? 'PASS' : 'FAIL', /Sitemap:/i.test(robots) ? 'yes' : 'no', 'Sitemap: line');
add('/robots.txt', '', 'robots-no-global-disallow', /^Disallow:\s*\/\s*$/m.test(robots) ? 'FAIL' : 'PASS', 'checked', 'no "Disallow: /"');

results.sort((a, b) => a.url.localeCompare(b.url) || a.check.localeCompare(b.check));
const count = (s) => results.filter((r) => r.status === s).length;
const summary = { pages: pages.length, checks: results.length, pass: count('PASS'), warning: count('WARNING'), fail: count('FAIL') };
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/seo-audit.json', JSON.stringify({ summary, results }, null, 2));
const byCheck = {};
results.filter((r) => r.status !== 'PASS').forEach((r) => { const k = r.status + ' ' + r.check; (byCheck[k] = byCheck[k] || []).push(r); });
let md = `# SEO audit (generated — do not edit)\n\nPages: ${summary.pages} · Checks: ${summary.checks} · PASS ${summary.pass} · WARNING ${summary.warning} · FAIL ${summary.fail}\n\nLocal \`dist\` only; not production verified. Full detail: \`reports/seo-audit.json\`.\n\n`;
md += '## Non-passing checks (grouped)\n\n| Status | Check | Count | Example URL | Actual | Expected |\n|---|---|---|---|---|---|\n';
Object.entries(byCheck).sort().forEach(([k, a]) => { const [s, c] = k.split(' '); md += `| ${s} | ${c} | ${a.length} | ${a[0].url} | ${a[0].actual.slice(0, 60)} | ${a[0].expected} |\n`; });
md += '\n## FAIL details\n\n| URL | Check | Actual | Expected | Fix |\n|---|---|---|---|---|\n';
results.filter((r) => r.status === 'FAIL').forEach((r) => (md += `| ${r.url} | ${r.check} | ${r.actual.slice(0, 80)} | ${r.expected} | ${r.fix} |\n`));
fs.writeFileSync('reports/seo-audit.md', md);
console.log(`SEO audit: ${summary.pages} pages, ${summary.checks} checks — PASS ${summary.pass}, WARNING ${summary.warning}, FAIL ${summary.fail}`);
Object.entries(byCheck).sort().forEach(([k, a]) => console.log(`  ${k}: ${a.length}`));
process.exit(summary.fail ? 1 : 0);
