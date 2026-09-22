/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Optional build-time overrides for real business/legal facts — see
   * `src/lib/site.ts` and `.env.example`. All are baked into the static
   * HTML at build time (this is a static site, `output: 'static'`), so
   * these are never secrets — just a way to update public facts (a phone
   * number, a governing-law clause) via a hosting-provider env var and a
   * rebuild, instead of a source-code edit, once real values exist.
   */
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CONTACT_PHONE?: string;
  readonly PUBLIC_CONTACT_WHATSAPP?: string;
  readonly PUBLIC_CONTACT_TELEGRAM?: string;
  /** Street address, line 1 (e.g. "123 Moo 4") — optional; omitted from schema if unset. */
  readonly PUBLIC_CONTACT_ADDRESS_LINE1?: string;
  readonly PUBLIC_CONTACT_ADDRESS_LINE2?: string;
  readonly PUBLIC_CONTACT_ADDRESS_LOCALITY?: string;
  readonly PUBLIC_CONTACT_ADDRESS_REGION?: string;
  readonly PUBLIC_CONTACT_ADDRESS_POSTCODE?: string;
  readonly PUBLIC_CONTACT_ADDRESS_COUNTRY?: string;
  /** Comma-separated list of social profile URLs (schema.org `sameAs`). */
  readonly PUBLIC_SOCIAL_LINKS?: string;
  readonly PUBLIC_LEGAL_UPDATED_DATE?: string;
  readonly PUBLIC_LEGAL_RETENTION_PERIOD?: string;
  readonly PUBLIC_LEGAL_GOVERNING_LAW?: string;
  /** Analytics — see src/components/layout/Analytics.astro. Unset = no script loads at all. */
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_YANDEX_METRICA_ID?: string;
  /** Contact-form intake URL. Unset = the Cloudflare Pages Function at /api/lead. Never a Telegram API URL. */
  readonly PUBLIC_LEAD_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
