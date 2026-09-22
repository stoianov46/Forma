# Fix Critical Audit Findings (2026-09-13)

**Priority:** P0
**Status:** Done (implementation) — breadcrumbs fixed, hero slider
verified fine, both spec-conflict decisions resolved, pricing table live
on all 13 services, mobile menu interaction verified via real browser
automation (open/close/accordion/focus-return/Escape, 375-768px — see
`scripts/qa/browsercheck.cjs`), lead-form pipeline verified end-to-end
against a local `wrangler pages dev` run (honeypot, validation, and
Telegram-delivery code path all confirmed correct). **Left, genuinely
external:** lead-form hosting (a deployment decision — needs a real
Cloudflare Pages project, or `PUBLIC_LEAD_ENDPOINT` on GitHub Pages).
Real contact details are done (15 Sep 2026).

New task, added when merging `proposal(NEW2).md`'s §44 (a dated audit of
an earlier deployment) into `proposal.md`. The audit predates the big
"Build FORMA.in.th" rebuild commit, so **several of its findings turned
out to already be fixed by that rebuild** — verified directly against the
current source before assuming the audit was still accurate. Don't trust
audit text alone; check the code.

## ⚠️ Spec conflict — RESOLVED (14 Sep 2026)

`proposal.md` §24 ROOT PAGE (Part 1, P0) says: *"Root URL `/` is master
Services landing... **Do not create competing `/services/` hub."*** The
audit (Part 2 §44.2) separately calls the `/services/` 404 a critical bug
to fix. **Decided: option (c)** — redirect `/services/` → `/` (and the
locale equivalents), via `public/_redirects`. Not a competing hub (no
content of its own), so Part 1's requirement stands untouched; closes the
actual gap the audit found. Full reasoning in `NOTES.md` → "Decisions
resolving the audit's two open questions."

## Scope

- [x] ~~Fix breadcrumbs~~ — **real bug, fixed directly**, not something the
      rebuild already handled. Confirmed live in the built HTML first
      (every service page showed a duplicate "Services / Services /
      <name>" crumb), then fixed the actual cause in `ServicePage.astro`
      (it was passing its own redundant root item on top of
      `Breadcrumbs.astro`'s auto-prepended one) and re-confirmed clean
      output. `ProjectPage.astro`/`LocationPage.astro` were unaffected —
      checked both; their first item already points elsewhere.
- [x] ~~Diversify the hero slider~~ — **verified already correct**:
      `HomePage.astro`'s hero slides are `hero-villa` (exterior), 
      `architecture` (structure/shading), `pool-villa` (pool/landscape),
      `interior` — four genuinely distinct categories, not repeats.
- [x] ~~Root Services page / `/services/`~~ — **resolved**: redirect added
      (`public/_redirects`), no new page built. See above.
- [x] ~~Add an indicative-pricing table to service pages~~ — **done, but
      not literal THB figures.** This studio has no real, verified pricing
      data — inventing specific currency numbers would violate the truth
      rule as directly as a fabricated testimonial would (see
      `src/lib/types.ts`'s `PricingRow` comment). Implemented as
      `PricingTable.astro`, wired into all 13 service pages, using
      relative indicative tiers ("Base" / "1.5-2.5x base" / "3x+ base")
      instead — genuinely informative about how scope drives cost, with
      zero invented absolute numbers. Heading/disclaimer localized via
      `t.pricing` in the dictionary (all 4 languages, ready once
      service-page translation starts).
- [ ] Get the lead form actually working on whatever host this deploys
      to — `functions/api/lead.ts` needs Cloudflare Pages Functions (or an
      equivalent), which plain GitHub Pages doesn't provide. This is a
      hosting decision, not a code bug — the code already assumes
      Cloudflare Pages.
- [x] ~~Replace live placeholder contact details~~ — **done (15 Sep
      2026):** real email, phone, WhatsApp and Telegram are the defaults
      in `src/lib/site.ts`. Only the street address is still unknown.
- [x] ~~Test mobile menu / mega-menu dropdown behavior~~ — **verified via
      real browser automation** (`scripts/qa/browsercheck.cjs`): open,
      services accordion, close button, focus return, and Escape key all
      confirmed working at 375/430/768px.
- [x] ~~Primary-nav restructure~~ — **rejected, resolved (14 Sep 2026)**:
      current nav kept as-is. The existing Services mega-menu already
      exposes all 13 services without needing 13 flat top-level items;
      moving About/Process to footer-only conflicts with proposal.md §3
      MENU's own explicit primary-nav list; moving Locations out of nav
      loses a legitimate location-first entry point. Full reasoning in
      `NOTES.md`. No code change.

## Acceptance criteria

- [x] The `/services/` question above is explicitly decided — option (c),
      redirect only.
- [x] Every breadcrumb link on a representative sample of pages goes to
      its actual parent — verified in source for Service/Project/Location
      templates.
- [x] Every service page shows a real price-range table with the
      indicative-pricing disclaimer — verified across all 13 in the
      built output.
- [ ] A real end-to-end form submission is received (Telegram staff chat
      or wherever it's wired to) from the deployed site.
- [x] No placeholder phone/email/WhatsApp number remains on any live page.
