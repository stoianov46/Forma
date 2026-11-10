/**
 * Pure lead-intake logic shared by the Cloudflare Pages Function (functions/api/lead.ts) and the
 * mocked test (`npm run contact:check`). No imports, no Cloudflare types: it must run in Workers
 * and in plain Node so it can be tested without sending anything.
 *
 * Delivery channels (each enabled only when its env vars exist; at least one must succeed):
 *   Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *   Email (Resend): RESEND_API_KEY + CONTACT_EMAIL_FROM + CONTACT_EMAIL_TO
 *   CRM / automation webhook: LEAD_WEBHOOK_URL
 */

/** Stable option values (English). The form shows translated labels but submits these values. */
export const PROJECT_TYPES = ['Villa / Residence', 'Hospitality', 'Commercial', 'Renovation', 'Land / New Build', 'Other'] as const;
export const CONTACT_METHODS = ['Email', 'WhatsApp', 'Telegram', 'Phone call'] as const;
export const LAND_STATUSES = ['Own land', 'Looking for land', 'Existing building', 'Not sure'] as const;
export const REPLY_LANGUAGES = ['en', 'ru', 'th', 'he'] as const;

export const MAX_LEN = {
  name: 120,
  email: 180,
  whatsapp: 40,
  projectType: 80,
  service: 80,
  location: 80,
  budget: 80,
  preferredContact: 40,
  message: 4000,
  locale: 5,
  replyLanguage: 5,
  sourceUrl: 500,
  landingPage: 200,
  referrer: 100,
  utm: 100,
  planSummary: 500,
} as const;

export interface LeadEnv {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  LEAD_WEBHOOK_URL?: string;
}

export interface Lead {
  name: string;
  email: string;
  whatsapp: string;
  projectType: string;
  service: string;
  location: string;
  budget: string;
  preferredContact: string;
  message: string;
  locale: string;
  replyLanguage: string;
  landStatus: string;
  /** Summary from the /plan/ tools (estimator or service finder), if the visitor attached it. */
  planSummary: string;
  /** Estimator range in THB (digits only) or ''. */
  estimateMin: string;
  estimateMax: string;
  sourceUrl: string;
  landingPage: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export type ParseResult = { ok: true; lead: Lead } | { ok: false; status: number; error: string };
type Getter = (key: string) => unknown;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9-]{1,80}$/;
// Control characters are stripped (message-splitting / log / header injection). Only the free-text
// message keeps line breaks (\n); every other field is forced onto a single line.
const CONTROL_RE = /[\u0000-\u0008\u000B-\u001F\u007F]/g;

export function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== 'string') return '';
  const text = multiline ? value.replace(/\r\n?/g, '\n') : value.replace(/[\r\n]+/g, ' ');
  return text.replace(CONTROL_RE, '').trim().slice(0, max);
}

/** Digits only, at most 12 (a THB amount), else ''. */
function digits(value: unknown): string {
  const v = clean(value, 20);
  return /^\d{1,12}$/.test(v) ? v : '';
}

export function isHoneypot(get: Getter): boolean {
  return clean(get('company'), 200).length > 0;
}

