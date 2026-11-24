# Dr Alex Rivera: one-page website

A one-page website for Dr Alex Rivera, a fictional clinical psychologist and trainer, built with [Astro](https://astro.build) as a static site.

- **Live site:** https://dr-alex-rivera-lz4.pages.dev/
- **Stack:** Astro 7 (static output), TypeScript, plain scoped CSS. No JavaScript is needed to read the page; one small inline script adds scroll reveals as an enhancement
- **Hosting:** Cloudflare Pages, deployed from `main`

## Quick start

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm test           # build, then validate the generated HTML
```

## Project structure

```
src/
  content/site.ts            All copy, course data and alt text (single source of truth)
  lib/structured-data.ts     Builds the JSON-LD graph from the content model
  layouts/BaseLayout.astro   <head>: title, meta description, canonical, Open Graph, favicons, JSON-LD
  components/
    SiteHeader.astro         Sticky header with in-page navigation
    Hero.astro               Name (h1), title and photo
    About.astro              Bio
    Courses.astro            Course list
    CourseCard.astro         One course
    Contact.astro            Email link
    SiteFooter.astro
    Icon.astro               Decorative inline SVG icons
  pages/
    index.astro              Assembles the sections
    404.astro                Not-found page (noindex)
    robots.txt.ts            robots.txt, generated per environment
  styles/global.css          Design tokens, reset, base styles, shared helpers
  assets/                    Source photos (optimised at build time)
public/                      Favicons, web manifest, Cloudflare _headers
```

## How it meets the brief

| Requirement | How |
|---|---|
| Top section, About, Courses, Contact | `Hero`, `About`, `Courses`, `Contact` components, in that order |
| Content used as supplied | All copy lives in `src/content/site.ts`, word for word from the brief |
| Semantic HTML | `header`, `nav`, `main`, `section` (each labelled by its heading), `article` per course, `dl` for course length, `footer` |
| Headings in order | One `h1` (her name), an `h2` per section, an `h3` per course |
| Alt text | Descriptive alt text on both photos; decorative SVGs and shapes are hidden from assistive tech |
| Keyboard | Skip link, logical tab order, visible focus ring on every link, no keyboard traps |
| Server-rendered | Static HTML with every word in the source. The only script is a small inline scroll-reveal enhancement; with JavaScript off, nothing is hidden or missing |
| Works on a phone | Fluid type and spacing, layouts that wrap, 44 px+ tap targets, no horizontal scrolling at 320 px and up |
| SEO | Page title, meta description, canonical URL, Open Graph tags, `lang="en-AU"`, sitemap, robots.txt |
| AEO / structured data | One JSON-LD `@graph`: `WebSite`, `ProfilePage`, `Person` (Dr Rivera) and three `Course` entities linked to her as `provider` and `instructor`, each with an online `CourseInstance` and machine-readable workload |

## Decisions

- **Astro over WordPress or Hugo.** The page is static content, so a static build is the simplest thing that works: fast, secure, nothing to patch, and Astro's components keep each section self-contained.
- **One content file.** The page and the JSON-LD both read `src/content/site.ts`, so they can never disagree. Editing a course updates the card and its structured data together.
- **No JavaScript dependency.** Navigation is three in-page links that fit on any phone, so no menu script is needed. The page works and reads the same with JavaScript off.
- **Plain scoped CSS.** Each component owns its styles; shared values are CSS custom properties in `global.css`. Easier to read in a review than long utility-class strings.
- **Self-hosted fonts** via Fontsource (Source Serif 4 for headings, Inter for text): no third-party requests.
- **Images through `astro:assets`.** Photos are resized and served as AVIF/WebP with JPEG fallback and explicit dimensions (no layout shift). The hero image loads eagerly with high priority, since it is the largest element on screen.
- **Motion as progressive enhancement.** Sections fade up as they scroll into view, driven by an IntersectionObserver in an inline script (no extra request, works in every current browser). Content is only hidden once that script has run, so without JavaScript everything is visible. Visitors with reduced motion turned on (for example Windows "Animation effects" off) get no animation.
- **Indexing per environment.** Production is indexable. Cloudflare Pages preview branches (`CF_PAGES_BRANCH` is not `main`) get `noindex, nofollow` and a disallow-all robots.txt, so only the production URL appears in search.

## Notes

- **Course links are `#`.** The brief supplies `#` for all three course links, so they are kept as given. Each link has hidden text naming its course, so screen readers announce which course it is for. Swap in real URLs in `src/content/site.ts` when they exist.
- **No contact form.** The brief asks for her email, so Contact is a `mailto:` link. A form would need a back end and spam protection.
- **Photos are AI-generated.** Dr Rivera is fictional, so the portraits were generated for this project. Replace `src/assets/` with real photos for a real client; the components need no changes.
- **Course rich results.** Google's Course rich result also expects pricing (`offers`), which the brief does not include. The Course data is valid schema.org and ready for `offers` to be added in `structured-data.ts`.

## Checks run before release

- `npm clean-install` and `npm run build` on a fresh copy (same steps Cloudflare runs)
- `html-validate` on the built HTML: no errors
- axe-core (WCAG 2.2 AA plus best practices) at 375, 768 and 1440 px: 0 violations
- Lighthouse, mobile and desktop: 100 for Performance, Accessibility, Best Practices and SEO
- Keyboard-only walkthrough: skip link first, logical order, visible focus on every stop
- JavaScript disabled: identical content, nothing hidden
- Scroll reveal: content below the fold starts hidden and fades in on scroll; with reduced motion or no JavaScript it is visible immediately
- No horizontal overflow and every image loads at 375, 768 and 1440 px
- Preview-branch build confirmed to output `noindex` and a disallow-all robots.txt

## Deploy (Cloudflare Pages)

1. Workers & Pages > Create > Pages > Connect to Git, pick this repository.
2. Production branch `main`, framework preset Astro, build command `npm run build`, output directory `dist`.
3. Environment variable `NODE_VERSION` = `22`.

If the production URL changes, update `SITE_URL` in `astro.config.mjs`. Canonical links, Open Graph, JSON-LD and the sitemap all read from it.
