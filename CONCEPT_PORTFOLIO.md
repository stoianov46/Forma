# Concept portfolio

Status: **CODE DONE, LOCAL TESTED** (not production verified). Updated 2026-11-10.

All six projects are **fictional concept studies** (`status: 'concept'` in `src/content/projects/en.ts`). None is a built project. Rules (truth rule, from the TO-DO):

- Every project page shows a visible "Concept project (fictional, not built)" status and the label "Concept study — representative of our design approach"; hero images carry the caption "Illustrative image… not a photograph of a built project".
- JSON-LD uses `CreativeWork` with `genre: "Concept project"` (`conceptSchema()` in `src/lib/schema.ts`).
- No real clients, site addresses, completion dates, budgets, verified specifications, certifications, testimonials or construction outcomes. The former "Outcome" heading is now "Design intent".
- `npm run seo:audit` fails the build if a project page contains result-like words (award, testimonial, ROI, "completed in", "built in", certified…) or lacks the Concept schema (`concept-truth-rule`, `concept-labelled` checks, list in `seo-audit.config.json`).

| Slug | Area | Types | Massing diagram | Palette | Status |
|---|---|---|---|---|---|
| ridge-house-sri-thanu | Sri Thanu | Villa, Architecture | stepped | timber, stone, concrete, glass | concept, 4 locales |
| bay-view-residence-chaloklum | Chaloklum | Villa, Interior, Landscape | courtyard | lime render, timber, clay, planting | concept, 4 locales |
| thong-sala-townhouse-renovation | Thong Sala | Renovation, Interior | linear | lime render, concrete, timber, steel | concept, 4 locales |
| haad-yao-beachfront-pavilion | Haad Yao | Villa, Construction, Landscape | shoreline | timber, concrete, glass, stone | concept, 4 locales |
| haad-salad-privacy-villa | Haad Salad | Villa, Architecture, Landscape | courtyard | stone, timber, planting, concrete | concept, 4 locales |
| baan-tai-family-compound | Baan Tai | Villa, Construction, Hospitality | compound | clay, timber, concrete, planting | concept, 4 locales |

## Visuals
Each page has a schematic massing diagram (north arrow, breeze, sun) and a material palette, generated from `src/content/projects/concept-visuals.ts` by `ConceptDiagram.astro`. They are labelled "not to scale" and "not verified specifications". Diagram text and material names are localised (EN/RU/TH/HE) in `src/i18n/dictionary.ts` (`projectPage`).

## Not done (OWNER INPUT / needs tools)
- **Photoreal renders, floor-plan concepts, moodboards and interior visualisations** were not produced: there is no image-generation tool in this environment. The hero/secondary images are six shared stock-style pictures reused across projects (`src/assets/images`), captioned as illustrative. Replace them with original renders or, when available, real project photos.
- Portfolio categories requested in the TO-DO but without a dedicated concept study: swimming pools, eco construction, concrete architecture, hospitality concepts beyond the compound. Add studies only with the owner's approval.
- Translation quality of the new project-page strings is machine-drafted; native review recommended.
