# FORMA.in.th

Premium architecture and design-build studio website for Koh Phangan, Thailand — a static
Astro site covering 13 services, 11 locations, a project portfolio, journal, and a
multilingual (EN/RU/TH/HE) shell, plus standalone Telegram/WhatsApp project-intake bots.

Built from the brief in `proposal.md`. See [`PROGRESS.md`](./PROGRESS.md) for a current
status snapshot and open questions, and `NOTES.md` for full decision/verification detail.

## Stack

- **[Astro](https://astro.build)**, static output (`output: 'static'`) — no server, no
  database, no CMS/admin. Chosen specifically because it produces close-to-zero client JS
  by default, has first-class image optimization (`astro:assets`), and its built-in content
  collections and i18n routing map cleanly onto the site's multilingual, content-heavy
  structure — better fits here than a general-purpose SPA framework or hand-rolled static
  HTML at this many pages/languages.
- **Tailwind CSS v4** for the design system (tokens defined in `src/styles/global.css`).
- **Content is data, not a CMS**: services/locations/projects live as typed TypeScript
  objects under `src/content/*/en.ts` (+ `ru.ts`/`th.ts`/`he.ts` siblings); journal articles
  are Markdown under `src/content/journal/<locale>/`, read via an Astro content collection.
  Editing content means editing these files directly — see "Content model" below.
- **Cloudflare Pages Functions** (`functions/api/lead.ts`) for the one piece of real
  server-side logic the site needs: receiving the contact form and forwarding it to
  Telegram. Keeps the rest of the site 100% static.
- **`bots/`** is a separate, standalone Node/TypeScript project (own `package.json`) for
  the Telegram and WhatsApp intake bots — see `bots/README.md`. It is not part of the
  Astro build.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build       # production build to ./dist
npm run preview     # serve the production build locally
npm run check       # astro check — type errors across .astro files
```

Requires Node ≥ 22.12 (see `engines` in `package.json`).

## Project structure

```
src/
  components/
    blocks/     Reusable page sections — Hero, ServiceGrid, FAQAccordion, CTABanner, ...
    layout/     Header, Footer, Breadcrumbs, LanguageSwitcher, CookieConsent
    seo/        BaseHead (meta/hreflang/OG), JsonLd (schema.org script renderer)
    ui/         Button and other small primitives
  content/
    services/   13 services — en.ts (canonical) + ru/th/he.ts (translations, currently empty)
    locations/  11 locations — same pattern
    projects/   6 representative concept-study projects — same pattern
    journal/    Markdown articles under en/ (add ru/ th/ he/ folders as translated)
    home/, about/, process/, legal/   Page-specific copy, same en.ts + locale-override pattern
  i18n/
    dictionary.ts   All UI strings (nav, footer, forms, homepage) — fully translated in all 4 languages
  layouts/
    BaseLayout.astro   Wraps every page: <html lang/dir>, header, footer, cookie banner, schema
  templates/    One template per page type (HomePage, ServicePage, LocationPage, ...),
                rendered by thin route files in src/pages/
  pages/
    *.astro                     English routes (canonical, unprefixed URLs)
    [locale]/*.astro            Russian/Thai/Hebrew routes, generated only where translated content exists
  lib/          Shared logic: i18n helpers, schema.org builders, image map, site constants
functions/api/lead.ts   Cloudflare Pages Function backing the contact form
bots/                   Standalone Telegram + WhatsApp intake bots (see bots/README.md)
```

## Content model & the translation gating pattern

Every translatable content type (services, locations, projects, about, process, home) is
split into an English `en.ts` (canonical, complete) and empty `ru.ts`/`th.ts`/`he.ts`
sibling files with the same shape. **A locale's page for a given item is only generated
once its translation file actually has an entry for that slug** — see `hasServiceTranslation`,
`hasLocationTranslation`, `hasProjectTranslation`, `isAboutTranslated`, `isProcessTranslated`
in the relevant `content/*/index.ts`, and the `getStaticPaths()` in each
`src/pages/[locale]/.../*.astro` route file.

This is deliberate: it is the mechanism that keeps the site honest while translation work
is in progress. A partially translated site should never silently serve English content
under a `/ru/`, `/th/` or `/he/` URL — that reads as a language bug to a user and as
thin/duplicate content to search engines. Instead:

- Pages with no translation yet simply don't exist for that locale (no route is generated).
- Every internal link uses a `*Smart` href helper (`serviceHrefSmart`, `locationHrefSmart`,
  `projectHrefSmart`) that links to the translated page if one exists, and falls back to the
  canonical English page otherwise — never to a 404.
- `hreflang` alternates and the language switcher (`availableLocales` prop, threaded from
  each template into `BaseLayout` → `BaseHead` / `Header`) only list locales that actually
  have that exact page.

**To add a translation**: open e.g. `src/content/services/ru.ts` and add a complete entry
for a slug, matching the `ServiceTranslation` shape in `src/lib/types.ts` exactly (partial
objects are not supported — a service's RU page must be fully translated, not partially, to
avoid mixed-language pages). The corresponding `/ru/services/<slug>/` route and its
hreflang/nav links then appear automatically on the next build. Journal articles work the
same way but as files: add `src/content/journal/ru/<same-slug>.md`.

## What's translated today

- **All 4 languages, fully**: navigation, footer, forms, homepage (including hero, why-us,
  process overview) — see `src/i18n/dictionary.ts` and `src/content/home/*.ts`.
- **English only**: all 13 service pages, all 11 location pages, the 6 project pages, the
  6 journal articles, About, Process, and all legal pages. See `NOTES.md` for the translation
  backlog and recommended approach (professional human translation per proposal.md §13 —
  "Do not machine-translate blindly").

## Deployment

The site builds to fully static HTML/CSS/JS/images in `dist/` — deployable to any static
host (Cloudflare Pages, Netlify, Vercel static, S3+CDN). It was built with **Cloudflare
Pages** in mind specifically because its Pages Functions let `functions/api/lead.ts` run
alongside a 100% static Astro build with zero extra infrastructure:

1. Connect the repo, build command `npm run build`, output directory `dist`.
2. Set the environment variables in `.env.example` in the Pages project settings.
3. Deploy the `bots/` project separately (see `bots/README.md`) — it is not part of this
   build and runs as its own always-on process.

### GitHub Pages (`.github/workflows/deploy.yml`)

Every push to `main` builds and publishes to the `gh-pages` branch. The workflow sets
`ASTRO_SITE_URL=https://<owner>.github.io` and `ASTRO_BASE_PATH=/<repo-name>/`, so every
link, asset, canonical and sitemap URL gets the subpath. Nothing is rewritten after the
build. GitHub Pages has no serverless functions, and it ignores `public/_redirects`:

- **Contact form:** run `functions/api/lead.ts` somewhere that has functions (e.g. a
  Cloudflare Pages project) with `LEAD_ALLOWED_ORIGINS=https://<owner>.github.io`, then set
  the repo **variable** `PUBLIC_LEAD_ENDPOINT` to its URL (e.g.
  `https://forma.pages.dev/api/lead`). Without it, the form shows its error state.
- **Never** put a Telegram bot token in `src/`. Everything there ships to the browser.

Every env var, config file and CI secret is listed in [`INDEX.md`](INDEX.md).

## Team workflow

Work is tracked as GitHub Issues (Epics/Tasks/Bugs) on one Project board, with branches and
PRs bound to issues by number. Full reference: **[`docs/Index.md`](docs/Index.md)** (start
there), or run `make help` for every available command.

```bash
make board-setup                                    # one-time
make task-new TITLE="..." EPIC=<n> PRIORITY=P1       # file a task
make task-start TASK=<n>                             # branch + board card → In Progress
gh pr create --title "..." --body "Closes #<n>\n\n..."
```

See `docs/WORKFLOW.md` for how it fits together and `docs/HowTo.md` for the exact commands,
step by step.

## Documentation

- **[`INDEX.md`](INDEX.md)** — start here: every doc, config/devops file and env var.
- `docs/Index.md` — navigation hub for everything below, plus this README and `NOTES.md`.
- `docs/WORKFLOW.md` / `docs/HowTo.md` — the team workflow (Issues + Projects board).
- `NOTES.md` — assumptions made, every `[[VERIFY]]` item, content inventory, and the
  pre-launch QA checklist.
- `proposal.md` — the original brief this site was built from.
- `bots/README.md` — Telegram/WhatsApp bot setup.
