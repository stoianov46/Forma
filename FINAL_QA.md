# FINAL QA — local build (2026-11-10)

Everything below was run against the **local** `dist/` build and a local `astro preview`. The live site `https://forma.in.th/` returns 403 to automated requests, so **nothing is PRODUCTION VERIFIED**.

| Check | Command | Result |
|---|---|---|
| Types | `npm run check` | 0 errors, 0 warnings |
| Build | `npm run build` | 190 pages (189 `index.html` + `404.html`; `/plan/` and `/checklist/` × 4 locales added) |
| Links / meta / JSON-LD | `npm run qa:static` | no broken internal links; meta checks pass; all JSON-LD blocks valid |
| SEO audit | `npm run seo:audit` | 190 pages, 3,831 checks: **0 FAIL**, 51 WARNING (all documented in NOTES.md "Accepted warnings") |
| Pricing | `npm run pricing:check` | 39 prices × 13 services × 4 locales identical; no Offer schema |
| Browser QA | `node scripts/qa/browsercheck.cjs` (Chrome via puppeteer-core, preview on :4321) | passed: mobile menu (375/430/768 px), **no horizontal scroll at 320/360/375/390/412/430/768/1024/1280/1440/1728/1920 px** on 6 pages (EN, RU, TH, HE service pages, HE project, home), **axe-core WCAG 2.1 A/AA clean** on ~20 representative pages across all 4 locales |
| Planning tools | `npm run plan:check` (estimator, finder, timeline, price details, built pages ×4 locales); `npm run qa:plan` (browser, 4 locales, stubbed endpoint) | passed |
| Contact form logic | `npm run contact:check` (incl. lead qualification and budget parsing, mocked); `npm run qa:form` | passed |
| Navigation / translations | `npm run nav:check`, `npm run i18n:check` (2,294 strings per locale) | passed |
| Function types | `npm run typecheck:functions` | passed |
| Visual spot checks | Chrome, manual | RU project page, HE architecture page (RTL, pricing table, nav "Islands", no "Start a Project" in header) looked correct |

## Not tested (cannot be, in this environment)
- Production: HTTP status, redirects, headers, Cloudflare Function, real lead delivery, analytics.
- **Lighthouse / Core Web Vitals**: Lighthouse is not installed here, so no new scores were measured; the earlier local figures quoted in older docs are from a previous session and were not re-run.
- Firefox, Edge, Safari, real iOS/Android devices, screen readers (VoiceOver/NVDA/TalkBack).
- Visual review of every page in RU/TH/HE (only the pages listed above were looked at).
- Rich Results Test / Schema.org validator (JSON-LD is only checked for valid JSON and duplicate ids).

## Known open items
See `NOTES.md` and `RELEASE_CHECKLIST.md`. Headline: draft prices need owner approval; RU/TH/HE copy is AI-drafted and needs native review; `[[VERIFY]]` legal markers need counsel.
