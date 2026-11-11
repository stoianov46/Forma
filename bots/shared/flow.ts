/**
 * Shared project-intake state machine used by both the Telegram and WhatsApp bots.
 * Mirrors the original brief §15 BOT: Language → Service → Location → Project Type →
 * Description → Budget(optional) → Timeline(optional) → Photos/files → Contact →
 * Review/Edit → Submit → Human handoff. Kept framework-agnostic (no Telegram/WhatsApp
 * SDK imports) so both channel adapters drive the same logic.
 */

export type BotLocale = 'en' | 'ru' | 'th' | 'he';

export const BOT_LOCALES: BotLocale[] = ['en', 'ru', 'th', 'he'];

/** Must stay in exact parity with src/content/services — the original brief §15 BOT. */
export const SERVICES = [
  'architecture',
  'villa-design',
  'interior-design',
  'construction',
  'renovation',
  'project-management',
  'construction-supervision',
  'technical-supervision',
  'landscape-design',
  'permits-planning',
  'turnkey-projects',
  'eco-construction',
  'concrete-construction',
] as const;
export type ServiceSlug = (typeof SERVICES)[number];

/** Must stay in exact parity with src/content/locations primary tier + "other". */
export const LOCATIONS = ['koh-phangan', 'koh-samui', 'koh-tao', 'bali', 'other'] as const;
export type LocationSlug = (typeof LOCATIONS)[number];

export const PROJECT_TYPES = ['villa-residence', 'hospitality', 'commercial', 'renovation', 'land-new-build', 'other'] as const;
export type ProjectTypeSlug = (typeof PROJECT_TYPES)[number];

export const CONTACT_METHODS = ['telegram', 'whatsapp', 'email', 'phone'] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type Step =
  | 'language'
  | 'service'
  | 'location'
  | 'projectType'
  | 'description'
  | 'budget'
  | 'timeline'
  | 'attachments'
  | 'contactName'
  | 'contactMethod'
  | 'contactValue'
  | 'review'
  | 'done';

export const STEP_ORDER: Step[] = [
  'language',
  'service',
  'location',
  'projectType',
  'description',
  'budget',
  'timeline',
  'attachments',
  'contactName',
  'contactMethod',
  'contactValue',
  'review',
  'done',
];

export interface Attachment {
  /** Channel-native file id (Telegram file_id or WhatsApp media id) — resolved to a URL at submit time. */
  fileId: string;
  kind: 'photo' | 'document';
  caption?: string;
}

export interface LeadState {
  channel: 'telegram' | 'whatsapp';
  chatId: string;
  step: Step;
  locale?: BotLocale;
  service?: ServiceSlug;
  location?: LocationSlug;
  projectType?: ProjectTypeSlug;
  description?: string;
  budget?: string; // free text — "skip" allowed
  timeline?: string; // free text — "skip" allowed
  attachments: Attachment[];
  contactName?: string;
  contactMethod?: ContactMethod;
  contactValue?: string;
  sourceUrl?: string; // set when the bot was opened via a service/location page's contextual CTA
  utmSource?: string;
  utmCampaign?: string;
  startedAt: string;
  submittedAt?: string;
}

export function createLeadState(channel: LeadState['channel'], chatId: string): LeadState {
  return {
    channel,
    chatId,
    step: 'language',
    attachments: [],
    startedAt: new Date().toISOString(),
  };
}

export function stepIndex(step: Step): number {
  return STEP_ORDER.indexOf(step);
}

/** Steps a user can freely skip by sending "skip" / pressing a Skip button. */
export const SKIPPABLE_STEPS: Step[] = ['budget', 'timeline', 'attachments'];

export function previousStep(step: Step): Step {
  const idx = stepIndex(step);
  return STEP_ORDER[Math.max(0, idx - 1)];
}

export function nextStep(step: Step): Step {
  const idx = stepIndex(step);
  return STEP_ORDER[Math.min(STEP_ORDER.length - 1, idx + 1)];
}

/** Renders the completed lead as a single structured message for the staff intake chat. */
export function formatLeadForStaff(state: LeadState): string {
  const lines = [
    `🏗 New ${state.channel} project enquiry`,
    `Language: ${state.locale ?? 'unknown'}`,
    `Service: ${state.service ?? '—'}`,
    `Location: ${state.location ?? '—'}`,
    `Project type: ${state.projectType ?? '—'}`,
    `Budget: ${state.budget ?? 'not provided'}`,
    `Timeline: ${state.timeline ?? 'not provided'}`,
    '',
    'Description:',
    state.description ?? '—',
    '',
    `Contact: ${state.contactName ?? '—'} via ${state.contactMethod ?? '—'} (${state.contactValue ?? '—'})`,
    `Attachments: ${state.attachments.length}`,
    state.sourceUrl ? `Source: ${state.sourceUrl}` : undefined,
    state.utmSource ? `UTM source/campaign: ${state.utmSource} / ${state.utmCampaign ?? '—'}` : undefined,
    `Channel chat id: ${state.chatId}`,
    `Started: ${state.startedAt}`,
    `Submitted: ${state.submittedAt ?? new Date().toISOString()}`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function isComplete(state: LeadState): boolean {
  return Boolean(
    state.locale && state.service && state.location && state.projectType && state.description && state.contactName && state.contactMethod && state.contactValue,
  );
}
