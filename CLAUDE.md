# CLAUDE.md: Dr Alex Rivera site

Project notes for AI-assisted changes to this repo.

## Brief

Lead Web Developer technical assessment: a one-page website for a fictional psychologist, Dr Alex Rivera. Judged on codebase organisation, AEO and SEO, usability, maintainability and accessibility, not visual design.

Required:

1. Top section with her name, title and a photo
2. About section with the bio
3. Courses section showing the three courses
4. Contact section with her email

Also required: semantic HTML, clean readable code, accessible (headings in order, alt text, keyboard), all content server-rendered without JavaScript, works on a phone, page title, meta description, clear headings, JSON-LD for Dr Rivera (`Person`) and her courses (`Course`).

## Rules

- Use the supplied content exactly as given. All copy lives in `src/content/site.ts`. Do not write new copy.
- Ship no client-side JavaScript. Motion is CSS only, inside `@supports` and `prefers-reduced-motion: no-preference`.
- Keep one `h1` and headings in order.
- Never work directly on `main`. Branch as `<type>/<yyyymmdd>-<topic>` (`design`, `content`, `fix`, `feat`).
- Before committing: `npm test` (build + html-validate). Check 375 and 1440 px for overflow.
- Production URL lives in `astro.config.mjs` (`SITE_URL`) only.
- No em dashes in copy or comments.
