#!/usr/bin/env node
// Real browser QA pass against a running preview server:
//   1. Mobile menu interaction (open/close, accordion, focus return, Escape key)
//      at 375/430/768px — the "test on a real device/emulator" item from
//      docs/tasks/TASK-009-fix-audit-findings.md.
//   2. Horizontal-scroll check at 375/430/768/1440/1920px.
//   3. axe-core (WCAG 2.1 A/AA) against representative pages across all 4
//      locales and several templates.
//
// Prerequisites: `npm run build && npm run preview` (or `astro preview`) running
// on http://localhost:4321 (Astro's default preview port), and a local Chrome —
// set CHROME_PATH if it's not at the default macOS location.
//
// Usage: node scripts/qa/browsercheck.cjs
// Exits non-zero if any check fails.
const puppeteer = require('puppeteer-core');

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.QA_BASE_URL || 'http://localhost:4321';

const MOBILE_VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
];
const ALL_VIEWPORTS = [...MOBILE_VIEWPORTS, { name: 'desktop-1440', width: 1440, height: 900 }, { name: 'desktop-1920', width: 1920, height: 1080 }];

const AXE_PAGES = [
  '/',
  '/ru/',
  '/th/',
  '/he/',
  '/services/villa-design/',
  '/ru/services/villa-design/',
  '/th/services/villa-design/',
  '/he/services/villa-design/',
  '/locations/koh-phangan/',
  '/ru/locations/koh-phangan/',
  '/th/locations/koh-phangan/',
  '/he/locations/koh-phangan/',
  '/projects/ridge-house-sri-thanu/',
  '/journal/what-tropical-architecture-actually-means/',
  '/about/',
  '/process/',
  '/contact/',
  '/privacy/',
];

async function testMobileMenu(browser) {
  let ok = true;
  for (const vp of MOBILE_VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });

    const toggle = await page.$('#menu-toggle');
    if (!toggle) {
      console.log(`[menu] ${vp.name}: #menu-toggle not found`);
      ok = false;
      await page.close();
      continue;
    }
    await toggle.click();
    await new Promise((r) => setTimeout(r, 200));
    const openState = await page.evaluate(() => {
      const menu = document.getElementById('mobile-menu');
      const rect = menu.getBoundingClientRect();
      return {
        hasFlex: menu?.classList.contains('flex'),
        hasHidden: menu?.classList.contains('hidden'),
        ariaExpanded: document.getElementById('menu-toggle')?.getAttribute('aria-expanded'),
        height: rect.height,
        viewportHeight: window.innerHeight,
      };
    });
    if (!openState.hasFlex || openState.hasHidden || openState.ariaExpanded !== 'true') {
      console.log(`[menu] ${vp.name}: menu did not open correctly`, openState);
      ok = false;
    }
    // Classes/ARIA can be "correct" while the element still renders squished to a
    // fraction of the viewport — e.g. an ancestor with backdrop-filter/transform/
    // filter creates a new containing block for this `fixed` element, so its
    // `inset-0` resolves against that ancestor's box instead of the viewport. Catch
    // that class of bug directly by checking the actual rendered height.
    if (openState.height < openState.viewportHeight * 0.9) {
      console.log(`[menu] ${vp.name}: menu classes/ARIA say open, but rendered height is ${openState.height}px of a ${openState.viewportHeight}px viewport — check for a backdrop-filter/transform/filter ancestor creating a new containing block for this fixed element`);
      ok = false;
    }

    const summary = await page.$('#mobile-menu details summary');
    if (summary) {
      await summary.click();
      await new Promise((r) => setTimeout(r, 150));
      const accordionOpened = await page.evaluate(() => document.querySelector('#mobile-menu details')?.open === true);
      if (!accordionOpened) {
        console.log(`[menu] ${vp.name}: services accordion did not open`);
        ok = false;
      }
    }

    const closeBtn = await page.$('#menu-close');
    await closeBtn.click();
    await new Promise((r) => setTimeout(r, 200));
    const closeState = await page.evaluate(() => ({
      hasHidden: document.getElementById('mobile-menu')?.classList.contains('hidden'),
      ariaExpanded: document.getElementById('menu-toggle')?.getAttribute('aria-expanded'),
      focusOnToggle: document.activeElement?.id === 'menu-toggle',
    }));
    if (!closeState.hasHidden || closeState.ariaExpanded !== 'false' || !closeState.focusOnToggle) {
      console.log(`[menu] ${vp.name}: menu did not close correctly / focus not returned`, closeState);
      ok = false;
    }

    await toggle.click();
    await new Promise((r) => setTimeout(r, 200));
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 200));
    const escapeClosed = await page.evaluate(() => document.getElementById('mobile-menu')?.classList.contains('hidden'));
    if (!escapeClosed) {
      console.log(`[menu] ${vp.name}: Escape key did not close the menu`);
      ok = false;
    }
    await page.close();
  }
  return ok;
}

async function testHorizontalScroll(browser) {
  let ok = true;
  for (const vp of ALL_VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const url of ['/', '/services/villa-design/']) {
      await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0' });
      const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      if (hasHorizontalScroll) {
        console.log(`[scroll] ${vp.name} ${url}: horizontal scroll detected`);
        ok = false;
      }
    }
    await page.close();
  }
  return ok;
}

async function runAxe(browser) {
  const axeSource = require('axe-core').source;
  let ok = true;
  for (const url of AXE_PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0' });
    await page.evaluate(axeSource);
    const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }));
    if (result.violations.length > 0) {
      ok = false;
      console.log(`[axe] ${url}: ${result.violations.length} violation type(s)`);
      for (const v of result.violations) {
        console.log(`  [${v.impact}] ${v.id} (${v.nodes.length} node(s)): ${v.help}`);
      }
    }
    await page.close();
  }
  return ok;
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  let allOk = true;

  console.log('=== Mobile menu interaction ===');
  allOk = (await testMobileMenu(browser)) && allOk;

  console.log('=== Horizontal scroll (320-1920px) ===');
  allOk = (await testHorizontalScroll(browser)) && allOk;

  console.log('=== axe-core (WCAG 2.1 A/AA), all 4 locales + key templates ===');
  allOk = (await runAxe(browser)) && allOk;

  await browser.close();
  console.log(allOk ? '\nAll browser QA checks passed.' : '\nSome browser QA checks failed — see above.');
  process.exit(allOk ? 0 : 1);
})().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
