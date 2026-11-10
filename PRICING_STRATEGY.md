# Pricing Strategy

Status: **DRAFT — awaiting owner approval.** Research date: 2026-11-10 (standard web search).
Evidence is **thin everywhere**: no Koh Phangan or Koh Samui architecture firm publishes a fee schedule, and the Thai Council of Architects publishes no fee guideline that could be found. Figures live in [`src/content/pricing.ts`](src/content/pricing.ts); the generated table is [PRICING_MASTER.md](PRICING_MASTER.md). All prices are indicative estimates and are never emitted as schema.org `Offer`.

## Method
1. Collect publicly listed 2026 figures for comparable services in Thailand (island and mainland markets), recording source, date and limits.
2. Choose ranges consistent with that evidence, one per tier, and state where the evidence does not reach.
3. Position FORMA in the upper-middle / premium mid-market. The brief suggests roughly 10–20% above comparable market averages **only where scope and quality justify it**. No market average could be computed from this evidence, so no markup was applied mechanically; ranges sit in the upper half of what was found.
4. Keep cost categories separate (design fees, construction, supervision, permits, structural/MEP, landscape, interior) so a single figure is never a misleading all-in price.
5. All prices exclude VAT (7%), government fees, land, and island logistics unless a row says otherwise.

## Evidence log (searched 2026-11-10)
| Topic | What was found | Source | Limits |
|---|---|---|---|
| Architect fee | Thai architecture firm with English-speaking staff: 8–15% of construction cost; only Thai-licensed architects can sign permit drawings | [Phuket Expat Guide](https://phuketexpatguide.pages.dev/blog/phuket-building-house-guide/) (updated Mar 2026) | General expat guide; not a firm's fee schedule |
| Architect fee (generic) | Villa design 5–15% of construction cost; reused layout ≈ 2% or less | [archup.net](https://archup.net/how-do-i-determine-the-budget-for-housing-villas-the-design-and-construction-estimation-of-a-villa/) | Not Thailand-specific |
| Professional rules | Architects Act B.E. 2543: licence required; fee basis (percentage, lump sum, time) must be stated in the contract. No published fee percentage found | [Benoit & Partners](https://benoit-partners.com/architect-design-contract-thailand/) | Legal note, no figures |
| Build cost | Property agency tiers: 25,000–35,000 (budget), 35,000–50,000 (mid-high), 50,000–60,000+ THB/m² (luxury incl. pool/landscape) | [Own Property Abroad](https://ownpropertyabroad.com/thailand/building-a-house-in-thailand-cost) | Agency marketing; mainland-weighted |
| Build cost (premium) | 65,000–120,000 THB/m² for premium tropical villas, attributed to the Thai Contractors Association; input costs rising (diesel, rebar, concrete) | [Aster of Asia](https://asterofasia.com/blog/tropical-architecture-luxury-villas-design-trends-2026-seo-1781625343411) | Secondary source; underlying data not seen; disagrees with the tiers above |
| Build cost (villa) | 400 m² villa from 10 M THB, easily above 24 M THB (≈ 25,000–60,000/m², our arithmetic) | [Aster of Asia](https://asterofasia.com/blog/building-villa-thailand-contractor-agreement-guide) | Contractor article |
| Interior design fee | "Design fee from 1,500 THB/m², minimum 50 m²" (Bangkok firm, undated) | [Bangkok interior firm listing](https://bk.asia-city.com/node/106009) | Firm selling built-ins; undated; Bangkok |
| Renovation (condo) | Refresh ≈ 15,000–20,000; full gut ≈ 25,000–35,000+ THB/m² (Bangkok condo, 2026) | [Thai condo renovation guide](https://thai-condo-guide.blogspot.com/2026/04/thai-condo-renovation-tips-foreign-owners-2026.html) | Blog; condo, not villa; construction cost |
| Pool | 0.5–2 M THB per pool; older forum quotes 14,000–20,000 THB/m² | [Swimming Pools Thailand](https://swimmingpoolsthailand.com/en/content/186-how-much-does-a-pool-cost), forum posts | Dated / weak sources; not priced separately on FORMA |
| Landscape fee | No Thai figure; US guides cite 10–15% of project budget | US guides | Not Thailand |
| Koh Phangan sale prices | ≈ 62,000–81,000 THB/m² (listings) | [FazWaz](https://www.fazwaz.com/property-sales/5-bedroom-house-for-sale-in-bo-phut-surat-thani-u5652204) etc. | Include land and developer margin; **not** used for build cost |

## How each draft range was set
- **Architecture** (2,800–6,500 THB/m² GFA): ≈ 6–10% of the build-cost ranges below, inside the 8–15% evidence once structural/MEP coordination is billed separately. Upper-mid positioning.
- **Villa design** (fixed concept packages): concept and schematic stages only; full documentation is priced under Architecture to avoid double counting.
- **Construction** (38,000–85,000 THB/m²): sits across the agency tiers and below the premium claim; island logistics and site conditions push island projects up the range.
- **Turnkey** (48,000–105,000 THB/m²): construction plus design and delivery management, excluding land.
- **Interior** (2,200–5,500 THB/m²; 45,000–90,000 for a room): above the single 1,500 THB/m² benchmark, justified by villa scale and custom joinery.
- **Renovation, concrete works, eco uplift, supervision, technical supervision, permits, landscape, project management:** no usable published benchmark was found. These are working estimates and are the least supported; they need the owner's own costings or local quotes.

## What this evidence does NOT support
- A 10–20% premium over a market average (no average could be computed).
- Any island-specific (Koh Phangan / Koh Samui) figure.
- Any of the owner-independent claims in the supervision, permits and landscape ranges.

## Owner actions
1. Approve or replace each range in `src/content/pricing.ts` (then run `npm run pricing:master`).
2. Optionally collect 3–5 real quotes from Koh Samui / Koh Phangan firms and update the evidence log.
3. Decide whether prices should ever be exposed in schema.org (`Offer`). Until then they are not.
