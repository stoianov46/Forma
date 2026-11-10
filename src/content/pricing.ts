/**
 * PRICING MASTER — the single source of truth for every price shown on the site.
 *
 * Service pages list `SERVICE_PRICE_IDS[slug]`; the numbers are rendered by
 * `formatPrice` and never typed into a locale file, so EN / RU / TH / HE always
 * show identical figures. Change numbers ONLY here, then run
 * `npm run pricing:master` (regenerates PRICING_MASTER.md) and `npm run pricing:check`.
 *
 * STATUS: DRAFT / INDICATIVE. These are working estimates for the owner to approve,
 * built from thin public evidence (see PRICING_STRATEGY.md). They are not confirmed
 * commercial offers and must NOT be emitted as schema.org `Offer` / `priceSpecification`.
 * All figures exclude VAT, government fees, land and island logistics unless a row says otherwise.
 */

export const PRICING_CURRENCY = 'THB' as const;
/** Date the numbers were last reviewed. Update on every change. */
export const PRICING_UPDATED = '2026-11-10';
export const PRICING_STATUS = 'DRAFT — awaiting owner approval' as const;

/**
 * per-m2          THB per m² of gross floor area (or the area named in the row)
 * fixed           one price for the scope named in the row
 * per-month       THB per month
 * percent         % of construction cost
 * percent-uplift  % added on top of the standard construction cost
 */
export type PriceUnit = 'per-m2' | 'fixed' | 'per-month' | 'percent' | 'percent-uplift';

export interface PriceSpec {
  min: number;
  max: number;
  unit: PriceUnit;
}

export const PRICES = {
  // Architecture — design fee (concept → permit → technical documentation), per m² GFA
  'architecture.compact': { min: 2800, max: 3800, unit: 'per-m2' },
  'architecture.mid': { min: 3600, max: 5000, unit: 'per-m2' },
  'architecture.large': { min: 4500, max: 6500, unit: 'per-m2' },
  // Villa design — concept & schematic package, fixed
  'villa-design.compact': { min: 90000, max: 150000, unit: 'fixed' },
  'villa-design.mid': { min: 140000, max: 260000, unit: 'fixed' },
  'villa-design.large': { min: 240000, max: 450000, unit: 'fixed' },
  // Interior design — design fee
  'interior-design.room': { min: 45000, max: 90000, unit: 'fixed' },
  'interior-design.villa': { min: 2200, max: 3500, unit: 'per-m2' },
  'interior-design.villa-custom': { min: 3500, max: 5500, unit: 'per-m2' },
  // Construction — build cost per m² GFA, excl. design, land, VAT
  'construction.compact': { min: 38000, max: 50000, unit: 'per-m2' },
  'construction.mid': { min: 48000, max: 65000, unit: 'per-m2' },
  'construction.large': { min: 60000, max: 85000, unit: 'per-m2' },
  // Renovation — per m² renovated
  'renovation.refresh': { min: 9000, max: 16000, unit: 'per-m2' },
  'renovation.partial': { min: 18000, max: 32000, unit: 'per-m2' },
  'renovation.structural': { min: 30000, max: 48000, unit: 'per-m2' },
  // Project management — % of construction cost
  'project-management.single': { min: 3, max: 5, unit: 'percent' },
  'project-management.multi-trade': { min: 5, max: 8, unit: 'percent' },
  'project-management.multi-structure': { min: 7, max: 10, unit: 'percent' },
  // Construction supervision — retainer by visit frequency
  'construction-supervision.monthly': { min: 15000, max: 25000, unit: 'per-month' },
  'construction-supervision.biweekly': { min: 28000, max: 45000, unit: 'per-month' },
  'construction-supervision.weekly': { min: 50000, max: 85000, unit: 'per-month' },
  // Technical supervision — engineering review, fixed per project
  'technical-supervision.structural': { min: 35000, max: 70000, unit: 'fixed' },
  'technical-supervision.structural-mep': { min: 80000, max: 160000, unit: 'fixed' },
  'technical-supervision.full': { min: 150000, max: 300000, unit: 'fixed' },
  // Landscape design — design fee, fixed (depends on site area)
  'landscape-design.compact': { min: 60000, max: 120000, unit: 'fixed' },
  'landscape-design.mid': { min: 120000, max: 250000, unit: 'fixed' },
  'landscape-design.estate': { min: 250000, max: 550000, unit: 'fixed' },
  // Permits & planning — professional fee; government fees are separate
  'permits-planning.standard': { min: 45000, max: 90000, unit: 'fixed' },
  'permits-planning.variances': { min: 90000, max: 170000, unit: 'fixed' },
  'permits-planning.complex': { min: 170000, max: 350000, unit: 'fixed' },
  // Turnkey — design + build, per m² GFA, excl. land
  'turnkey-projects.compact': { min: 48000, max: 62000, unit: 'per-m2' },
  'turnkey-projects.mid': { min: 58000, max: 78000, unit: 'per-m2' },
  'turnkey-projects.large': { min: 72000, max: 105000, unit: 'per-m2' },
  // Eco construction — uplift over standard construction cost
  'eco-construction.passive': { min: 3, max: 6, unit: 'percent-uplift' },
  'eco-construction.energy': { min: 8, max: 15, unit: 'percent-uplift' },
  'eco-construction.full': { min: 15, max: 25, unit: 'percent-uplift' },
  // Concrete construction — structural concrete works per m² GFA
  'concrete-construction.standard': { min: 11000, max: 17000, unit: 'per-m2' },
  'concrete-construction.exposed': { min: 16000, max: 25000, unit: 'per-m2' },
  'concrete-construction.large-span': { min: 22000, max: 38000, unit: 'per-m2' },
} as const satisfies Record<string, PriceSpec>;

