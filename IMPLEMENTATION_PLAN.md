# Implementation plan and status

Source spec: `TO-DO_2026-11-03.md`. Status labels as defined there. All work is local; nothing is pushed or deployed.

| # | Phase | Status | Commit |
|---|---|---|---|
| 1 | Local audit (`AUDIT.md`, matrix) | LOCAL TESTED | 47e7ea3 |
| 2 | Navigation D1/D2/D3 | CODE DONE (D3: no `/v1–v3` routes exist) | fecacc5 |
| 3 | SEO audit tooling, schema helpers, CI | LOCAL TESTED | c095bf1 |
| 4 | Central THB pricing + strategy | CODE DONE — **OWNER INPUT REQUIRED** (approve prices) | 900428a |
| 5 | English SEO content, keyword map | CODE DONE — owner read-through | 6242986 |
| 6 | Concept portfolio | CODE DONE — photoreal renders NOT possible here | aece8dc |
| 7 | RU/TH/HE translations | CODE DONE — native review required | 91988e2 |
| 8 | Final QA + release docs | LOCAL TESTED (see `FINAL_QA.md`) | this commit |

| 9 | Business logic: `/plan/` tools, checklist, price-row details, lead qualification, context chat links, schema + verification extras | LOCAL TESTED | this commit |

Not in scope / not done: production crawl (403), Lighthouse, real-device tests, RU/TH/HE keyword map, shared bots package (decision: option B, no cross-project refactor).
