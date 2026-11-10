import type { Locale } from '../../lib/i18n';
import { CONTACT, LEGAL } from '../../lib/site';
import type { LegalContent } from './types';
import { legalEn } from './en';
import { legalRu } from './ru';
import { legalTh } from './th';
import { legalHe } from './he';

const byLocale: Record<Locale, LegalContent> = { en: legalEn, ru: legalRu, th: legalTh, he: legalHe };

export function getLegalContent(locale: Locale): LegalContent {
  return byLocale[locale];
}

/** Fills {email}, {retention} and {governingLaw}. The latter two stay "[[VERIFY…]]" until counsel supplies them. */
export function fillLegal(text: string): string {
  return text.replace('{email}', CONTACT.email).replace('{retention}', LEGAL.retentionPeriod).replace('{governingLaw}', LEGAL.governingLaw);
}

export function lastUpdated(locale: Locale): string {
  return `${byLocale[locale].updatedLabel} ${LEGAL.updatedDate}`;
}
