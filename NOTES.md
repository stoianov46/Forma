# Build Notes

Built from the original brief. This records the decisions made where the brief left room for
judgment, everything flagged `[[VERIFY]]`, what's translated vs. not yet, and the pre-launch
checklist — per the original brief §24 WORKFLOW's decision rule: choose the most premium,
technically sound, SEO-safe option and keep moving rather than blocking on questions, and
document assumptions here instead.

## Running locally

The main website and the bots are two separate Node projects — install and run each
independently.

### Website (Astro)

```bash
# from the repo root
npm install
npm run dev
```

Opens at **http://localhost:4321** by default. Every language is reachable directly:
`/`, `/ru/`, `/th/`, `/he/` (and e.g. `/services/villa-design/`, `/locations/koh-samui/`).
The dev server hot-reloads on file changes — no restart needed while editing content or
components.

Other useful scripts (repo root):

```bash
npm run build     # production build to ./dist
npm run preview   # serve that production build locally, e.g. http://localhost:4321
npm run check     # astro check — type errors across .astro files
```

The one feature that **won't** work in plain local dev is the contact form's final submit
step, since that's handled by `functions/api/lead.ts`, a Cloudflare Pages Function — the
Astro dev server doesn't run Pages Functions. To test the form end-to-end locally:

```bash
npm install -D wrangler   # Cloudflare's CLI, if not already installed
npm run build
npx wrangler pages dev dist
```

This serves the built site *and* `functions/api/lead.ts` together (Wrangler auto-detects
the `functions/` directory). Create a `.dev.vars` file at the repo root (same keys as
`.env.example`: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) for `wrangler pages dev` to pick up
locally — it's gitignored the same way `.env` is.

To preview a subpath build (as GitHub Pages serves it), set the build-time vars in the shell:
`ASTRO_SITE_URL=https://<owner>.github.io ASTRO_BASE_PATH=/<repo>/ npm run build`.
Every env var is listed in `INDEX.md`.

### Bots (Telegram / WhatsApp)

Separate project in `bots/` — see `bots/README.md` for full setup. Quick version:

```bash
cd bots
npm install
cp .env.example .env   # fill in TELEGRAM_BOT_TOKEN etc.
npm run telegram        # long-polling, no public URL needed — talk to your bot on Telegram directly
```

WhatsApp's webhook (`npm run whatsapp`) needs a public HTTPS URL for Meta to call, so for
local testing you'd tunnel it (e.g. `npx cloudflared tunnel --url http://localhost:3001` or
ngrok) and point the Meta app's webhook config at that tunnel URL.

## Key decisions & assumptions

- **Root URL (`/`) is the Services landing page, not a generic "Home."** the original brief's two
  source tables disagree here — one describes a classic homepage, the other (§24 ROOT PAGE)
  explicitly requires the root to be the master Services overview with nav starting
  "Services," not "Home." Resolved by making `/` serve as both: it has the full rich
  homepage block structure (hero, direct answer, services, projects, process, locations,
  journal, CTA) the first table wants, while the primary nav item is "Services" (linking to
  `/`) per the second table's explicit rule, and there is no separate `/services/` index route.
- **No fabricated projects, testimonials, or team bios.** the original brief's truth rule forbids
  inventing clients, awards, reviews, or people. The 6 projects in `src/content/projects/`
  are clearly labeled "concept study" / `status: 'concept'` — illustrative of the design
  approach, not claimed as completed, verified commissions. `TrustProof.astro` exists as a
  component but is not used on any page yet, since there is no real testimonial/credential
  data to put in it. About page has no team section for the same reason.
  **Before launch: replace with real project photography/data, or keep the concept-study
  framing explicit if these stay as placeholders.**
