#!/usr/bin/env node
// Browser check of the contact form journey with a STUBBED endpoint (nothing is sent anywhere).
// Needs `npm run build` + `astro preview` on QA_BASE_URL (default http://localhost:4321) and local Chrome.
// Checks per locale: validation blocks the review, review lists the entered data, Edit returns to the
// fields with data kept, Send posts once with stable English option values + reply language,
// success state, failed send keeps the data, honeypot is hidden.
const puppeteer = require('puppeteer-core');
const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.QA_BASE_URL || 'http://localhost:4321';
let failures = 0;
const check = (name, ok, detail = '') => { if (!ok) failures++; console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ' — ' + detail : ''}`); };

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  for (const loc of ['', 'ru/', 'th/', 'he/']) {
    const tag = loc || 'en/';
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    let posts = [];
    let mode = 'ok';
    // Decline non-essential cookies up front so the consent banner does not cover the form.
    await page.evaluateOnNewDocument(() => localStorage.setItem('formaCookieConsent', JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })));
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().includes('/api/lead')) {
        posts.push(req.postData() || '');
        return req.respond({ status: mode === 'ok' ? 200 : 502, contentType: 'application/json', body: JSON.stringify({ ok: mode === 'ok' }) });
      }
      req.continue();
    });
    await page.goto(`${BASE}/${loc}contact/?service=architecture&utm_source=qa`, { waitUntil: 'networkidle0' });
    check(`${tag} honeypot field is hidden`, await page.$eval('input[name="company"]', (el) => el.offsetParent === null));
    await page.click('#lead-submit');
    check(`${tag} empty form does not open the review`, await page.$eval('#lead-review', (el) => el.hidden));
    await page.type('#name', 'QA Tester');
    await page.type('#email', 'qa@example.com');
    await page.type('#message', 'This is a test enquiry for a villa plot.');
    await page.select('#projectType', 'Hospitality');
    await page.select('#replyLanguage', 'th');
    await page.click('#lead-submit');
    check(`${tag} review opens and shows the entered data`, await page.$eval('#lead-review', (el) => !el.hidden && el.textContent.includes('QA Tester') && el.textContent.includes('qa@example.com')));
    check(`${tag} nothing sent before Send`, posts.length === 0);
    await page.click('#lead-edit');
    check(`${tag} Edit returns to the fields with data kept`, await page.$eval('#name', (el) => el.value === 'QA Tester' && el.offsetParent !== null));
    await page.click('#lead-submit');
    mode = 'fail';
    await page.click('#lead-send');
    await new Promise((r) => setTimeout(r, 400));
    check(`${tag} failed send shows the error and keeps the data`, (await page.$eval('#lead-error', (el) => !el.classList.contains('hidden'))) && (await page.$eval('#name', (el) => el.value === 'QA Tester')));
    mode = 'ok';
    await page.click('#lead-send');
    await new Promise((r) => setTimeout(r, 400));
    check(`${tag} successful send shows the success state`, await page.$eval('#lead-success', (el) => !el.classList.contains('hidden')));
    const body = posts[posts.length - 1] || '';
    check(`${tag} posts stable English option value, reply language, service preset and UTM`, body.includes('Hospitality') && /name="replyLanguage"[\s\S]*?th/.test(body) && /name="service"[\s\S]*?architecture/.test(body) && /name="utm_source"[\s\S]*?qa/.test(body));
    check(`${tag} exactly two POSTs (one failed, one ok), no duplicates`, posts.length === 2, String(posts.length));
    await page.close();
  }
  await browser.close();
  console.log(failures ? `\nformcheck: ${failures} failure(s)` : '\nformcheck: all checks passed (stubbed endpoint, nothing sent)');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error('FATAL:', e); process.exit(1); });
