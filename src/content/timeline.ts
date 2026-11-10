/**
 * Indicative project durations — DRAFT, awaiting owner approval (like src/content/pricing.ts).
 * Not a schedule or a promise: real durations depend on site, design decisions, authority processing,
 * weather and logistics. Numbers live ONLY here; locale files hold the words.
 * Index = project size tier: 0 compact, 1 mid-size, 2 large (same tiers as the pricing tables).
 */
export const TIMELINE_UPDATED = '2026-11-10';
export const TIMELINE_STATUS = 'DRAFT — awaiting owner approval' as const;

export interface NumRange {
  min: number;
  max: number;
}

/** Design and documentation stages, in weeks. */
export const DESIGN_WEEKS: Record<'concept' | 'development' | 'documentation', [NumRange, NumRange, NumRange]> = {
  concept: [
    { min: 3, max: 6 },
    { min: 4, max: 8 },
    { min: 6, max: 12 },
  ],
  development: [
    { min: 4, max: 8 },
    { min: 6, max: 10 },
    { min: 8, max: 16 },
  ],
  documentation: [
    { min: 3, max: 5 },
    { min: 4, max: 8 },
    { min: 6, max: 12 },
  ],
};

/** Construction, in months, from site start to handover. */
export const BUILD_MONTHS: [NumRange, NumRange, NumRange] = [
  { min: 6, max: 10 },
  { min: 9, max: 14 },
  { min: 14, max: 24 },
];

/** Authority review is deliberately NOT estimated: it is decided by the authority, not by the studio. */
export const AUTHORITY_REVIEW_ESTIMATED = false as const;
