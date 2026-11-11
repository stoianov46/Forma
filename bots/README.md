# FORMA intake bots

Structured project-intake bots for Telegram and WhatsApp, implementing the flow specified in
the original brief §15 BOT:

```
Language → Service → Location → Project Type → Description → Budget (optional) →
Timeline (optional) → Photos/files → Contact → Review/Edit → Submit → Human handoff
```

These are **not** generic AI chatbots — every step is a fixed, structured question with a
known set of valid answers (or free text where the flow calls for it), and a completed
enquiry is forwarded verbatim to a human intake chat. There is no LLM in this loop.

This is a standalone Node/TypeScript project, intentionally separate from the Astro site's
build (`npm run build` at the repo root does not touch this directory). Deploy it as a small
always-on Node process (a VPS, Fly.io, Render, Railway, etc.) — the site itself stays fully
static and does not depend on these bots being online.

## Setup

```bash
cd bots
npm install
cp .env.example .env   # then fill in real values
```

### Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the token into
   `TELEGRAM_BOT_TOKEN`.
2. Add the bot to your internal staff group/channel and set `TELEGRAM_STAFF_CHAT_ID` to that
   chat's id (a negative number for groups/channels).
3. Run it:
   ```bash
   npm run telegram        # watch mode, for development
   npm run telegram:start  # single run, for production (use a process manager — pm2, systemd)
   ```

This runs in **long-polling** mode — no public URL or webhook configuration required. It is
the simplest way to run a single-instance intake bot.

### WhatsApp

1. Create a Meta developer app with the WhatsApp product, following
   [Cloud API getting started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).
2. Fill in `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and choose your own
   `WHATSAPP_VERIFY_TOKEN`.
3. Run it behind a public HTTPS URL (a reverse proxy, tunnel, or your hosting provider's
   ingress):
   ```bash
   npm run whatsapp        # watch mode
   npm run whatsapp:start  # production, behind a process manager
   ```
4. In the Meta app dashboard, configure the webhook URL as `https://<your-domain>/webhook`
   with the same verify token, and subscribe to the `messages` field.
5. Optionally set `WHATSAPP_STAFF_FORWARD_CHAT_ID` (plus `TELEGRAM_BOT_TOKEN`) to forward
   completed WhatsApp leads into the same Telegram staff chat as Telegram leads, for one
   unified intake inbox. Without it, completed leads are only logged to the process's
   stdout — wire in your own CRM/webhook call in `submitLead()` (`bots/whatsapp/webhook.ts`)
   as needed.

## Architecture

- `shared/flow.ts` — the channel-agnostic state machine: steps, valid values for each
  choice (kept in parity with `src/content/services` and `src/content/locations` on the
  site), and the lead data shape.
- `shared/i18n.ts` — all bot copy in English, Russian, Thai and Hebrew.
- `telegram/` — a [grammY](https://grammy.dev) bot using inline keyboards for choice steps
  and free text for open questions. Runs via long polling.
- `whatsapp/` — an Express webhook implementing the same flow using WhatsApp Cloud API
  interactive list/button messages, with numbered-reply fallback for language selection.

## Session storage

Both channels currently keep conversation state in an in-memory `Map` keyed by chat/contact
id (see the `sessions` map near the top of `telegram/bot.ts` and `whatsapp/webhook.ts`).
This is correct and simple for a single Node process at the traffic an intake bot expects,
but:

- state is lost on process restart (an in-progress enquiry has to start over — completed
  enquiries are already delivered to the staff chat by that point, so nothing is lost there);
- it does not work if you ever run more than one instance behind a load balancer.

To harden this before a high-traffic launch, swap the `Map` for a shared store (Redis,
Cloudflare KV, or a small database table) behind the same `get`/`set` shape — no other code
needs to change.

## Contextual preselect from the website

Service and location pages on the site link to the bot with a contextual preselect
(the original brief "CONTEXTUAL CTA"):

- **Telegram**: a deep link `https://t.me/<bot_username>?start=service_villa-design` (or
  `start=location_koh-phangan`) is parsed in `bot.command('start', ...)` via
  `applyStartPayload()`, and `advanceFromLanguage()` (called right after language
  selection) skips straight past whichever step is already filled in — so a
  service-preselected link goes straight to the location prompt, not back through
  service selection.
- **WhatsApp**: WhatsApp has no equivalent deep-link start-parameter mechanism from a plain
  link — instead, the "Start a Project" CTA on service/location pages should launch a
  `wa.me` link with a pre-filled text template (e.g. `wa.me/<number>?text=Villa%20Design`)
  and `handleMessage()` can be extended to parse a recognized opening phrase the same way.
  This is not yet wired up — see NOTES.md.

## Testing

**`TEST_PLAN.md`** is the step-by-step manual test — everything below is
still unverified against a real Telegram/WhatsApp conversation until
someone actually runs through it (no live credentials exist in the
environment that built this).

## Known gaps before launch

- No persistent session storage (see above).
- WhatsApp media (`getMediaUrl`) returns a Meta-hosted URL that expires — for a permanent
  record, download and re-upload attachments to your own storage before forwarding.
- `express`'s transitive `qs` dependency has an open moderate-severity advisory as of this
  writing (`npm audit`); an Express major-version upgrade resolves it but is a breaking
  change deliberately left for a dedicated hardening pass rather than made under time
  pressure here.
- Rate limiting / abuse protection on the WhatsApp webhook endpoint is not implemented.
