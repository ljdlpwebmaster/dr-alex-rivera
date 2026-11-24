/**
 * robots.txt, generated at build time.
 * Production allows crawling and points to the sitemap. Cloudflare Pages
 * preview branches disallow everything, matching the robots meta tag.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const branch = process.env.CF_PAGES_BRANCH;
  const isPreviewBuild = Boolean(branch && branch !== 'main');

  const body = isPreviewBuild
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
