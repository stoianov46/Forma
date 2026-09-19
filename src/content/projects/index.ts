import { localizePath, type Locale } from '../../lib/i18n';
import type { Project } from '../../lib/types';
import { projectsEn, projectsEnContent } from './en';
import { projectsRuContent } from './ru';
import { projectsThContent } from './th';
import { projectsHeContent } from './he';

export { projectsEnContent, projectsRuContent, projectsThContent, projectsHeContent };

const contentByLocale: Record<Locale, Record<string, Project['translations']['en']> | Partial<Record<string, Project['translations']['en']>>> = {
  en: projectsEnContent,
  ru: projectsRuContent,
  th: projectsThContent,
  he: projectsHeContent,
};

export function hasProjectTranslation(locale: Locale, slug: string): boolean {
  return locale === 'en' ? slug in projectsEnContent : slug in contentByLocale[locale];
}

export function translatedProjectSlugs(locale: Locale): string[] {
  return projectsEn.map((p) => p.slug).filter((slug) => hasProjectTranslation(locale, slug));
}

export const projects: Project[] = projectsEn.map((base) => ({
  ...base,
  translations: {
    en: projectsEnContent[base.slug],
    ru: projectsRuContent[base.slug] ?? projectsEnContent[base.slug],
    th: projectsThContent[base.slug] ?? projectsEnContent[base.slug],
    he: projectsHeContent[base.slug] ?? projectsEnContent[base.slug],
  },
}));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(serviceSlug: string): Project[] {
  return projects.filter((p) => p.serviceSlugs.includes(serviceSlug));
}

export function projectsForLocation(locationSlug: string): Project[] {
  return projects.filter((p) => p.locationSlug === locationSlug);
}

export function projectHref(locale: Locale, slug: string): string {
  return localizePath(locale, `/projects/${slug}/`);
}

/** Links to the localized project page if translated, otherwise falls back to the English page rather than a 404. */
export function projectHrefSmart(locale: Locale, slug: string): string {
  return hasProjectTranslation(locale, slug) ? projectHref(locale, slug) : projectHref('en', slug);
}
