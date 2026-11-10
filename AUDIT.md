# AUDIT — local build audit (2026-11-10)

**Scope:** the local `dist/` build (182 pages). The live site `https://forma.in.th/` returns **403** to automated requests, so nothing here is `PRODUCTION VERIFIED`.
**Reproduce:** `npm run build && npm run qa:audit` (writes `reports/audit-matrix.md` and `reports/audit.json`).

## Baseline results
| Check | Result |
|---|---|
| `npm run build` | 182 pages (181 `index.html` + `404.html`) |
| `npm run check` | 0 errors, 0 warnings, 17 hints |
| `npm run qa:static` | no broken internal links; meta checks pass; 535 JSON-LD blocks valid |
| Sitemap | 177 URLs = 182 − 5 `noindex` pages (404 + 4 thank-you), consistent |
| Hebrew | `dir="rtl"` on every `/he/` page, `ltr` elsewhere |
| Duplicate `<title>` | 0 |

## Findings
| ID | Severity | Finding | Evidence | Status |
|---|---|---|---|---|
| A1 | P1 | "Start a Project" in header/mobile nav (D1) | `Header.astro` | **CODE DONE** (commit fecacc5) |
| A2 | P1 | Nav listed Koh Phangan districts next to islands (D2) | `Header.astro` | **CODE DONE** (commit fecacc5) |
| A3 | P1 | All 13 service pages use relative pricing bands, no THB | `src/content/services/en.ts` pricingRows | TODO (Phase 4) |
| A4 | P1 | Service pages 824–1,025 words (EN) vs 1,500 target; RU/TH/HE 701–1,020 | `reports/audit-matrix.md` | TODO (Phase 5; EN first, then translations) |
| A5 | P2 | Architecture title/H1: "Architecture Studio in Koh Phangan \| FORMA" / "Architecture, Rooted in the Island" | `/services/architecture/` | TODO (Phase 5) |
| A6 | P2 | 73 of 182 pages have meta description outside 110–170 chars (EN range 64–239; worst: HE services 12, HE/RU locations) | `descLen` column | TODO |
| A7 | P2 | 29 titles over 65 chars (mostly journal + HE) | `titleLen` column | TODO |
| A8 | P2 | Legal pages (privacy, terms, cookies, accessibility, editorial) exist in EN only; hreflang count 2 | `/privacy/` etc. | Known/by design; TO-DO §8 asks all pages in 4 languages → OWNER decision after legal review |
| A9 | P2 | `[[VERIFY]]` markers in 3 built pages (governing law / retention / date) | `src/lib/site.ts` | OWNER INPUT REQUIRED (legal counsel) |
| A10 | P3 | RU/TH project pages have the same H1 as EN (proper names). Not an error. | audit.json | Accepted |
| A11 | P3 | Locations/projects index pages in RU/TH/HE have 33–48% Latin letters (likely untranslated headings, e.g. "Koh Phangan areas" in `LocationsIndexPage.astro:42`) | `latinPct` | TODO |
| A12 | P3 | No pricing schema (`Offer`) — correct while prices are drafts | JSON-LD types | Keep until prices approved |

## Not tested (cannot be, locally)
Live HTTP status, redirects on the real host, real-device and Firefox/Edge rendering, screen readers, Lighthouse on the live URL.
