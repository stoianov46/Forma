# PROGRESS.md — FORMA.in.th

Single-page snapshot of where the build stands against `proposal.md`, and
the open questions that need your input to close out. For narrative detail
behind any line here, see `NOTES.md` (decisions, `[[VERIFY]]` items, full
content inventory) and `docs/tasks/TASK-*.md` (one file per board task).

Last updated: 19 Sep 2026. See `Improvements.md` for the full item-by-item
completeness tracking behind this session's fixes.

## Status by task (mirrors the GitHub Projects board — all 12 tasks + epic are Done)

| # | Task | Status |
|---|---|---|
| 2 | Brand Shell & Design System | ✅ Done |
| 3 | Global Layout (Header/Footer/Nav) | ✅ Done |
| 4 | Homepage & Service Page Template | ✅ Done |
| 5 | Core Pages (13 services + projects + about + process + locations) | ✅ Done |
| 6 | Bot Integration (Telegram + WhatsApp) | ✅ Done (implementation) — needs **your** live credential testing |
| 7 | SEO / Schema / Hreflang / Sitemap / llms.txt | ✅ Done |
| 8 | 4 Languages (EN/RU/TH/HE) | ✅ Done — see "Translation review" below |
| 9 | Performance Optimization (Core Web Vitals) | ✅ Done (local measurement) |
| 10 | Fix Critical Audit Findings | ✅ Done (implementation) — 2 items left are external, see `docs/tasks/TASK-009` |
| 11 | Homepage/Menu Variant Exploration | ✅ Done — rejected, out of scope |
| 12 | QA & Testing | ✅ Done — everything achievable without real devices/credentials |
| 13 | Launch Checklist | ✅ Done (implementation) — remaining items are real business/legal input |

Board status reads "Done" for all 12 tasks + the epic, meaning every
implementation-side item is complete and verified — not that the site is
ready to go live without the real-world inputs listed below.

## What's fully implemented

- Every page type from `proposal.md`: homepage, 13 service pages, 11
  location pages + hub, 6 project concept studies + hub, 6 journal
  articles + hub, about, process, contact, legal (5 pages), 404.
- All of the above translated into Russian, Thai and Hebrew (Hebrew
  renders `dir="rtl"` correctly) — 182 pages total in the build.
- SEO: schema.org JSON-LD (535 blocks validated), sitemap, hreflang,
  `llms.txt`.
- Telegram + WhatsApp bots: full conversational flow, all 4 languages,
  code-complete and type-checked.
- Performance/accessibility: Lighthouse-verified locally at Performance
  96-98, Accessibility/Best Practices/SEO 100/100/100 on 3 representative
  pages.
- Contact details and legal specifics (governing law, retention period,
  publish dates) are now env-var-configurable (`PUBLIC_*` vars, see
  `.env.example`) rather than hardcoded — set them per environment
  without a code change once real values exist. Real email/phone/WhatsApp
  are already set.
- Consent-gated analytics loader (`Analytics.astro`): GA4 and/or Yandex
  Metrica, zero footprint until a real property ID is set and the visitor
  has actually consented.
- A critical deployment-config bug was found and fixed: `astro.config.mjs`
  had been pointed at GitHub Pages (subpath deployment) but no internal
  link, canonical tag, or schema URL in the codebase accounted for that —
  every internal link would have 404'd if deployed as configured. Fixed
  to be env-configurable (`ASTRO_SITE_URL`/`ASTRO_BASE_PATH`), defaulting
  back to the working Cloudflare Pages root-domain setup.
- A real, previously-undetected mobile menu bug was found via manual
  screenshot review and fixed: the drawer rendered squished into the
  header's own height instead of the full viewport (a `backdrop-filter`
  containing-block issue) — automated class/ARIA checks alone had missed
  it. The QA script itself was strengthened to catch this bug class going
  forward.
- **22 Sep 2026: a Telegram bot token was found hardcoded in the contact
  form's browser JS** (added in the GitHub Pages fork). Removed. The form now
  POSTs to `functions/api/lead.ts` (or `PUBLIC_LEAD_ENDPOINT`). `deploy.yml`
  now builds with `ASTRO_SITE_URL`/`ASTRO_BASE_PATH` instead of `sed`-rewriting
  links, which also exposed and fixed journal links that ignored the base path.
  Every env var and config file is now listed in [`INDEX.md`](INDEX.md).

## What's deliberately left for you

These aren't gaps in the implementation — they're the specific slice of
work that genuinely requires something only you can provide (a real
credential, a business decision, a legal signature), consistent with
"implement everything that can be implemented, flag only what can't."

