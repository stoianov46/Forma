#!/usr/bin/env node
// Cookie-consent browser check with FAKE analytics IDs. Nothing leaves the machine: every request to a third-party
// host is recorded and aborted by the test. Self-contained: it builds a separate copy of the site into dist-consent/
// with fake PUBLIC_GA4_MEASUREMENT_ID / PUBLIC_YANDEX_METRICA_ID, serves it on a local port and drives Chrome.
// Usage: node scripts/qa/consentcheck.cjs   (needs local Chrome; set CHROME_PATH if not at the macOS default)
const { execSync } = require('node:child_process');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(process.cwd(), 'dist-consent');
const PORT = 4323;
const BASE = `http://localhost:${PORT}`;
const THIRD_PARTY = /googletagmanager\.com|google-analytics\.com|mc\.yandex\.(ru|com)|yandex\.(ru|com)/;
let failures = 0;
const check = (name, ok, detail = '') => { if (!ok) failures++; console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ' — ' + detail : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.log('building a copy with fake analytics ids into dist-consent/ ...');
execSync('npx astro build --outDir dist-consent', { stdio: 'ignore', env: { ...process.env, PUBLIC_GA4_MEASUREMENT_ID: 'G-FAKE000000', PUBLIC_YANDEX_METRICA_ID: '12345678' } });

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(OUT, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(fs.readFileSync(path.join(OUT, '404.html'))); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

async function newPage(browser, hits) {
  // A fresh browser context per scenario: no localStorage / cookies shared between scenarios.
  const context = await (browser.createBrowserContext ? browser.createBrowserContext() : browser.createIncognitoBrowserContext());
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (THIRD_PARTY.test(req.url())) { hits.push(req.url()); return req.abort(); }
    req.continue();
  });
  return page;
}
const clickId = (page, id) => page.$eval('#' + id, (el) => el.click());
const consent = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('formaCookieConsent') || 'null'));

server.listen(PORT, async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  try {
    // 1. first visit: banner, nothing tracked
    let hits = [];
    let page = await newPage(browser, hits);
    await page.goto(`${BASE}/?utm_source=qa`, { waitUntil: 'networkidle0' });
    check('first visit: banner is visible', await page.$eval('#cookie-consent', (el) => !el.hasAttribute('hidden')));
    check('first visit: no request to Google/Yandex analytics', hits.length === 0, hits.join(' '));
    check('first visit: no gtag/ym objects and no analytics cookies', await page.evaluate(() => !window.gtag && !window.ym && !/_ga|_ym/.test(document.cookie)));
    check('first visit: nothing stored for attribution', await page.evaluate(() => sessionStorage.getItem('formaAttribution') === null));
    await page.goto(`${BASE}/services/architecture/`, { waitUntil: 'networkidle0' });
    check('browsing on without choosing still tracks nothing', hits.length === 0);
    await page.close();

    // 2. reject
    hits = []; page = await newPage(browser, hits);
    await page.goto(`${BASE}/?utm_source=qa`, { waitUntil: 'networkidle0' });
    await clickId(page, 'cookie-reject');
    await sleep(300);
    let c = await consent(page);
    check('reject: choice stored as analytics=false, marketing=false', c && c.analytics === false && c.marketing === false && c.essential === true);
    check('reject: banner closes', await page.$eval('#cookie-consent', (el) => el.hasAttribute('hidden')));
    await page.reload({ waitUntil: 'networkidle0' });
    check('reject: after reload the banner stays closed and nothing loads', (await page.$eval('#cookie-consent', (el) => el.hasAttribute('hidden'))) && hits.length === 0);
    check('reject: no attribution stored', await page.evaluate(() => sessionStorage.getItem('formaAttribution') === null));
    await page.close();

    // 3. accept all
    hits = []; page = await newPage(browser, hits);
    await page.goto(`${BASE}/?utm_source=qa&utm_medium=check`, { waitUntil: 'networkidle0' });
    await clickId(page, 'cookie-accept');
    await sleep(500);
    c = await consent(page);
    check('accept: choice stored with analytics=true', c && c.analytics === true);
    check('accept: Google Tag Manager is requested only now', hits.some((u) => /googletagmanager\.com\/gtag\/js\?id=G-FAKE000000/.test(u)), hits.join(' '));
    check('accept: Yandex Metrica is requested only now', hits.some((u) => /mc\.yandex\.ru\/metrika\/tag\.js/.test(u)));
    const attr = await page.evaluate(() => JSON.parse(sessionStorage.getItem('formaAttribution') || 'null'));
    check('accept: first-touch attribution stored (landing page + UTM)', attr && attr.landingPage === '/' && attr.utm_source === 'qa' && attr.utm_medium === 'check', JSON.stringify(attr));
    await page.reload({ waitUntil: 'networkidle0' });
    check('accept: after reload analytics loads from the stored consent, banner stays closed', hits.length >= 2 && (await page.$eval('#cookie-consent', (el) => el.hasAttribute('hidden'))));
    await page.close();

    // 4. settings: analytics off then on
    hits = []; page = await newPage(browser, hits);
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
    await clickId(page, 'cookie-settings-toggle');
    await page.$eval('#cookie-analytics', (el) => { el.checked = false; });
    await clickId(page, 'cookie-save');
    await sleep(300);
    c = await consent(page);
    check('settings: saving with analytics off keeps tracking off', c && c.analytics === false && hits.length === 0);
    await page.goto(`${BASE}/cookies/`, { waitUntil: 'networkidle0' });
    await clickId(page, 'manage-cookies');
    check('cookies page: "Manage cookie preferences" reopens the banner and shows the saved state', (await page.$eval('#cookie-consent', (el) => !el.hasAttribute('hidden'))) && (await page.$eval('#cookie-analytics', (el) => el.checked === false)));
    await page.$eval('#cookie-analytics', (el) => { el.checked = true; });
    await clickId(page, 'cookie-save');
    await sleep(500);
    check('settings: turning analytics on mid-session loads it without a reload', hits.some((u) => /googletagmanager/.test(u)));
    await page.close();

    // 5. every locale: banner is translated, reject keeps nothing loaded
    for (const loc of ['ru', 'th', 'he']) {
      hits = []; page = await newPage(browser, hits);
      await page.goto(`${BASE}/${loc}/`, { waitUntil: 'networkidle0' });
      const txt = await page.$eval('#cookie-consent', (el) => el.textContent);
      check(`${loc}: consent banner text is translated`, /[Ѐ-ӿ฀-๿֐-׿]/.test(txt) && !/We use cookies/.test(txt));
      check(`${loc}: nothing tracked before a choice`, hits.length === 0);
      await clickId(page, 'cookie-reject');
      await sleep(200);
      check(`${loc}: reject works`, (await consent(page))?.analytics === false && hits.length === 0);
      await page.close();
    }
  } catch (e) {
    failures++;
    console.error('FATAL:', e);
  } finally {
    await browser.close();
    server.close();
    fs.rmSync(OUT, { recursive: true, force: true });
  }
  console.log(failures ? `\nconsentcheck: ${failures} failure(s)` : '\nconsentcheck: all checks passed (fake ids, third-party requests aborted)');
  process.exit(failures ? 1 : 0);
});