- **Contact details are placeholders, overridable via env vars.** `src/lib/site.ts`'s
  `CONTACT` object (email, phone, address) and `SAME_AS` (social profile links) read from
  `PUBLIC_CONTACT_*` / `PUBLIC_SOCIAL_LINKS` env vars at build time, falling back to the
  current placeholders when unset — see `.env.example`. Since this is a fully static site,
  these were never going to be server-side secrets either way (the values end up in public
  page HTML); the env var indirection exists purely so real values can be set via a hosting
  dashboard (e.g. Cloudflare Pages) and a rebuild, without a source-code edit. Set the real
  values before launch. `LocalBusiness`/`ProfessionalService` schema in `src/lib/schema.ts`
  uses these same values, so schema will validate but contain placeholder data until this
  is done.
- **Legal pages are functional drafts, not legal advice.** `src/content/legal/en.ts` has
  real, non-generic privacy/terms/cookies/accessibility/editorial-policy content reflecting
  what the site actually does (Telegram-based lead forwarding, no analytics active yet).
  Publish dates, the data-retention period, and governing law/jurisdiction read from
  `PUBLIC_LEGAL_*` env vars (same mechanism as contact details above), defaulting to
  explicit `[[VERIFY]]` markers when unset — this is deliberate: unlike contact details,
  these values must come from real legal counsel, never a guessed default, so the fallback
  is a visible placeholder rather than a plausible-looking invented value.
- **Legal pages are English-only,** deliberately: publishing untranslated legal text under a
  `/ru/privacy/`-style URL would be worse than linking to the English original from every
  locale's footer (which is what happens now). Translate once legal counsel has signed off
  on the English text, so translation doesn't need to happen twice.
- **Analytics are not wired up.** No GA4/Yandex Metrica/Meta Pixel script is included yet —
  the original brief's event list (`page_view`, `cta_click`, `bot_start`, etc.) is documented as a
  goal but there was nothing to actually send events to without real property IDs. The
  cookie consent banner (`CookieConsent.astro`) is fully built and gates consent correctly
  (fires a `forma:consent` DOM event with `{essential, analytics, marketing}`) — wire a real
  analytics loader to listen for that event once accounts exist.
- **Social profile links are empty** (`SAME_AS` in `src/lib/site.ts`) — the original brief §21 says
  to populate these "once accounts exist." None are assumed to exist yet.

## `[[VERIFY]]` items — grep for this exact string before launch

Set the corresponding `PUBLIC_*` env var (see `.env.example`) rather than editing these
files directly — the files just supply the `[[VERIFY]]` fallback shown when unset.

| File | What to verify | Env var |
|---|---|---|
| `src/lib/site.ts` | Street address only (email, phone, WhatsApp, Telegram are real — set 15 Sep 2026) | `PUBLIC_CONTACT_ADDRESS_*` — ✅ resolved 23 Sep 2026: `LINE1=PX5R+JX7, Ko Pha-ngan`, `LINE2=Ko Pha-ngan District, Surat Thani`, `POSTCODE=84280` |
| `src/lib/site.ts` | Social profile URLs | `PUBLIC_SOCIAL_LINKS` |
| `src/content/legal/en.ts` (×3) | "Last updated" dates for Privacy/Terms/Cookies pages | `PUBLIC_LEGAL_UPDATED_DATE` |
| `src/content/legal/en.ts` | Data retention period for unconverted enquiries (Privacy) | `PUBLIC_LEGAL_RETENTION_PERIOD` |
| `src/content/legal/en.ts` | Governing law / jurisdiction (Terms) — needs local legal counsel | `PUBLIC_LEGAL_GOVERNING_LAW` |

## Content inventory

