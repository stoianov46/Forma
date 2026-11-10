/**
 * Indicative cost estimator — pure functions over the central price file (src/content/pricing.ts).
 * Used by the /plan/ page (client side) and tested by `npm run plan:check`.
 * Every figure is a DRAFT indicative range, excludes VAT, government fees, land and island logistics,
 * and is not a quotation.
 */
import { PRICES, SERVICE_PRICE_IDS, type PriceId } from '../content/pricing';
import { BUILD_MONTHS, type NumRange } from '../content/timeline';

export type Size = 0 | 1 | 2;
export type Mode = 'design' | 'design-build' | 'turnkey' | 'oversight';
export type Tier = 0 | 1 | 2;

export interface EstimateInput {
  /** Gross floor area in m². */
  area: number;
  size: Size;
  mode: Mode;
  interior: 'none' | 'standard' | 'custom';
  landscape: boolean;
  /** Permits & planning tier (0 standard, 1 with variances, 2 complex) or 'none'. */
  permits: 'none' | Tier;
  /** Eco uplift tier (0 passive, 1 + energy, 2 full) or 'none'. Applies to the build line. */
  eco: 'none' | Tier;
  /** Oversight mode only: project management (% of reference construction cost). */
  pm: boolean;
  /** Oversight mode only: construction supervision by visit frequency (0 monthly, 1 biweekly, 2 weekly) or 'none'. */
  supervision: 'none' | Tier;
  /** Oversight mode only: technical supervision package for the chosen size tier. */
  techSupervision: boolean;
}

export type Basis =
  | { kind: 'per-m2'; area: number; priceId: PriceId }
  | { kind: 'fixed'; priceId: PriceId }
  | { kind: 'percent'; priceId: PriceId }
  | { kind: 'per-month'; months: NumRange; priceId: PriceId }
  | { kind: 'uplift'; priceId: PriceId };

export interface Line {
  /** Line key used for the translated label. */
  key: 'architecture' | 'interior' | 'landscape' | 'permits' | 'construction' | 'turnkey' | 'eco' | 'pm' | 'supervision' | 'techSupervision';
  slug: string;
  min: number;
  max: number;
  basis: Basis;
  /** Reference rows are shown for context and are NOT part of the total. */
  reference?: boolean;
}

export interface Estimate {
  lines: Line[];
  total: { min: number; max: number };
  reference: Line[];
}

export const AREA_LIMITS = { min: 30, max: 3000 } as const;

const idOf = (slug: string, tier: number): PriceId => SERVICE_PRICE_IDS[slug][tier];
const round = (n: number) => Math.round(n / 1000) * 1000;

export function validate(input: EstimateInput): string | null {
  if (!Number.isFinite(input.area) || input.area < AREA_LIMITS.min || input.area > AREA_LIMITS.max) return 'area';
  return null;
}

export function estimate(input: EstimateInput): Estimate {
  const err = validate(input);
  if (err) throw new Error(`invalid estimate input: ${err}`);
  const { area, size, mode } = input;
  const lines: Line[] = [];
  const reference: Line[] = [];
  const perM2 = (key: Line['key'], slug: string, tier: number, a = area): Line => {
    const id = idOf(slug, tier);
    const p = PRICES[id];
    return { key, slug, min: round(a * p.min), max: round(a * p.max), basis: { kind: 'per-m2', area: a, priceId: id } };
  };
  const fixed = (key: Line['key'], slug: string, tier: number): Line => {
    const id = idOf(slug, tier);
    return { key, slug, min: PRICES[id].min, max: PRICES[id].max, basis: { kind: 'fixed', priceId: id } };
  };

  let buildLine: Line | undefined;
  if (mode === 'design' || mode === 'design-build') lines.push(perM2('architecture', 'architecture', size));
  if (mode === 'design-build') {
    buildLine = perM2('construction', 'construction', size);
    lines.push(buildLine);
  }
  if (mode === 'turnkey') {
    buildLine = perM2('turnkey', 'turnkey-projects', size);
    lines.push(buildLine);
  }
  if (mode !== 'oversight') {
    if (input.interior !== 'none') lines.push(perM2('interior', 'interior-design', input.interior === 'standard' ? 1 : 2));
    if (input.landscape) lines.push(fixed('landscape', 'landscape-design', size));
    if (input.permits !== 'none') lines.push(fixed('permits', 'permits-planning', input.permits));
    if (input.eco !== 'none' && buildLine) {
      const id = idOf('eco-construction', input.eco);
      const p = PRICES[id];
      lines.push({ key: 'eco', slug: 'eco-construction', min: round((buildLine.min * p.min) / 100), max: round((buildLine.max * p.max) / 100), basis: { kind: 'uplift', priceId: id } });
    }
  } else {
    // Owner has a design and a contractor: oversight services only. The reference construction cost is shown, not summed.
    const refId = idOf('construction', size);
    reference.push({ key: 'construction', slug: 'construction', min: round(area * PRICES[refId].min), max: round(area * PRICES[refId].max), basis: { kind: 'per-m2', area, priceId: refId }, reference: true });
    if (input.pm) {
      const id = idOf('project-management', size);
      const p = PRICES[id];
      lines.push({ key: 'pm', slug: 'project-management', min: round((reference[0].min * p.min) / 100), max: round((reference[0].max * p.max) / 100), basis: { kind: 'percent', priceId: id } });
    }
    if (input.supervision !== 'none') {
      const id = idOf('construction-supervision', input.supervision);
      const p = PRICES[id];
      const months = BUILD_MONTHS[size];
      lines.push({ key: 'supervision', slug: 'construction-supervision', min: months.min * p.min, max: months.max * p.max, basis: { kind: 'per-month', months, priceId: id } });
    }
    if (input.techSupervision) lines.push(fixed('techSupervision', 'technical-supervision', size));
    if (input.permits !== 'none') lines.push(fixed('permits', 'permits-planning', input.permits));
  }
  const total = lines.reduce((t, l) => ({ min: t.min + l.min, max: t.max + l.max }), { min: 0, max: 0 });
  return { lines, total, reference };
}

/** Plain-text summary passed to the contact form (kept short, numbers only from the estimate). */
export function summarize(input: EstimateInput, e: Estimate): string {
  const nf = new Intl.NumberFormat('en-US');
  const parts = [`${input.mode}`, `${input.area} m2`, `size tier ${input.size + 1}/3`, ...e.lines.map((l) => l.key)];
  return `Estimate THB ${nf.format(e.total.min)}-${nf.format(e.total.max)} (${parts.join(', ')})`.slice(0, 480);
}
