# INDEX — FORMA.in.th

The single entry point for people and AI agents. It lists every doc, every
config/devops file, and every environment variable the project reads.

> **Rule — keep this file current.** Any change that adds, removes or renames an
> env var, touches a config/devops file below, or changes how the project is set
> up or deployed **must** update, in the same change:
> 1. this file (the tables below), and
> 2. the setup docs it affects: `README.md` → "Getting started" / "Deployment",
>    `NOTES.md` → "Running locally", `.env.example` (or `bots/.env.example`).

## Documentation

| File | What it is |
| --- | --- |
| [`README.md`](README.md) | Overview, stack, getting started, **deployment** (Cloudflare Pages + GitHub Pages) |
| [`NOTES.md`](NOTES.md) | Running locally (incl. testing the form with Wrangler), decisions, `[[VERIFY]]` items, pre-launch checklist |
| [`PROGRESS.md`](PROGRESS.md) | Status snapshot and open questions blocking launch |
| [`Improvements.md`](Improvements.md) | Fix/improvement list with per-item status |
| [`proposal.md`](proposal.md) | The original brief |
| [`docs/Index.md`](docs/Index.md) | Team-workflow docs: `WORKFLOW.md`, `HowTo.md`, `Proposals.md`, epics, tasks |
| [`bots/README.md`](bots/README.md) | Telegram/WhatsApp intake bots (separate Node project) |
| [`AGENTS.md`](AGENTS.md) (`CLAUDE.md` is a symlink to it) | Instructions for AI agents |

## Config & devops files

| File | Purpose |
| --- | --- |
| `package.json` / `package-lock.json` | Scripts, dependencies, Node ≥ 22.12 |
| `astro.config.mjs` | Site URL + base path (from `ASTRO_SITE_URL` / `ASTRO_BASE_PATH`), i18n, sitemap, Markdown processor (Sätteri + base-path link plugin) |
| `tsconfig.json` | TypeScript (Astro strict) |
| `src/env.d.ts` | Types for every `PUBLIC_*` env var |
| `.env.example` | Template for site + form-endpoint env vars |
| `bots/.env.example` | Template for the bots' env vars |
| `functions/api/lead.ts` | Cloudflare Pages Function: contact-form intake → Telegram |
| `public/_redirects` | Cloudflare/Netlify redirects (`/services/` → `/`); ignored by GitHub Pages |
| `.github/workflows/ci.yml` | CI: `astro check` + build, bots typecheck |
| `.github/workflows/deploy.yml` | GitHub Pages deploy (sets site/base from the repo name) |
| `.github/workflows/project-status-sync.yml` | Moves board cards on PR open/merge (needs `PROJECT_TOKEN`) |
| `Makefile` | Shortcuts: `make help` lists everything |
| `scripts/qa/*.cjs` | QA: links, meta, JSON-LD, browser (axe, mobile menu) |

## Environment variables

### Build-time (read in Node by `astro.config.mjs`)

Set them as real shell/CI env vars. Vite does **not** load `.env` early enough for these.

| Var | Default | Set it when |
| --- | --- | --- |
| `ASTRO_SITE_URL` | `https://forma.in.th` | Hosting on another origin. `deploy.yml` sets `https://<owner>.github.io` |
| `ASTRO_BASE_PATH` | `/` | Hosting under a subpath. `deploy.yml` sets `/<repo-name>/` |

### Public (baked into the HTML; not secrets)

Set in `.env` locally, or in the host's build env / GitHub repo **Variables**.

| Var | Used by | Notes |
| --- | --- | --- |
| `PUBLIC_LEAD_ENDPOINT` | `ContactForm.astro` | Where the form POSTs. Default `<base>/api/lead`. Set it when the static host has no functions (GitHub Pages). **Never** a Telegram API URL or token |
| `PUBLIC_CONTACT_EMAIL`, `_PHONE`, `_WHATSAPP`, `_TELEGRAM` | `src/lib/site.ts` | Contact details |
| `PUBLIC_CONTACT_ADDRESS_LINE1`, `_LINE2`, `_LOCALITY`, `_REGION`, `_POSTCODE`, `_COUNTRY` | `src/lib/site.ts`, schema.org | Optional postal address |
| `PUBLIC_SOCIAL_LINKS` | schema.org `sameAs` | Comma-separated URLs |
| `PUBLIC_LEGAL_UPDATED_DATE`, `_RETENTION_PERIOD`, `_GOVERNING_LAW` | Legal pages | From a lawyer only; unset shows `[[VERIFY]]` |
| `PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_YANDEX_METRICA_ID` | `Analytics.astro` | Loaded only after consent |

### Server secrets (Cloudflare Pages Function `functions/api/lead.ts`)

Set in the Cloudflare Pages project settings, or `.dev.vars` for `wrangler pages dev`. Never commit them, and never put them in `src/`.

| Var | Required | Notes |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | yes | From @BotFather |
| `TELEGRAM_CHAT_ID` | yes | Chat that receives leads |
| `LEAD_ALLOWED_ORIGINS` | no | Comma-separated origins allowed to POST cross-origin (e.g. `https://drandromeda.github.io`) when the site is hosted elsewhere |
| `LEAD_RATE_LIMIT_KV` | no | KV namespace **binding** for per-IP rate limiting |

### Bots (`bots/.env`)

`TELEGRAM_BOT_TOKEN`, `TELEGRAM_STAFF_CHAT_ID`, `WHATSAPP_ACCESS_TOKEN`,
`WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_PORT`,
`WHATSAPP_STAFF_FORWARD_CHAT_ID`. See `bots/README.md`.

### GitHub Actions

| Name | Kind | Used by |
| --- | --- | --- |
| `GITHUB_TOKEN` | built-in secret | `deploy.yml` (push to `gh-pages`) |
| `PUBLIC_LEAD_ENDPOINT` | repo **variable** (optional) | `deploy.yml` build |
| `PROJECT_TOKEN` | repo secret (classic PAT, `repo` + `project`) | `project-status-sync.yml` |

## Change log (setup / env)

- **2026-09-22** — Contact form no longer calls the Telegram API from the browser
  (a bot token had been hardcoded in client JS). It now POSTs to
  `PUBLIC_LEAD_ENDPOINT` / `/api/lead`. Added `PUBLIC_LEAD_ENDPOINT` and
  `LEAD_ALLOWED_ORIGINS`. `deploy.yml` now sets `ASTRO_SITE_URL` / `ASTRO_BASE_PATH`
  instead of `sed`-rewriting `href`s after the build. Added the
  `@astrojs/markdown-satteri` dependency (base-path link plugin for Markdown).
