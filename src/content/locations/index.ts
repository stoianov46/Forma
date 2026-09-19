import { localizePath, type Locale } from '../../lib/i18n';
import type { Location } from '../../lib/types';
import { locationsEn, locationsEnContent } from './en';
import { locationsRuContent } from './ru';
import { locationsThContent } from './th';
import { locationsHeContent } from './he';

export { locationsEnContent, locationsRuContent, locationsThContent, locationsHeContent };

const contentByLocale: Record<Locale, Record<string, Location['translations']['en']> | Partial<Record<string, Location['translations']['en']>>> = {
  en: locationsEnContent,
  ru: locationsRuContent,
  th: locationsThContent,
  he: locationsHeContent,
};

export function hasLocationTranslation(locale: Locale, slug: string): boolean {
  return locale === 'en' ? slug in locationsEnContent : slug in contentByLocale[locale];
}

export function translatedLocationSlugs(locale: Locale): string[] {
  return locationsEn.map((l) => l.slug).filter((slug) => hasLocationTranslation(locale, slug));
}

export const locations: Location[] = locationsEn.map((base) => ({
  ...base,
  translations: {
    en: locationsEnContent[base.slug],
    ru: locationsRuContent[base.slug] ?? locationsEnContent[base.slug],
    th: locationsThContent[base.slug] ?? locationsEnContent[base.slug],
    he: locationsHeContent[base.slug] ?? locationsEnContent[base.slug],
  },
}));

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function primaryLocations(): Location[] {
  return locations.filter((l) => l.tier === 'primary');
}

export function secondaryLocations(parentSlug: string): Location[] {
  return locations.filter((l) => l.tier === 'secondary' && l.parentSlug === parentSlug);
}

export function locationHref(locale: Locale, slug: string): string {
  return localizePath(locale, `/locations/${slug}/`);
}

/** Links to the localized location page if translated, otherwise falls back to the English page rather than a 404. */
export function locationHrefSmart(locale: Locale, slug: string): string {
  return hasLocationTranslation(locale, slug) ? locationHref(locale, slug) : locationHref('en', slug);
}
