import { localizePath, type Locale } from '../../lib/i18n';
import type { ExtendedSection, Service } from '../../lib/types';
import { servicesEn, servicesEnContent } from './en';
import { servicesRuContent } from './ru';
import { servicesThContent } from './th';
import { servicesHeContent } from './he';

export { servicesEnContent, servicesRuContent, servicesThContent, servicesHeContent };

const contentByLocale: Record<Locale, Record<string, Service['translations']['en']> | Partial<Record<string, Service['translations']['en']>>> = {
  en: servicesEnContent,
  ru: servicesRuContent,
  th: servicesThContent,
  he: servicesHeContent,
};

/** True only when this slug has a genuine translation for the locale (never an English fallback). */
export function hasServiceTranslation(locale: Locale, slug: string): boolean {
  return locale === 'en' ? slug in servicesEnContent : slug in contentByLocale[locale];
}

export function translatedServiceSlugs(locale: Locale): string[] {
  return servicesEn.map((s) => s.slug).filter((slug) => hasServiceTranslation(locale, slug));
}

// Long-form sections: one file per slug per locale, e.g. extended/en/architecture.ts (default export ExtendedSection[]).
const extendedModules = import.meta.glob<{ default: ExtendedSection[] }>('./extended/*/*.ts', { eager: true });
function extendedFor(locale: Locale, slug: string): ExtendedSection[] | undefined {
  return extendedModules[`./extended/${locale}/${slug}.ts`]?.default;
}
const withExtended = (locale: Locale, slug: string, tr: Service['translations']['en']): Service['translations']['en'] => {
  const extended = extendedFor(locale, slug);
  return extended ? { ...tr, extended } : tr;
};

export const services: Service[] = servicesEn.map((base) => ({
  ...base,
  translations: {
    en: withExtended('en', base.slug, servicesEnContent[base.slug]),
    ru: withExtended('ru', base.slug, servicesRuContent[base.slug] ?? servicesEnContent[base.slug]),
    th: withExtended('th', base.slug, servicesThContent[base.slug] ?? servicesEnContent[base.slug]),
    he: withExtended('he', base.slug, servicesHeContent[base.slug] ?? servicesEnContent[base.slug]),
  },
}));

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getPriorityServices(): Service[] {
  return services.filter((s) => s.priority);
}

export function serviceHref(locale: Locale, slug: string): string {
  return localizePath(locale, `/services/${slug}/`);
}

/** Links to the localized service page if translated, otherwise falls back to the English page rather than a 404. */
export function serviceHrefSmart(locale: Locale, slug: string): string {
  return hasServiceTranslation(locale, slug) ? serviceHref(locale, slug) : serviceHref('en', slug);
}
