import { Bot, InlineKeyboard, type Context } from 'grammy';
import {
  createLeadState,
  formatLeadForStaff,
  isComplete,
  LOCATIONS,
  PROJECT_TYPES,
  SERVICES,
  type BotLocale,
  type LeadState,
  type LocationSlug,
  type ProjectTypeSlug,
  type ServiceSlug,
} from '../shared/flow';
import { applyStartPayload } from '../shared/deeplink';
import { botStrings, LANGUAGE_BUTTONS, LANGUAGE_PROMPT } from '../shared/i18n';

/**
 * In-memory session store keyed by Telegram chat id.
 *
 * Fine for a single-process deployment at the traffic this intake bot expects.
 * For horizontal scaling or crash-resilience, swap this Map for a shared store
 * (Redis, Cloudflare KV, a small Postgres table) behind the same get/set/delete
 * interface — nothing else in this file needs to change.
 */
const sessions = new Map<number, LeadState>();

function getSession(chatId: number): LeadState {
  const existing = sessions.get(chatId);
  if (existing) return existing;
  const fresh = createLeadState('telegram', String(chatId));
  sessions.set(chatId, fresh);
  return fresh;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const BOT_TOKEN = requireEnv('TELEGRAM_BOT_TOKEN');
const STAFF_CHAT_ID = requireEnv('TELEGRAM_STAFF_CHAT_ID');

export const bot = new Bot(BOT_TOKEN);

function t(state: LeadState) {
  return botStrings[state.locale ?? 'en'];
}

function languageKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  LANGUAGE_BUTTONS.forEach((b, i) => {
    kb.text(b.label, `lang:${b.locale}`);
    if (i % 2 === 1) kb.row();
  });
  return kb;
}

function choiceKeyboard(entries: [string, string][], prefix: string, columns = 2): InlineKeyboard {
  const kb = new InlineKeyboard();
  entries.forEach(([value, label], i) => {
    kb.text(label, `${prefix}:${value}`);
    if (i % columns === columns - 1) kb.row();
  });
  return kb;
}

function reviewSummary(state: LeadState): string {
  const s = t(state);
  const service = state.service ? s.services[state.service] : '—';
  const location = state.location ? s.locations[state.location] : '—';
  const projectType = state.projectType ? s.projectTypes[state.projectType] : '—';
  const contactMethod = state.contactMethod ? s.contactMethods[state.contactMethod] : '—';
  return [
    s.prompts.reviewIntro,
    '',
    `• ${s.prompts.service} ${service}`,
    `• ${s.prompts.location} ${location}`,
    `• ${s.prompts.projectType} ${projectType}`,
    `• ${s.prompts.description} ${state.description ?? '—'}`,
    `• ${s.prompts.budget} ${state.budget ?? '—'}`,
    `• ${s.prompts.timeline} ${state.timeline ?? '—'}`,
    `• Attachments: ${state.attachments.length}`,
    `• ${s.prompts.contactName} ${state.contactName ?? '—'}`,
    `• ${s.prompts.contactMethod} ${contactMethod}`,
    `• ${s.prompts.contactValue} ${state.contactValue ?? '—'}`,
  ].join('\n');
}

async function askService(ctx: Context, state: LeadState) {
  const s = t(state);
  const entries: [string, string][] = SERVICES.map((slug) => [slug, s.services[slug]]);
  await ctx.reply(s.prompts.service, { reply_markup: choiceKeyboard(entries, 'service') });
}

async function askLocation(ctx: Context, state: LeadState) {
  const s = t(state);
  const entries: [string, string][] = LOCATIONS.map((slug) => [slug, s.locations[slug]]);
  await ctx.reply(s.prompts.location, { reply_markup: choiceKeyboard(entries, 'location') });
}

async function askProjectType(ctx: Context, state: LeadState) {
  const s = t(state);
  const entries: [string, string][] = PROJECT_TYPES.map((slug) => [slug, s.projectTypes[slug]]);
  await ctx.reply(s.prompts.projectType, { reply_markup: choiceKeyboard(entries, 'ptype') });
}