/** Validates and whitelists a submission. `get` reads a form field by name. */
export function parseLead(get: Getter): ParseResult {
  const locale = REPLY_LANGUAGES.includes(clean(get('locale'), MAX_LEN.locale) as never) ? clean(get('locale'), MAX_LEN.locale) : 'en';
  const replyRaw = clean(get('replyLanguage'), MAX_LEN.replyLanguage);
  const lead: Lead = {
    name: clean(get('name'), MAX_LEN.name),
    email: clean(get('email'), MAX_LEN.email),
    whatsapp: clean(get('whatsapp'), MAX_LEN.whatsapp),
    projectType: clean(get('projectType'), MAX_LEN.projectType),
    service: clean(get('service'), MAX_LEN.service),
    location: clean(get('location'), MAX_LEN.location),
    budget: clean(get('budget'), MAX_LEN.budget),
    preferredContact: clean(get('preferredContact'), MAX_LEN.preferredContact),
    message: clean(get('message'), MAX_LEN.message, true),
    locale,
    replyLanguage: REPLY_LANGUAGES.includes(replyRaw as never) ? replyRaw : locale,
    landStatus: clean(get('landStatus'), 40),
    planSummary: clean(get('planSummary'), MAX_LEN.planSummary),
    estimateMin: digits(get('estimateMin')),
    estimateMax: digits(get('estimateMax')),
    sourceUrl: clean(get('sourceUrl'), MAX_LEN.sourceUrl),
    landingPage: clean(get('landingPage'), MAX_LEN.landingPage),
    referrer: clean(get('referrer'), MAX_LEN.referrer),
    utm_source: clean(get('utm_source'), MAX_LEN.utm),
    utm_medium: clean(get('utm_medium'), MAX_LEN.utm),
    utm_campaign: clean(get('utm_campaign'), MAX_LEN.utm),
    utm_content: clean(get('utm_content'), MAX_LEN.utm),
    utm_term: clean(get('utm_term'), MAX_LEN.utm),
  };
  if (!lead.name || !lead.email || !lead.projectType || lead.message.length < 10) return { ok: false, status: 422, error: 'invalid_fields' };
  if (!EMAIL_RE.test(lead.email)) return { ok: false, status: 422, error: 'invalid_email' };
  if (!(PROJECT_TYPES as readonly string[]).includes(lead.projectType)) return { ok: false, status: 422, error: 'invalid_option' };
  if (lead.preferredContact && !(CONTACT_METHODS as readonly string[]).includes(lead.preferredContact)) return { ok: false, status: 422, error: 'invalid_option' };
  if (lead.landStatus && !(LAND_STATUSES as readonly string[]).includes(lead.landStatus)) return { ok: false, status: 422, error: 'invalid_option' };
  if ((lead.service && !SLUG_RE.test(lead.service)) || (lead.location && !SLUG_RE.test(lead.location))) return { ok: false, status: 422, error: 'invalid_option' };
  return { ok: true, lead };
}


/**
 * Largest THB amount mentioned in a free-text budget ("5 million", "฿5,000,000", "3-4M", "5 млн", "5 ล้าน").
 * Returns null when no amount is found or the budget is given in another currency (no exchange rate is assumed).
 */
export function parseBudgetThb(text: string): number | null {
  const raw = text.toLowerCase();
  if (/[$€£]|\busd\b|\beur\b|\bgbp\b|доллар|евро|דולר|ดอลลาร์/.test(raw)) return null;
  const t = raw.replace(/(\d)[,\u00a0\u202f ](?=\d{3}\b)/g, '$1');
  const re = /(\d+(?:\.\d+)?)\s*(million|mln|mn|m\b|млн|ล้าน|מיליון|thousand|k\b|тыс|พัน)?/g;
  let best: number | null = null;
  for (const m of t.matchAll(re)) {
    const unit = m[2] ?? '';
    const mult = /^(million|mln|mn|m|млн|ล้าน|מיליון)$/.test(unit) ? 1_000_000 : /^(thousand|k|тыс|พัน)$/.test(unit) ? 1_000 : 1;
    const value = Number(m[1]) * mult;
    if (value >= 100_000 && (best === null || value > best)) best = value;
  }
  return best;
}

export interface Qualification {
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  score: number;
  reasons: string[];
}

/** Transparent lead scoring for staff: every point has a stated reason. Not shown to the visitor. */
export function qualify(lead: Lead): Qualification {
  let score = 0;
  const reasons: string[] = [];
  const add = (n: number, why: string) => { score += n; reasons.push(`${n > 0 ? '+' : ''}${n} ${why}`); };
  if (lead.landStatus === 'Own land') add(2, 'owns land');
  else if (lead.landStatus === 'Existing building') add(1, 'has an existing building');
  if (lead.whatsapp) add(1, 'phone/WhatsApp given');
  if (lead.service) add(1, 'service chosen');
  if (lead.location) add(1, 'location chosen');
  if (lead.message.length >= 200) add(1, 'detailed brief');
  if (lead.budget) add(1, 'budget given');
  if (lead.estimateMin) add(1, 'used the cost estimator');
  const budget = lead.budget ? parseBudgetThb(lead.budget) : null;
  const estMin = lead.estimateMin ? Number(lead.estimateMin) : 0;
  if (budget && estMin) {
    if (budget >= estMin * 0.8) add(2, 'budget in line with the estimate');
    else if (budget < estMin * 0.5) add(-1, 'budget well below the estimate');
    else reasons.push('0 budget somewhat below the estimate');
  }
  return { priority: score >= 6 ? 'HIGH' : score >= 3 ? 'NORMAL' : 'LOW', score, reasons };
}