| Page type | Count | EN | RU | TH | HE |
|---|---|---|---|---|---|
| Homepage | 1 | ✅ | ✅ | ✅ | ✅ |
| Services | 13 | ✅ | ✅ | ✅ | ✅ |
| Locations | 11 (4 primary + 7 Koh Phangan areas) | ✅ | ✅ | ✅ | ✅ |
| Projects (concept studies) | 6 | ✅ | ✅ | ✅ | ✅ |
| Journal articles | 6 | ✅ | ✅ | ✅ | ✅ |
| About | 1 | ✅ | ✅ | ✅ | ✅ |
| Process | 1 | ✅ | ✅ | ✅ | ✅ |
| Contact | 1 | ✅ | ✅ | ✅ | ✅ |
| Locations hub, Projects hub, Journal hub | 3 | ✅ | ✅ | ✅ | ✅ |
| Legal (privacy/terms/cookies/accessibility/editorial-policy) | 5 | ✅ | n/a¹ | n/a¹ | n/a¹ |
| 404 / thank-you | 2 | ✅ | — | ✅ (thank-you) | ✅ (thank-you) |

¹ Legal pages link to the English version from every locale by design — see "Key decisions" above.

**Total pages generated by `npm run build` today: 182** (verified — see `dist/` after a build).

## Bots

See `bots/README.md` in full. Summary: both Telegram (grammY, long-polling) and WhatsApp
(Cloud API webhook) bots implement the exact flow from the original brief §15 BOT, fully localized
in all 4 languages, sharing one state machine (`bots/shared/flow.ts`). Known gaps before a
high-traffic launch: in-memory session storage (fine for one process, documented swap point
for Redis/KV), no automated tests, and `express`'s transitive `qs` dependency has an open
moderate-severity advisory pending an Express major-version upgrade.

## Pre-launch checklist

Derived from the original brief's own QA tables (§22 QA DOD, §23 QA, Google Webmaster section).

- [ ] Resolve every `[[VERIFY]]` item above.
- [ ] Replace placeholder project data (`src/content/projects/en.ts`) with real projects, or
      keep the "concept study" framing if real photography isn't ready yet.
- [x] Translation backlog implemented — all content types now have complete RU/TH/HE
      translations (see "Translation backlog — closed" above).
- [ ] Native-speaker review pass on the RU/TH/HE translations before launch (they were
      AI-translated, not by a hired human translator — see the caveat above).
- [ ] Set real environment variables (`.env.example` at repo root, `bots/.env.example`) in
      the Cloudflare Pages project and wherever `bots/` is deployed.
- [ ] Verify Telegram bot end-to-end: every step, back/edit/restart, attachments, submit,
      staff-chat delivery, in all 4 languages.
- [ ] Verify WhatsApp bot the same way, once a Meta Business/Cloud API app is approved.
- [x] Run Lighthouse against a local build (mobile, 3 representative pages): Performance
      96-98, Accessibility/Best Practices/SEO 100/100/100, LCP 1.8-2.6s. See "Known minor
      gaps" above.
- [ ] Re-run Lighthouse/PageSpeed against the **deployed** site (mobile + desktop) once
      real hosting/CDN is live — cache headers and real-world network conditions differ
      from a local preview build.
  - [x] Run axe-core as a standalone pass — `npm run qa:browser`: 0 violations on
        18 pages across all 4 languages.
- [ ] Verify in Google Search Console: sitemap submitted, no canonical/hreflang conflicts,
      structured data valid (Rich Results Test), mobile usability passes.
- [ ] Cross-browser/device pass: latest Chrome/Safari/Firefox, iOS Safari, Android Chrome,
      at 320–430px, 768px, and 1440–1920px.
- [ ] Analytics: code is wired and consent-gated (`Analytics.astro`); set
      `PUBLIC_GA4_MEASUREMENT_ID` / `PUBLIC_YANDEX_METRICA_ID` once the properties exist.
- [ ] PDPA/GDPR review of the Privacy Policy's actual data flows (incl. analytics).
- [ ] Legal review of Terms of Service (governing law) and Privacy Policy (retention period).
- [ ] Populate `SAME_AS` social links once official profiles exist (the original brief §21).

## SEO audit tooling (10 Nov 2026)

