# Schema QA (local, 2026-11-10)

`scripts/qa/jsonldcheck.cjs` parses every JSON-LD block (valid JSON) and `scripts/seo-audit.cjs` checks duplicate `@id`s and that pages carry JSON-LD. Types emitted per page type:

| Page type | Types |
|---|---|
| All pages | `WebSite`, `ProfessionalService` (+`PostalAddress`), `WebPage` |
| Service | + `Service` with an `OfferCatalog` of Service names (project tiers, no prices), `ImageObject`, `FAQPage` (`Question`/`Answer`), `BreadcrumbList` |
| Location | + `Place` (no coordinates until verified), `ImageObject`, `FAQPage`, `BreadcrumbList` |
| Project (concept) | + `CreativeWork` with `genre: "Concept project"`, `ImageObject`, `BreadcrumbList` |
| Article | + `Article`, `BreadcrumbList` |
| Contact | `ContactPage` (instead of `WebPage`) |
| About / Process | + `FAQPage`, `BreadcrumbList` |

Rules enforced: no `Offer`/`AggregateOffer`/`priceSpecification`/`price` while prices are drafts (`pricing:check`; an `OfferCatalog` of Service names is allowed); no ratings, reviews, awards or certifications; `LocalBusiness` not used (only `ProfessionalService` with the owner-confirmed address).

**Not done:** validation with Schema.org Validator and Google Rich Results Test (needs the deployed URLs); 
