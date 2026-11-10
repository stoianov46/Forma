# Integrations

| Integration | State | Where / how to activate |
|---|---|---|
| Lead form → Telegram | Code complete, **not live-tested** (no token) | `functions/api/lead.ts`; set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` in Cloudflare Pages; then send one test enquiry |
| Lead rate limit | Optional | bind KV `LEAD_RATE_LIMIT_KV` |
| Cross-host form endpoint | Optional | `PUBLIC_LEAD_ENDPOINT`, `LEAD_ALLOWED_ORIGINS` |
| Telegram / WhatsApp intake bots | Code complete, separate project | `bots/` (own `package.json`, `.env`, `README.md`, `TEST_PLAN.md`) |
| Email lead delivery / CRM webhook | **Not implemented** (FORMA uses Telegram only; CreativeLAB has email + webhook) | add if wanted; keep secrets in env |
| Google Analytics 4 | Ready, consent-gated, no ID | `PUBLIC_GA4_MEASUREMENT_ID` |
| Yandex Metrica | Ready, consent-gated, no ID | `PUBLIC_YANDEX_METRICA_ID` |
| Search Console / Yandex Webmaster | Not set up | submit `sitemap-index.xml` after deploy |
| Google Business Profile | Owner handles | no profile IDs/ratings in the site |
| Contact facts | Confirmed by owner | `src/lib/site.ts` (phone +66 80 870 5704, shared email, address `PX5R+JX7`…) |
