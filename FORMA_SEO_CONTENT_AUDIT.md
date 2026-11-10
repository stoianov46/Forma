# FORMA SEO content audit (local `dist`, 2026-11-10)

Word counts are the text of `<main>` per page (Thai estimated). Full per-URL data: `reports/audit-matrix.md`.

| Page type | Pages (all locales) | EN words | RU / TH / HE words | Gap vs target |
|---|---|---|---|---|
| Service | 13 × 4 | **1,550–1,830 (after Phase 5)** | ~1,460–1,740 / ~1,490–1,760 / ~1,280–1,520 (after Phase 7) | RU/TH meet the 1,500 target within ~3%; HE uses a 1,250 target (Hebrew uses fewer tokens per idea) |
| Location | 11 × 4 | 304–582 | 289–557 / 297–562 / 263–498 | no 1,500 target (secondary districts); keep unique |
| Project (concept) | 6 × 4 | 208–245 | 185–223 | concept studies, short by design |
| Journal article | 6 × 4 | 474–633 | 389–585 | informational |
| Home / About / Process | 1 × 4 each | 804 / 609 / 680 | similar | adequate |
| Contact, indexes, legal, utility | — | 22–272 | — | utility, no target |

## Structural checks
- One `<h1>` per page, unique `<title>`, canonical present, JSON-LD valid on every page (ProfessionalService, WebSite, WebPage; Service + FAQPage + BreadcrumbList on services; Place/Offer types absent).
- Hreflang: 5 alternates on translated pages; 2 on the five EN-only legal pages.
- All 13 services have an FAQ block and a pricing table (relative bands only — see AUDIT A3).

## Required work (feeds Phases 4–5)
1. Pricing tables → indicative THB from `pricing.ts` (Phase 4).
2. Expand the 13 service pages in EN to ~1,500 words, then translate (Phase 5). Start with `/services/architecture/`.
3. Fix meta length outliers (A6) and long titles (A7) via the automated seo-audit (Phase 3).
4. Translate Latin headings on RU/TH/HE locations/projects indexes (A11).

_Updated after Phase 5 (EN content). Full machine report: `reports/seo-audit.md`._

_Updated after Phase 7 (RU/TH/HE service content)._