### Open questions / inputs needed

Same list, as a checklist: `NOTES.md` → "Needs human review".

0. **🔴 Revoke the leaked Telegram bot tokens (urgent).** Two real tokens
   were hardcoded in the contact form's browser JS and are still in git
   history and the public repos. Revoke both in @BotFather (`/revoke`), then
   set the new one only as the server-side `TELEGRAM_BOT_TOKEN`.
1. **Real contact details — mostly done.** Email/phone/WhatsApp are set to
   real values already. Still open: a real street address (`PUBLIC_CONTACT
   _ADDRESS_LINE1`/`_LINE2`/`_POSTCODE` — the mechanism exists, schema.org
   only includes them once set).
2. **Social profile links.** `PUBLIC_SOCIAL_LINKS` is empty by your own
   choice (no accounts exist yet) — set it (comma-separated URLs) once
   they do.
3. **Legal specifics — need real legal counsel, not a guess.**
   `PUBLIC_LEGAL_GOVERNING_LAW`, `PUBLIC_LEGAL_RETENTION_PERIOD`,
   `PUBLIC_LEGAL_UPDATED_DATE` are unset, so Terms/Privacy/Cookies still
   show explicit `[[VERIFY: ...]]` text. This is intentional — a governing
   -law clause or a retention period isn't something to invent. Get a
   lawyer's answer, then set the env vars.
4. **Bot live testing (your explicit ask).** Telegram/WhatsApp bots are
   code-complete, type-checked, and have a written test plan
   (`bots/TEST_PLAN.md`) — but need real bot tokens/webhook credentials
   and an actual conversation walkthrough by you before launch.
5. **Real project photography / case-study data.** The 6 projects are
   clearly labeled "concept study" placeholders (proposal.md's truth rule
   forbids inventing real client work). Replace with real projects when
   you have them, or keep the concept-study framing as a deliberate,
   honest choice.
6. **Translation review.** RU/TH/HE content was translated by this
   assistant (AI), not a hired native-speaking translator — natural and
   domain-appropriate by design, but proposal.md recommends a professional
   human pass before launch. Budget for a native-speaker review; don't
   present it as pre-verified professional translation until that happens.
7. **Analytics — code done, needs real property IDs.** `Analytics.astro`
   loads GA4 and/or Yandex Metrica, consent-gated, the moment you set
   `PUBLIC_GA4_MEASUREMENT_ID` / `PUBLIC_YANDEX_METRICA_ID`. Nothing loads
   until then.
8. **Hosting/deployment.** The fork `DrAndromeda/FORMA.in.th` publishes
   to GitHub Pages via `.github/workflows/deploy.yml`. There the contact form
   needs `lead.ts` hosted elsewhere plus `PUBLIC_LEAD_ENDPOINT` (see
   `README.md` → "GitHub Pages"). Cloudflare Pages on the root domain is
   still the recommended target, since the form and `_redirects` work there
   as-is.
   **Revoke both leaked Telegram bot tokens in @BotFather first** (see
   `Improvements.md`, "Безопасность"). Once deployed, re-run Lighthouse against the live
   URL — a CDN's real cache headers and network conditions differ from a
   local preview build.

### Smaller, non-blocking items

- UI/UX audit (22 Sep 2026): fixed the home page not listing all 13 services
  (a P0 spec requirement), a "View all services" link pointing to itself,
  English headings/labels on RU/TH/HE pages, the slideshow's missing pause
  control, the oversized mobile cookie banner, and grid/carousel alignment.
  Follow-ups that need photos, native review or a design decision are in
  `NOTES.md` → "Needs human review".
- Known code gap: with JavaScript off and the form endpoint on a different
  host than the site, `lead.ts` redirects to `/thank-you/` on the endpoint's
  host, without the base path. JS submissions are unaffected. See
  `NOTES.md` → "Needs human review".

- `docs/tasks/TASK-009` (audit findings) has 2 items left, both external
  (a hosting decision, real client contact data) — see that file.
- Cross-browser/device testing (real Safari, Firefox, iOS, Android) isn't
  possible in this environment — only Chrome is available here.

## How to unblock the rest

Nothing above requires more code. Once you have answers/credentials for
the open questions:
1. Set the relevant `PUBLIC_*` / bot env vars.
2. Run through `bots/TEST_PLAN.md` for both bots.
3. Deploy, then re-run Lighthouse against the live URL.
4. Move `docs/tasks/TASK-012-launch-checklist.md` items off backlog as
   each is resolved, and re-run `scripts/sync-task-status.sh` /
   `scripts/sync-epic-status.sh` to reflect it on the board.
