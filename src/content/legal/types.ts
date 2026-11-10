export interface LegalSection {
  heading: string;
  text: string;
}

export interface LegalBasic {
  navLabel: string;
  title: string;
  description: string;
  h1: string;
}

/**
 * Legal pages, one file per locale. Placeholders in text: {email} (studio contact email),
 * {retention} and {governingLaw} (from src/lib/site.ts LEGAL; they stay "[[VERIFY…]]" until legal counsel
 * supplies the values). All locales are DRAFTS pending lawyer review.
 */
export interface LegalContent {
  updatedLabel: string;
  privacy: LegalBasic & { sections: LegalSection[] };
  terms: LegalBasic & { sections: LegalSection[] };
  cookies: LegalBasic & { intro: string; categories: { title: string; body: string }[]; manage: string };
  accessibility: LegalBasic & { body: string };
  editorialPolicy: LegalBasic & { body: string };
}
