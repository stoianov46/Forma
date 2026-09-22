import { getCollection, type CollectionEntry } from 'astro:content';
import { localizePath, type Locale } from './i18n';

export type JournalEntry = CollectionEntry<'journal'>;

export function localeSlug(entry: JournalEntry): string {
  return entry.id.split('/').slice(1).join('/');
}

/**
 * Only returns genuinely translated articles for the locale — never an English
 * fallback, to avoid serving mismatched-language content under a translated URL.
 */
export async function getJournalArticles(locale: Locale): Promise<JournalEntry[]> {
  const all = await getCollection('journal');
  const forLocale = all.filter((e) => e.id.startsWith(`${locale}/`));
  return forLocale.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export async function getJournalArticle(locale: Locale, slug: string): Promise<JournalEntry | undefined> {
  const articles = await getJournalArticles(locale);
  return articles.find((e) => localeSlug(e) === slug);
}

export async function getLocalesWithAnyArticles(): Promise<Locale[]> {
  const all = await getCollection('journal');
  const locales: Locale[] = ['en', 'ru', 'th', 'he'];
  return locales.filter((locale) => all.some((e) => e.id.startsWith(`${locale}/`)));
}

export async function getAvailableLocalesForArticle(slug: string): Promise<Locale[]> {
  const all = await getCollection('journal');
  const locales: Locale[] = ['en', 'ru', 'th', 'he'];
  return locales.filter((locale) => all.some((e) => e.id === `${locale}/${slug}`));
}

export function journalHref(locale: Locale, slug: string): string {
  return localizePath(locale, `/journal/${slug}/`);
}
