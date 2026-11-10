import type { Locale } from '../../lib/i18n';
import type { PriceId } from '../pricing';
import type { PriceDetail } from './en';
import en from './en';
import ru from './ru';
import th from './th';
import he from './he';

const byLocale: Record<Locale, Record<PriceId, PriceDetail>> = { en, ru, th, he };

export type { PriceDetail };

/** What a price row includes and excludes (text only; numbers stay in pricing.ts). */
export function getPriceDetail(locale: Locale, id: PriceId): PriceDetail {
  return byLocale[locale][id];
}