async function askContactMethod(ctx: Context, state: LeadState) {
  const s = t(state);
  const entries: [string, string][] = ['telegram', 'whatsapp', 'email', 'phone'].map((m) => [m, s.contactMethods[m as keyof typeof s.contactMethods]]);
  await ctx.reply(s.prompts.contactMethod, { reply_markup: choiceKeyboard(entries, 'method') });
}

async function askReview(ctx: Context, state: LeadState) {
  await ctx.reply(reviewSummary(state));
}

/**
 * Fast-forwards past any step already filled in by a deep-link contextual
 * preselect (`applyStartPayload`) — otherwise the preselect is captured but
 * has no visible effect, which defeats the point of a service/location
 * page's "Start a Project" CTA promising to preselect it. Only skips
 * forward from the start of the flow (service, then location) — it can't
 * skip a required step that hasn't been filled yet.
 */
async function advanceFromLanguage(ctx: Context, state: LeadState) {
  if (!state.service) {
    state.step = 'service';
    await askService(ctx, state);
    return;
  }
  if (!state.location) {
    state.step = 'location';
    await askLocation(ctx, state);
    return;
  }
  state.step = 'projectType';
  await askProjectType(ctx, state);
}

bot.command('start', async (ctx) => {
  const chatId = ctx.chat.id;
  sessions.delete(chatId);
  const state = getSession(chatId);
  const payload = ctx.match?.toString().trim();
  applyStartPayload(state, payload);
  await ctx.reply(LANGUAGE_PROMPT, { reply_markup: languageKeyboard() });
});

bot.command('restart', async (ctx) => {
  const chatId = ctx.chat.id;
  const previousLocale = sessions.get(chatId)?.locale;
  sessions.delete(chatId);
  const state = getSession(chatId);
  state.locale = previousLocale;
  await ctx.reply(previousLocale ? botStrings[previousLocale].restarted : LANGUAGE_PROMPT, {
    reply_markup: previousLocale ? undefined : languageKeyboard(),
  });
  if (previousLocale) await askService(ctx, state);
});

bot.on('callback_query:data', async (ctx) => {
  const chatId = ctx.chat?.id;
  if (!chatId) return;
  const state = getSession(chatId);
  const data = ctx.callbackQuery.data;
  const [kind, value] = data.split(':');
  await ctx.answerCallbackQuery();

  if (kind === 'lang') {
    state.locale = value as BotLocale;
    await advanceFromLanguage(ctx, state);
    return;
  }

  if (kind === 'service' && (SERVICES as readonly string[]).includes(value)) {
    state.service = value as ServiceSlug;
    state.step = 'location';
    await askLocation(ctx, state);
    return;
  }

  if (kind === 'location' && (LOCATIONS as readonly string[]).includes(value)) {
    state.location = value as LocationSlug;
    state.step = 'projectType';
    await askProjectType(ctx, state);
    return;
  }

  if (kind === 'ptype' && (PROJECT_TYPES as readonly string[]).includes(value)) {
    state.projectType = value as ProjectTypeSlug;
    state.step = 'description';
    await ctx.reply(t(state).prompts.description);
    return;
  }

  if (kind === 'method') {
    state.contactMethod = value as LeadState['contactMethod'];
    state.step = 'contactValue';
    await ctx.reply(t(state).prompts.contactValue);
    return;
  }
});

