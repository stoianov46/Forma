export interface Option {
  value: string;
  label: string;
}

export interface FinderQuestion {
  id: 'situation' | 'scope' | 'extras' | 'permits' | 'contractor';
  label: string;
  multi?: boolean;
  options: Option[];
}

export interface PlanContent {
  seo: { title: string; description: string };
  h1: string;
  directAnswer: string;
  /** Short note under the tools: indicative, draft, not a quotation. */
  note: string;
  tabs: { finder: string; estimator: string; timeline: string };
  finder: {
    heading: string;
    intro: string;
    questions: FinderQuestion[];
    submit: string;
    resultHeading: string;
    resultIntro: string;
    /** Why each service is recommended, keyed by service slug. */
    reasons: Record<string, string>;
    viewService: string;
    askLabel: string;
    restart: string;
    pickAnswers: string;
  };
  estimator: {
    heading: string;
    intro: string;
    area: string;
    areaHint: string;
    size: string;
    sizes: [string, string, string];
    mode: string;
    modes: { design: string; 'design-build': string; turnkey: string; oversight: string };
    interior: string;
    interiorOptions: { none: string; standard: string; custom: string };
    landscape: string;
    permits: string;
    permitOptions: { none: string; standard: string; variances: string; complex: string };
    eco: string;
    ecoOptions: { none: string; passive: string; energy: string; full: string };
    pm: string;
    supervision: string;
    supervisionOptions: { none: string; monthly: string; biweekly: string; weekly: string };
    techSupervision: string;
    calculate: string;
    reset: string;
    resultHeading: string;
    total: string;
    reference: string;
    lines: Record<'architecture' | 'interior' | 'landscape' | 'permits' | 'construction' | 'turnkey' | 'eco' | 'pm' | 'supervision' | 'techSupervision', string>;
    /** Templates: {area} m², {months} months range, {price} the unit price range. */
    basis: { perM2: string; fixed: string; percent: string; perMonth: string; uplift: string };
    exclusions: string;
    draft: string;
    send: string;
    invalidArea: string;
    perMonthUnit: string;
  };
  timeline: {
    heading: string;
    intro: string;
    sizeLabel: string;
    stages: { key: 'concept' | 'development' | 'documentation' | 'authority' | 'construction'; title: string; body: string }[];
    weeks: string;
    months: string;
    notEstimated: string;
    draft: string;
    ask: string;
  };
  checklist: {
    seo: { title: string; description: string };
    h1: string;
    directAnswer: string;
    intro: string;
    groups: { title: string; items: string[] }[];
    print: string;
    ctaHeading: string;
    ctaBody: string;
    ctaLabel: string;
  };
}
