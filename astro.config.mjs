// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The production URL. Change it here only: canonical links, Open Graph,
// JSON-LD and the sitemap all read from `site`.
const SITE_URL = 'https://dr-alex-rivera.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // Inline small stylesheets to save a request on first paint.
    inlineStylesheets: 'auto',
  },
});
