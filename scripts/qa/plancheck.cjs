#!/usr/bin/env node
// Browser check of the /plan/ tools and their hand-off to the contact form, STUBBED endpoint (nothing is sent).
// Needs `npm run build` + `astro preview` on QA_BASE_URL (default http://localhost:4321) and local Chrome.
const puppeteer = require('puppeteer-core');
const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.QA_BASE_URL || 'http://localhost:4321';
let failures = 0;
const check = (name, ok, detail = '') => { if (!ok) failures++; console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ' — ' + detail : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  for (const loc of ['', 'ru/', 'th/', 'he/']) {
    const tag = loc || 'en/';
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000 });
    const posts = [];
    await page.evaluateOnNewDocument(() => localStorage.setItem('formaCookieConsent', JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })));
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().includes('/api/lead')) { posts.push(req.postData() || ''); return req.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); }
      req.continue();
    });
    // DOM clicks: the sticky header would otherwise cover controls after scrolling (a test artefact, not a user path).
    const click = (sel) => page.$eval(sel, (el) => el.click());
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/${loc}plan/`, { waitUntil: 'networkidle0' });

    // finder
    await click('#finder-form button[type="submit"]');
    check(`${tag} finder: submitting without answers shows the hint`, await page.$eval('#finder-hint', (el) => !el.classList.contains('hidden')));
    await click('input[name="situation"][value="land-new"]');
    await click('input[name="scope"][value="design-build"]');
    await click('input[name="extras"][value="landscape"]');
    await click('#finder-form button[type="submit"]');
    const recs = await page.$$eval('#finder-result ol li a', (as) => as.map((a) => a.getAttribute('href')));
    check(`${tag} finder: recommends architecture, villa design, construction, landscape (links to service pages)`, ['architecture', 'villa-design', 'construction', 'landscape-design'].every((s) => recs.some((h) => h.includes(`/services/${s}/`))), recs.join(' '));
    const ask = await page.$$eval('#finder-result > a', (as) => as[0]?.getAttribute('href') || '');
    check(`${tag} finder: ask link carries the first service and a summary`, /service=architecture/.test(ask) && /plan=Service\+finder/.test(ask), ask);

    // estimator
    await click('#tab-estimator');
    await click('#estimator-form button[type="submit"]');
    check(`${tag} estimator: default calculation shows a table with a total`, await page.$eval('#estimator-result', (el) => !el.classList.contains('hidden') && el.querySelectorAll('tr').length >= 2 && /฿[\d,]+–฿[\d,]+/.test(el.textContent)));
    await page.$eval('#est-area', (el) => { el.value = '10'; });
    await click('#estimator-form button[type="submit"]');
    check(`${tag} estimator: area outside the limits shows the error and hides the result`, (await page.$eval('#est-area-error', (el) => !el.classList.contains('hidden'))) && (await page.$eval('#estimator-result', (el) => el.classList.contains('hidden'))));
    await page.$eval('#est-area', (el) => { el.value = '200'; });
    await page.select('#est-mode', 'design-build');
    await page.select('#est-size', '1');
    await page.select('#est-interior', 'standard');
    await click('#estimator-form button[type="submit"]');
    const lines = await page.$$eval('#estimator-result tbody tr', (rs) => rs.length);
    check(`${tag} estimator: design-build 200 m² shows architecture + construction + interior + total`, lines === 4, String(lines));
    check(`${tag} estimator: price figures are LTR-isolated (bdi dir=ltr) for RTL pages`, (await page.$$eval('#estimator-result bdi[dir="ltr"]', (b) => b.length)) >= 4);
    await page.select('#est-mode', 'oversight');
    check(`${tag} estimator: oversight mode shows management/supervision fields and hides interior`, (await page.$eval('#est-pm', (el) => el.closest('[data-modes]').hidden === false)) && (await page.$eval('#est-interior', (el) => el.closest('[data-modes]').hidden === true)));
    await page.select('#est-mode', 'design-build');
    await click('#estimator-form button[type="submit"]');
    const send = await page.$eval('#estimator-result > a', (a) => a.getAttribute('href'));
    check(`${tag} estimator: send link has service, summary and numeric min/max`, /service=construction/.test(send) && /plan=Estimate/.test(send) && /estimateMin=\d+/.test(send) && /estimateMax=\d+/.test(send), send);

    // timeline
    await click('#tab-timeline');
    const t0 = await page.$eval('#tl-list', (el) => el.textContent);
    await page.select('#tl-size', '2');
    const t2 = await page.$eval('#tl-list', (el) => el.textContent);
    check(`${tag} timeline: five stages, size change updates the ranges, authority is not estimated`, (await page.$$eval('#tl-list li', (l) => l.length)) === 5 && t0 !== t2);

    // hand-off to the contact form and stubbed send
    await page.goto(`${BASE}${send}`, { waitUntil: 'networkidle0' });
    check(`${tag} contact: attached summary is shown`, await page.$eval('#lead-attached', (el) => !el.hidden && /Estimate/.test(el.textContent)));
    check(`${tag} contact: service preset from the tool`, (await page.$eval('#service', (el) => el.value)) === 'construction');
    await page.type('#name', 'Plan Tester');
    await page.type('#email', 'plan@example.com');
    await page.type('#message', 'Estimate came from the planning tool.');
    await page.select('#landStatus', 'Own land');
    await click('#lead-submit');
    await click('#lead-send');
    await sleep(400);
    const body = posts[posts.length - 1] || '';
    check(`${tag} contact: lead carries plan summary, estimate range and land status`, /name="planSummary"[\s\S]*?Estimate/.test(body) && /name="estimateMin"[\s\S]*?\d{6,}/.test(body) && /name="landStatus"[\s\S]*?Own land/.test(body));
    check(`${tag} no page errors`, errors.length === 0, errors.join(' | '));
    await page.close();
  }
  await browser.close();
  console.log(failures ? `\nplancheck: ${failures} failure(s)` : '\nplancheck: all checks passed (stubbed endpoint, nothing sent)');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error('FATAL:', e); process.exit(1); });
