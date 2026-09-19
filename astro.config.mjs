// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Deployment target is env-configurable (build-time only — this file runs in Node,
// not the browser, so plain process.env is correct here, unlike the PUBLIC_* runtime
// vars used elsewhere in src/). Set these as real shell/CI environment variables (e.g.
// your CI workflow's `env:` block, or the hosting provider's build-settings UI) — NOT
// in .env/.env.local, since those files are loaded by Vite for application code and
// are never read into process.env this early, before this config file runs.
// Defaults to Cloudflare Pages on the real domain, which is what functions/api/lead.ts
// (the contact-form backend) and public/_redirects (the /services/ redirect) both
// require — neither works on GitHub Pages, which has no serverless functions and
// ignores _redirects entirely. Only override these if you've deliberately switched
// hosts AND replaced those two Cloudflare-specific pieces — see NOTES.md "Hosting".
const SITE_URL = process.env.ASTRO_SITE_URL || 'https://forma.in.th';
const BASE_PATH = process.env.ASTRO_BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  base: BASE_PATH,
  site: SITE_URL,
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'ru', 'th', 'he'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ru: 'ru',
          th: 'th',
          he: 'he',
        },
      },
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
