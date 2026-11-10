# Release checklist

**Nothing below has been done by the automated work. No push, DNS change or deploy happens without explicit owner approval.** Status labels: `OWNER INPUT REQUIRED`, `OWNER WILL HANDLE`, `DEFERRED BY OWNER`, `EXTERNAL (hosting assistant)`.

## 1. Owner decisions and inputs
- [ ] Approve or change every draft price in `src/content/pricing.ts` (see `PRICING_STRATEGY.md`) — OWNER INPUT REQUIRED.
- [ ] Read the Architecture, Permits & Planning and Eco Construction pages (AI-drafted EN copy) — OWNER INPUT REQUIRED.
- [ ] Approve the concept-portfolio wording and replace the six shared stock-style images with original renders/photos when available.
- [ ] Decide whether prices may ever appear in schema.org `Offer` (currently never).
- [ ] Legal counsel resolves the `[[VERIFY]]` markers (`PUBLIC_LEGAL_GOVERNING_LAW`, `PUBLIC_LEGAL_RETENTION_PERIOD`, `PUBLIC_LEGAL_UPDATED_DATE`) — OWNER INPUT REQUIRED.
- [ ] Native reviewers for RU, TH, HE (terminology list in NOTES.md) — OWNER INPUT REQUIRED.
- [ ] Telegram: create/rotate the bot token, set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` server-side after hosting — DEFERRED BY OWNER. The phone number is not a token.
- [ ] Analytics IDs (`PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_YANDEX_METRICA_ID`) — DEFERRED BY OWNER.
- [ ] Google Business Profile — OWNER WILL HANDLE. The site must not claim it is verified.
- [ ] Certificates, registration numbers, tax IDs — DEFERRED BY OWNER; none are displayed.

## 2. Host and environment — EXTERNAL (hosting assistant)
- [ ] Cloudflare Pages: build `npm run build`, output `dist`; Pages Function `functions/api/lead.ts` deployed; secrets set as environment variables (never in git).
- [ ] Optional: KV namespace `LEAD_RATE_LIMIT_KV` for rate limiting.
- [ ] `ASTRO_SITE_URL` / `ASTRO_BASE_PATH` match the real host; DNS and HTTPS for `forma.in.th`.
- [ ] Note: `.github/workflows/deploy.yml` deploys to GitHub Pages; decide which host is the real one.

## 3. Before deploying (local)
- [ ] `npm ci && npm run check && npm run build`
- [ ] `npm run qa:static && npm run seo:audit && npm run pricing:check` — 0 FAIL / 0 errors
- [ ] `node scripts/qa/browsercheck.cjs` (needs `astro preview` on :4321 and Chrome)
- [ ] `git diff` reviewed; no secrets committed.

## 4. After deploying
- [ ] Crawl the live site (`npm run seo:audit` logic against live HTML, or a link checker) — mark `PRODUCTION VERIFIED` only then.
- [ ] Submit one real test enquiry; confirm the Telegram message and success state.
- [ ] Lighthouse + Core Web Vitals on the live URL; Rich Results Test and Schema.org validator on a service, location and project page.
- [ ] Search Console and Yandex Webmaster: verify, submit `sitemap-index.xml`.
- [ ] Safari, Firefox, Edge, real phones, one screen-reader pass; eyeball Thai line breaks and Hebrew RTL.
- [ ] Cookie banner: nothing non-essential loads before consent.

## 5. Rollback
Redeploy the previous build. The site is static with no database; rotate the Telegram token if it was exposed.
