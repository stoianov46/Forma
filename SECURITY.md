# Security notes

- **Secrets** live only in the host's environment (Cloudflare Pages dashboard): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. They are read server-side in `functions/api/lead.ts` and are never sent to the browser; `PUBLIC_*` variables are baked into public HTML and must never hold secrets. `.env` files are not committed (`.env.example` documents names only).
- **Contact form → `/api/lead`** (Cloudflare Pages Function, logic in `functions/_lib/lead-core.ts`): validates each field, whitelists option values, strips control characters (header/log injection), limits lengths, honeypot, forwards to Telegram / Resend email / webhook. Covered by `npm run contact:check` (mocked; also asserts no secrets or delivery APIs in `dist/`). Optional per-IP rate limiting through the `LEAD_RATE_LIMIT_KV` binding (skipped when not bound). Cross-origin POSTs are rejected unless the origin is listed in `LEAD_ALLOWED_ORIGINS`.
- **Static site**: no server adapter, no database, no user accounts.
- **Consent**: analytics (`Analytics.astro`) loads only after consent and only when an ID is configured; none is configured now.
- **Truth rule as a safeguard**: concept projects are labelled and checked by `seo-audit`; no invented credentials, reviews or prices (prices are drafts, never in schema).
- **Open items** (not verified here): HTTP security headers and CSP on the production host, bot-token rotation after hosting, dependency audit (`npm audit`) — not run in this pass.
- Telegram/WhatsApp bots in `bots/` are a separate Node project with their own `.env`; see `bots/README.md`. They duplicate code with CreativeLAB's bots; any security fix must be applied in both.
