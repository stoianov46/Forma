/**
 * Service finder — rule-based recommendation from a few answers. Pure, tested by `npm run plan:check`.
 * Answer values are stable English keys; the page shows translated labels.
 */
export type Answers = {
  situation?: 'land-new' | 'land-search' | 'renovate' | 'hospitality' | 'oversee';
  scope?: 'design-only' | 'design-build' | 'turnkey' | 'unsure';
  extras?: ('interior' | 'landscape' | 'eco' | 'concrete')[];
  permits?: 'need-help' | 'have' | 'unsure';
  contractor?: 'yes' | 'no';
};

export const QUESTION_VALUES = {
  situation: ['land-new', 'land-search', 'renovate', 'hospitality', 'oversee'],
  scope: ['design-only', 'design-build', 'turnkey', 'unsure'],
  extras: ['interior', 'landscape', 'eco', 'concrete'],
  permits: ['need-help', 'have', 'unsure'],
  contractor: ['yes', 'no'],
} as const;

export const MAX_RECOMMENDATIONS = 9;

/** Ordered, de-duplicated service slugs for the answers. */
export function recommend(a: Answers): string[] {
  const out: string[] = [];
  const add = (slug: string) => { if (!out.includes(slug)) out.push(slug); };
  const drop = (slug: string) => { const i = out.indexOf(slug); if (i >= 0) out.splice(i, 1); };

  switch (a.situation) {
    case 'land-new': add('architecture'); add('villa-design'); break;
    case 'land-search': add('architecture'); add('permits-planning'); break;
    case 'renovate': add('renovation'); add('technical-supervision'); break;
    case 'hospitality': add('architecture'); add('construction'); add('project-management'); break;
    case 'oversee': add('construction-supervision'); add('technical-supervision'); add('project-management'); break;
  }
  if (a.situation !== 'oversee' && a.situation !== 'renovate') {
    if (a.scope === 'design-build') add('construction');
    if (a.scope === 'turnkey') { add('turnkey-projects'); drop('construction'); }
    if (a.scope === 'unsure') add('turnkey-projects');
  }
  if (a.situation === 'renovate' && (a.scope === 'design-build' || a.scope === 'turnkey')) add('interior-design');
  for (const x of a.extras ?? []) {
    if (x === 'interior') add('interior-design');
    if (x === 'landscape') add('landscape-design');
    if (x === 'eco') add('eco-construction');
    if (x === 'concrete') add('concrete-construction');
  }
  if (a.permits === 'need-help' || a.permits === 'unsure') add('permits-planning');
  if (a.contractor === 'yes' && a.situation !== 'oversee') { add('construction-supervision'); }
  return out.slice(0, MAX_RECOMMENDATIONS);
}

/** True when the answers needed to give a recommendation are present. */
export function complete(a: Answers): boolean {
  if (!a.situation) return false;
  if (a.situation !== 'oversee' && a.situation !== 'renovate' && !a.scope) return false;
  return true;
}