export type PriceId = keyof typeof PRICES;

/** Row order matches `pricingRows` in the service content files (all locales). */
export const SERVICE_PRICE_IDS: Record<string, PriceId[]> = {
  architecture: ['architecture.compact', 'architecture.mid', 'architecture.large'],
  'villa-design': ['villa-design.compact', 'villa-design.mid', 'villa-design.large'],
  'interior-design': ['interior-design.room', 'interior-design.villa', 'interior-design.villa-custom'],
  construction: ['construction.compact', 'construction.mid', 'construction.large'],
  renovation: ['renovation.refresh', 'renovation.partial', 'renovation.structural'],
  'project-management': ['project-management.single', 'project-management.multi-trade', 'project-management.multi-structure'],
  'construction-supervision': ['construction-supervision.monthly', 'construction-supervision.biweekly', 'construction-supervision.weekly'],
  'technical-supervision': ['technical-supervision.structural', 'technical-supervision.structural-mep', 'technical-supervision.full'],
  'landscape-design': ['landscape-design.compact', 'landscape-design.mid', 'landscape-design.estate'],
  'permits-planning': ['permits-planning.standard', 'permits-planning.variances', 'permits-planning.complex'],
  'turnkey-projects': ['turnkey-projects.compact', 'turnkey-projects.mid', 'turnkey-projects.large'],
  'eco-construction': ['eco-construction.passive', 'eco-construction.energy', 'eco-construction.full'],
  'concrete-construction': ['concrete-construction.standard', 'concrete-construction.exposed', 'concrete-construction.large-span'],
};

const nf = new Intl.NumberFormat('en-US');

/** The numeric part, identical in every locale (e.g. "38,000–50,000" or "5–8"). */
export function formatAmount(id: PriceId): string {
  const p: PriceSpec = PRICES[id];
  return `${nf.format(p.min)}–${nf.format(p.max)}`;
}

/** Full figure with currency/percent symbol, without the translated unit label. */
export function formatPrice(id: PriceId): string {
  const p: PriceSpec = PRICES[id];
  const amount = formatAmount(id);
  return p.unit === 'percent' || p.unit === 'percent-uplift' ? `${amount}%` : `฿${amount}`;
}