bot.on('message:text', async (ctx) => {
  const chatId = ctx.chat.id;
  const state = getSession(chatId);
  const text = ctx.message.text.trim();
  const s = t(state);
  const lower = text.toLowerCase();

  switch (state.step) {
    case 'description':
      state.description = text;
      state.step = 'budget';
      await ctx.reply(s.prompts.budget);
      return;

    case 'budget':
      state.budget = ['skip', 'пропустить', 'ข้าม', 'דלג'].includes(lower) ? undefined : text;
      state.step = 'timeline';
      await ctx.reply(s.prompts.timeline);
      return;

    case 'timeline':
      state.timeline = ['skip', 'пропустить', 'ข้าม', 'דלג'].includes(lower) ? undefined : text;
      state.step = 'attachments';
      await ctx.reply(s.prompts.attachments);
      return;

    case 'attachments':
      if (['skip', 'done', 'пропустить', 'готово', 'ข้าม', 'เสร็จ', 'דלג', 'סיום'].includes(lower)) {
        state.step = 'contactName';
        await ctx.reply(s.prompts.contactName);
      } else {
        await ctx.reply(s.prompts.attachments);
      }
      return;

    case 'contactName':
      state.contactName = text;
      state.step = 'contactMethod';
      await askContactMethod(ctx, state);
      return;

    case 'contactValue':
      state.contactValue = text;
      state.step = 'review';
      await askReview(ctx, state);
      return;

    case 'review':
      if (['submit', 'отправить', 'ส่ง', 'שלח'].includes(lower)) {
        if (!isComplete(state)) {
          await ctx.reply(s.invalidChoice);
          return;
        }
        state.submittedAt = new Date().toISOString();
        await bot.api.sendMessage(STAFF_CHAT_ID, formatLeadForStaff(state));
        for (const att of state.attachments) {
          if (att.kind === 'photo') await bot.api.sendPhoto(STAFF_CHAT_ID, att.fileId, { caption: att.caption });
          else await bot.api.sendDocument(STAFF_CHAT_ID, att.fileId, { caption: att.caption });
        }
        await ctx.reply(s.submitted);
        state.step = 'done';
        return;
      }
      if (['restart', 'заново', 'เริ่มใหม่', 'התחל מחדש'].includes(lower)) {
        const locale = state.locale;
        sessions.delete(chatId);
        const fresh = getSession(chatId);
        fresh.locale = locale;
        await ctx.reply(locale ? botStrings[locale].restarted : LANGUAGE_PROMPT);
        if (locale) await askService(ctx, fresh);
        return;
      }
      if (['edit', 'изменить', 'แก้ไข', 'ערוך'].includes(lower)) {
        state.step = 'service';
        await askService(ctx, state);
        return;
      }
      await ctx.reply(s.invalidChoice);
      return;

    case 'service':
      // User typed instead of tapping an inline button — re-show the same
      // choice rather than confusingly resetting to language selection.
      await askService(ctx, state);
      return;

    case 'location':
      await askLocation(ctx, state);
      return;

    case 'projectType':
      await askProjectType(ctx, state);
      return;

    case 'contactMethod':
      await askContactMethod(ctx, state);
      return;

    case 'done':
      // A message after a completed submission starts a fresh enquiry.
      sessions.delete(chatId);
      await ctx.reply(LANGUAGE_PROMPT, { reply_markup: languageKeyboard() });
      return;

    default:
      // step === 'language' — no /start seen yet for this chat.
      await ctx.reply(LANGUAGE_PROMPT, { reply_markup: languageKeyboard() });
  }
});

bot.on('message:photo', async (ctx) => {
  const state = getSession(ctx.chat.id);
  if (state.step !== 'attachments') return;
  const largest = ctx.message.photo.at(-1);
  if (largest) state.attachments.push({ fileId: largest.file_id, kind: 'photo', caption: ctx.message.caption });
  await ctx.reply(`📎 ${state.attachments.length} attachment(s) received. Send more, or type "skip" to continue.`);
});

bot.on('message:document', async (ctx) => {
  const state = getSession(ctx.chat.id);
  if (state.step !== 'attachments') return;
  state.attachments.push({ fileId: ctx.message.document.file_id, kind: 'document', caption: ctx.message.caption });
  await ctx.reply(`📎 ${state.attachments.length} attachment(s) received. Send more, or type "skip" to continue.`);
});
