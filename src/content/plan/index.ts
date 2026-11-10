import type { Locale } from '../../lib/i18n';
import type { PlanContent } from './types';
import { planEn } from './en';
import { planRu } from './ru';
import { planTh } from './th';
import { planHe } from './he';

const byLocale: Record<Locale, PlanContent> = { en: planEn, ru: planRu, th: planTh, he: planHe };

export function getPlanContent(locale: Locale): PlanContent {
  return byLocale[locale];
}