- `npm run build && npm run seo:audit` runs `scripts/seo-audit.cjs` over `dist/` (every page, all four locales) and writes `reports/seo-audit.md` + `reports/seo-audit.json`.
- **FAIL** (exit 1, blocks CI): missing/duplicate title or description, wrong or missing canonical, `<html lang>`/RTL mismatch, not exactly one `<h1>`, invalid or duplicate-`@id` JSON-LD, images without `alt`, `noindex` on a commercial page, non-reciprocal hreflang, sitemap/noindex mismatch, placeholder text, result-like claims or missing "Concept project" schema on concept pages.
- **WARNING** (editorial, never fails): title/description length, direct-answer length (40–60 words), word-count target (services 1,500), FAQ presence, heading-level skips, AI-cliché words, `[[VERIFY]]` markers, locale parity, untranslated text, near-duplicate content, keyword map coverage.
- Thresholds, the keyword-map path (`src/content/keywords.json`, created in the SEO content phase) and per-URL exceptions live in `seo-audit.config.json`. Document every exception here when added. Current exceptions: none.
- Keywords are qualitative (no search-volume data); validation of keyword placement only runs for pages present in the keyword map.
- The audit only reads the local build. It is not production verification (the live site returns 403 to automated requests).
- Schema helpers added: `conceptSchema()` (`CreativeWork`, genre "Concept project") on project pages, `placeSchema()` on location pages (no coordinates until verified), `ContactPage` type via `BaseLayout pageType`, and `graph()` now drops null nodes.

## Pricing (10 Nov 2026)

- Prices live only in `src/content/pricing.ts` (39 price ids, 13 services × 3 tiers). Locale content files hold row labels and notes only; `PricingRow` has no price field, so numbers cannot diverge between EN/RU/TH/HE. Enforced by `npm run pricing:check` (CI).
- All figures are **DRAFT / indicative** and awaiting owner approval; evidence is thin (see `PRICING_STRATEGY.md`). Provisional assumptions: prices exclude VAT, government fees, land and island logistics; unit per row (THB/m², fixed, per month, % of construction cost, % uplift).
- No `Offer` / `priceSpecification` schema is emitted while prices are drafts (checked by `pricing:check`).
- Pricing-table column headers, draft label, unit labels and disclaimer are localised in `src/i18n/dictionary.ts` (`pricing.*`).
- Unresolved: owner approval of every range; optional local quotes; whether to expose prices in schema later.

## SEO content (10 Nov 2026, English)

- Service pages now carry long-form sections from `src/content/services/extended/en/<slug>.ts` (rendered by `LongFormSections.astro` after Deliverables). RU/TH/HE service pages do not have these yet (Phase 7); the files are picked up automatically when added under `extended/<locale>/`.
- Titles, H1s, meta descriptions and 40–60-word direct answers for all 13 services follow `src/content/keywords.json`. Keywords are qualitative (no volume data). `/services/architecture/` (full architecture, owner-specified H1) and `/services/villa-design/` (concept-stage design) have different intents on purpose.
- "bespoke" was replaced by "custom" in EN content (banned-word list in `seo-audit.config.json`).
- Accepted editorial warnings (EN): meta descriptions of the legal/utility pages are short (64–84 chars) and five journal article titles exceed 65 characters; revisit with the legal review. No exceptions are configured in `seo-audit.config.json`.
- Long-form copy was drafted by AI agents and reviewed only for banned words, invented figures and guarantees; the owner should read the Architecture, Permits and Eco pages before publishing.

## Translations of the new content (10 Nov 2026)

