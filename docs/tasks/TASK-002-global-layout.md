# Global Layout (Header / Footer / Nav)

**Priority:** P0
**Phase:** 2
**Status:** Done

The chrome every page shares.

## Scope

- `Header.astro`: sticky header, desktop mega-menus for Services and
  Locations, primary nav, language switcher, "Start a Project" CTA,
  full-screen mobile drawer with accordions.
- `Footer.astro`: services/locations/company/contact columns, legal links,
  language-aware throughout.
- `LanguageSwitcher.astro`, `Breadcrumbs.astro` (with BreadcrumbList schema),
  `CookieConsent.astro` (Accept/Reject/Settings banner, gates a
  `forma:consent` DOM event for a future analytics loader to listen to).
- `BaseLayout.astro`: wraps every page — `<html lang/dir>`, header, footer,
  cookie banner, Organization/WebSite/WebPage JSON-LD, LCP-image preload
  hook.

## Outcome

`NOTES.md`'s audit (13 Sep 2026) had flagged breadcrumbs as broken — that
audit predates the full rebuild that produced the current
`Breadcrumbs.astro`; re-verified directly against source and it's
correct (Service/Project/Location templates all pass distinct per-level
paths, not homepage links). See `TASK-009-fix-audit-findings.md`.

The audit also proposes a possible primary-nav restructure (13 services
listed directly instead of generic Home/Services/Projects/etc. labels) —
that's a real IA decision, not a bug fix. **Decided 14 Sep 2026: rejected,
current nav kept** (see `TASK-009` and `NOTES.md`).

Every nav/footer link is **translation-gated** — it links to the localized
page only if one actually exists for that locale, otherwise falls back to
the English page, never to a 404. See
`serviceHrefSmart`/`locationHrefSmart`/`projectHrefSmart` in
`src/content/*/index.ts` and the `availableLocales` prop threaded through
`BaseLayout` → `BaseHead`/`Header` for `hreflang`/the language switcher
itself.
