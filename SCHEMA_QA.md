# Schema QA (local, 2026-11-10)

`scripts/qa/jsonldcheck.cjs` parses every JSON-LD block (valid JSON) and `scripts/seo-audit.cjs` checks duplicate `@id`s and that pages carry JSON-LD. Types emitted per page type:

| Page type | Types |
|---|---|
| All pages | `WebSite`, `ProfessionalService` (+`PostalAddress`), `WebPage` |
| Service | + `Service`, `FAQPage` (`Question`/`Answer`), `BreadcrumbList` |
| Location | + `Place` (no coordinates until verified), `FAQPage`, `BreadcrumbList` |
| Project (concept) | + `CreativeWork` with `genre: "Concept project"`, `BreadcrumbList` |
| Article | + `Article`, `BreadcrumbList` |
| Contact | `ContactPage` (instead of `WebPage`) |
| About / Process | + `FAQPage`, `BreadcrumbList` |

Rules enforced: no `Offer`/`OfferCatalog`/`priceSpecification` while prices are drafts (`pricing:check`); no ratings, reviews, awards or certifications; `LocalBusiness` not used (only `ProfessionalService` with the owner-confirmed address).

**Not done:** validation with Schema.org Validator and Google Rich Results Test (needs the deployed URLs); `ImageObject` is defined in `schema.ts` but not emitted on pages.