- RU/TH/HE versions of the 13 long-form service sections (`src/content/services/extended/{ru,th,he}/`), service/location/about/process titles, descriptions, H1s and direct answers, pricing-table labels, project-page labels and index-page metadata were produced by AI agents. **Status: machine draft — native-speaker review required** before launch.
- Terminology to review: Russian uses «Ко Панган» (existing site spelling; «Пханган» is also common); Thai Chaloklum is «โฉลกหลำ» in the new text but «ช่องคื้น» in the existing location page — pick one; Thai «เทิร์นคีย์» for turnkey; Hebrew «מפתח/תכנון-ביצוע» for turnkey/design-build and «נקודות עצירה» for hold points; some technical terms (MEP, as-built, swale) appear in Latin script.
- Audit thresholds by locale (`seo-audit.config.json`): Hebrew direct answer ≥30 words, Hebrew description ≥85 chars, Hebrew service word target 1,250 (Hebrew packs more meaning into fewer tokens). Thai direct-answer length is not word-counted (no spaces).
- Accepted warnings after Phase 7 (56): legal/utility pages' short descriptions, journal article titles longer than 65 characters, a few Russian descriptions up to ~188 characters, three RU service pages at 1,458–1,482 words, one TH page at 1,499 words, `[[VERIFY]]` legal markers (owner/legal counsel).
- Keyword map is English only (`keywordLocales: ["en"]`); RU/TH/HE keyword research needs a native speaker and a keyword tool.

## Contact form and checks ported from CreativeLAB (10 Nov 2026)