/** Plain-text staff message (Telegram and email body). */
export function leadText(lead: Lead, now: Date = new Date()): string {
  const qual = qualify(lead);
  const est = lead.estimateMin ? `Estimator range: THB ${Number(lead.estimateMin).toLocaleString('en-US')}–${Number(lead.estimateMax || lead.estimateMin).toLocaleString('en-US')}` : '';
  const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign].some(Boolean) ? `UTM source/medium/campaign: ${lead.utm_source} / ${lead.utm_medium} / ${lead.utm_campaign}` : '';
  return [
    `🏗 New project enquiry — forma.in.th — priority ${qual.priority} (score ${qual.score})`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.whatsapp && `WhatsApp/Phone: ${lead.whatsapp}`,
    `Project type: ${lead.projectType}`,
    lead.service && `Service: ${lead.service}`,
    lead.location && `Location: ${lead.location}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.landStatus && `Land: ${lead.landStatus}`,
    lead.preferredContact && `Preferred contact: ${lead.preferredContact}`,
    `Reply in: ${lead.replyLanguage} (page language: ${lead.locale})`,
    est,
    lead.planSummary && `Plan tool: ${lead.planSummary}`,
    '',
    'Message:',
    lead.message,
    '',
    lead.sourceUrl && `Source: ${lead.sourceUrl}`,
    lead.landingPage && `First landing page: ${lead.landingPage}${lead.referrer ? ` (from ${lead.referrer})` : ''}`,
    utm,
    `Why this priority: ${qual.reasons.join('; ') || 'no signals'}`,
    `Submitted: ${now.toISOString()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export interface DeliveryResult {
  /** Channels that are configured (have all their env vars). */
  configured: string[];
  succeeded: string[];
  failed: string[];
}

type FetchLike = (input: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ ok: boolean; status: number }>;

/** Sends the lead through every configured channel. Never throws; failures are reported, not logged with secrets. */
export async function deliver(env: LeadEnv, lead: Lead, fetchImpl: FetchLike, now: Date = new Date()): Promise<DeliveryResult> {
  const text = leadText(lead, now);
  const jobs: { name: string; run: () => Promise<{ ok: boolean }> }[] = [];
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    jobs.push({
      name: 'telegram',
      run: () =>
        fetchImpl(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
        }),
    });
  }
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL_FROM && env.CONTACT_EMAIL_TO) {
    jobs.push({
      name: 'email',
      run: () =>
        fetchImpl('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: env.CONTACT_EMAIL_FROM,
            to: [env.CONTACT_EMAIL_TO],
            reply_to: lead.email,
            subject: `[${qualify(lead).priority}] New enquiry: ${lead.projectType} — ${lead.name}`.replace(/[\r\n]+/g, ' ').slice(0, 200),
            text,
          }),
        }),
    });
  }
  if (env.LEAD_WEBHOOK_URL) {
    jobs.push({
      name: 'webhook',
      run: () =>
        fetchImpl(env.LEAD_WEBHOOK_URL as string, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ source: 'forma.in.th', submittedAt: now.toISOString(), lead, qualification: qualify(lead), text }),
        }),
    });
  }
  const outcome = await Promise.all(
    jobs.map(async (j) => {
      try {
        return { name: j.name, ok: (await j.run()).ok };
      } catch {
        return { name: j.name, ok: false };
      }
    }),
  );
  return { configured: jobs.map((j) => j.name), succeeded: outcome.filter((o) => o.ok).map((o) => o.name), failed: outcome.filter((o) => !o.ok).map((o) => o.name) };
}