- Form: review step (Edit / Send, nothing sent before Send), preferred reply language, server-side option whitelists (option values are stable English strings, labels are translated), first-touch attribution (landing page, referrer host, UTM) sent with the lead.
- Attribution is stored in `sessionStorage` only after analytics consent (`Attribution.astro`). **The Privacy Policy must mention this** (lawyer review; `[[VERIFY]]` pages are English-only drafts).
- Delivery (`functions/_lib/lead-core.ts`): Telegram, email via Resend, optional webhook; a lead counts as delivered if at least one configured channel succeeds, and the failures of the others are logged. Email needs `CONTACT_EMAIL_TO` (set it to the business email); nothing is hard-coded.
- New checks (all in CI): `nav:check` (D1/D2 on built HTML, header + mobile menu + footer, 4 locales), `i18n:check` (structure parity of services, locations, projects, about, process, home, long-form sections and the UI dictionary; allow-list in `scripts/i18n-allow.json`), `contact:check` (mocked delivery tests and "no secrets in dist"). `npm run qa:form` is the browser journey with a stubbed endpoint (not in CI: needs Chrome).
- Not ported from CreativeLAB: price-row Included/Not-included lists, `ImageObject`/`OfferCatalog` schema, Search Console verification env vars, `.translated-from` hash tracking (FORMA's `i18n:check` checks structure and "still English", not staleness).

## Business-logic tools (10 Nov 2026)

- **`/plan/`** (4 locales): service finder (rule-based, `src/lib/finder.ts`), cost estimator (`src/lib/estimate.ts`, reads `src/content/pricing.ts` only, so it cannot drift from the price tables) and a timeline (`src/content/timeline.ts`). Results can be sent with an enquiry (`plan`, `estimateMin`, `estimateMax` URL params → hidden form fields → staff message). **`/checklist/`**: printable preparation checklist. Both linked from the footer ("Plan your project"), not from the main nav (D1/D2 stay untouched).
- **Timeline numbers are DRAFT** (weeks/months in `timeline.ts` are working assumptions, not evidence). Authority review is deliberately *not* estimated. Owner must approve them like the prices.
- Estimator rules: tier index 0/1/2 (compact / mid-size / large) selects the matching price row of each service; turnkey replaces design + build; eco is a % uplift on the build line and ignored if nobody builds; in "oversight" mode the construction cost is shown as a reference and NOT summed; supervision = months from the draft timeline × monthly price. Area limits 30–3,000 m².
- **Lead qualification** (`qualify()` in `functions/_lib/lead-core.ts`): transparent score with stated reasons (owns land +2, phone +1, service/location chosen +1 each, detailed brief +1, budget given +1, used estimator +1, budget in line with estimate +2, well below −1). HIGH ≥ 6, NORMAL ≥ 3. Shown to staff only (Telegram/email text, email subject tag, webhook payload). Budget text is parsed in THB only ("5 million", "฿5,000,000", "5 млн", "5 ล้าน"); foreign currencies are not guessed.
- **Price rows** now have "What is included / not included" (text in `pricing-details/`, numbers stay in `pricing.ts`; no digits allowed in those lists — checked).
- **Schema:** `ImageObject` on service/location/project pages; `OfferCatalog` of Service names (project tiers) on services, never an `Offer` or a price (`pricing:check`).
- **Search Console / Yandex:** `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_YANDEX_VERIFICATION` add the verification meta tags when set.
- **Telegram deep links** follow the bot contract in `bots/README.md`. WhatsApp links carry a pre-filled message naming the page topic; the bot side of WhatsApp parsing is still not implemented.
- **Tooling note:** the Cloudflare Function is type-checked separately (`functions/tsconfig.json`); `@cloudflare/workers-types` redeclares DOM globals and broke `astro check` when both shared one program.
- Not done: more concept studies / renders, RU/TH/HE keyword research, shared bots package.

## Legal pages and 404 in all four languages (10 Nov 2026)

- Privacy, Terms, Cookies, Accessibility and Editorial Policy now exist in EN/RU/TH/HE (`src/content/legal/<locale>.ts`, one `LegalPage` template). **All are AI drafts of the English drafts and need a lawyer plus native review**; `[[VERIFY]]` markers (updated date, retention period, governing law) still appear in every language until counsel supplies the values (`PUBLIC_LEGAL_*`).
- Contact email in the legal text is now the owner-confirmed `CONTACT.email` (it was an unconfirmed `studio@forma.in.th`). Placeholders `{email}`, `{retention}`, `{governingLaw}` are filled at render time.
- New Privacy section "Planning tools and enquiry source": describes the consent-gated session attribution, the attached plan summary and the staff priority rating. Wording is factual; counsel must confirm it.
- The single static `404.html` switches language on the client from the URL prefix (`/ru/`, `/th/`, `/he/`), including `lang`/`dir` and the home link (tested in Chrome).
- `i18n:check` now covers the legal content (2,353 strings per locale); `seo-audit` parity covers the five legal page types.

## Gap closing against CreativeLAB (11 Nov 2026)

- **Bots:** pure logic extracted to `bots/shared/deeplink.ts`; `bots/test/` has 18 node tests (state machine, i18n completeness in 4 locales, parity with the site's 13 services and primary locations, deep-link parsing incl. forged payloads, and that the site builds links in the format the bot parses). `npm run check` in `bots/` = typecheck + tests; CI uses it. The Telegram/WhatsApp conversations themselves are still untested live.
- **Cookie consent** (`npm run qa:consent`): builds a separate copy with fake GA4/Yandex ids and verifies nothing is requested before consent, reject/accept/settings, mid-session activation, attribution stored only after consent, banner translated in RU/TH/HE. Third-party requests are aborted by the test.
- **Browser matrix** widened to 15 page types × 4 locales: 720 overflow checks (12 widths) and 120 axe runs (390 and 1280 px). It found a real bug: long Russian words in headings (e.g. «конфиденциальности») widened the page on phones (/ru/privacy/, /ru/services/villa-design/). Fixed in `global.css` (`overflow-wrap` + `hyphens` on headings).
- **Contact links:** the site showed no phone number and no `tel:` link anywhere (only in schema). Added `tel:` + visible number + the owner's Telegram link (`https://t.me/+66808705704`, works only if the account allows search by phone, hence the number is shown and copyable) on the contact page and in the footer; helpers `PHONE_TEL`, `TELEGRAM_OWNER`, `TELEGRAM_BOT_HANDLE` in `src/lib/site.ts`; checked by `contact:check`.
- **Secrets scan:** working tree and all new commits are clean. **Git history still contains Telegram bot tokens** (5 old commits, on both remotes' `main`): revoking them in @BotFather is the fix; rewriting history is a separate owner decision.
- `reports/final-matrix.md` (generated) is the final audit matrix; "fix" and "commit" columns are per page type.
- Not done: Lighthouse (not installed), translation staleness tracking, live-site audit mode (site returns 403).

