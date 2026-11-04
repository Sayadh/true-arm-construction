# CLAUDE.md: True Arm Construction website

Guidance for Claude (and any AI assistant or developer) working in this repository.
Read this file first, then the doc that matches your task (see "Where to read next").

## Project in one paragraph

Marketing website for **True Arm Construction**, a Class B general building contractor
(CA license #1128503) in Sacramento, California. It is a **fully static** Nuxt 3 site
(`nuxt generate`), hosted on **Cloudflare Workers (Static Assets)**, with no backend and no
admin panel. All business content lives in TypeScript files under `data/`. Forms post to
Formspree. Live: https://truearmconstruction.com

## Working with the owner

- The owner is **Sayad**. Reply in **Armenian**. Keep code, file paths, commands, and identifiers in English.
- **Ask clarifying questions before starting a new feature or a non-trivial change**, especially
  when the design or content choice is not obvious. Small, clearly scoped fixes can go ahead.
- Show the result: for visual changes, take screenshots (desktop 1440px and mobile 390px) and share them.
- Be concise. Lead with what changed and what the owner needs to do (usually `git push`).

## Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 3 (Vue 3, Composition API, `<script setup lang="ts">`), strict TypeScript |
| Styling | Tailwind CSS 3 with custom tokens (`tailwind.config.ts`) + `assets/css/main.css` |
| Fonts | Manrope Variable (body), Archivo Variable at a condensed width (headlines), self-hosted via `@fontsource-variable/*` |
| Images | `@nuxt/image` (ipx), WebP output, prerendered at build time |
| Icons | `lucide-vue-next`, registered by name in `components/ui/AppIcon.vue` |
| Forms | `composables/useFormSubmit.ts` → Formspree (or any JSON webhook) |
| Hosting | Cloudflare Workers Builds from GitHub `main` → static assets (`wrangler.jsonc`) |

Not used, on purpose: a backend, a database, a CMS, Docker, or a component library.
Do not add them without the owner's approval.

## Commands

```bash
npm install            # after any package.json change (also fixes "Cannot find package …" in dev)
npm run dev            # http://localhost:3000
npm run typecheck      # vue-tsc, must pass
npm run generate       # static build → .output/public (must pass, prerender fails on any broken route)
npm run check:links    # after generate: broken links, one <h1>, title/description/canonical, duplicates
npm run media:import -- /path/to/inbox   # import work photos/videos (see docs/ASSETS.md)
npm run indexnow       # after a production deploy is live
```

**Definition of done for any change:** `typecheck` passes, `generate` passes, `check:links`
passes, and visual changes were checked in a browser at desktop and mobile widths.

## Where things live

```
data/           ALL content and business facts (company, services, areas, faqs, reviews, work media…)
types/index.ts  Content shapes (CMS-ready). Change a type before changing its data.
pages/          Routes. Thin: read data, call usePageSeo/useJsonLd, compose components.
components/     layout/ ui/ home/ services/ forms/ projects/ work/ reviews/ faq/ seo/
composables/    usePageSeo, useSchema (JSON-LD), useAnalytics, useFormSubmit, useAnchorScroll
plugins/        analytics.client.ts (GA4/GTM/Ads), reveal.ts (v-reveal scroll entrance directive)
server/routes/  sitemap.xml, robots.txt, llms.txt, llms-full.txt (all prerendered)
scripts/        check-links.mjs, import-media.mjs, indexnow.mjs
public/         images/ (brand, stock, work, certificates, social…), videos/, _redirects, icons
docs/           Architecture, design system, content guide, workflow, deployment, SEO, forms…
```

Components are auto-imported **by file name** (`pathPrefix: false`), so every component file
name must be unique across all folders.

## Golden rules

1. **Never invent business facts.** No reviews, ratings, testimonials, years in business,
   project counts, awards, insurance, warranty, prices, or financing unless the owner confirmed
   them. Review numbers must match each platform exactly (`data/reviews.ts`, with `checkedOn`).
2. **Content lives in `data/`, never hardcoded in components.** Pages, schema, sitemap, and
   `llms.txt` are all generated from the same data, so they cannot disagree.
3. **Stock photos are atmosphere only.** Files in `public/images/stock/` may decorate the
   homepage but must never be captioned as, or placed among, True Arm projects or work media.
4. **Credentials:** `status: 'confirmed'` only after the issuer's record is checked.
   `company.license.statusConfirmed` controls whether the site says "Active".
5. **`null` means hidden.** Contact fields set to `null` are never rendered and never become links.
6. **Keep URLs stable.** If a route is removed or renamed, add a 301 in `public/_redirects`.
7. **Use design tokens** (`ink`, `deep`, `paper`, `stone`, `bronze`, `body`, `muted`), never raw
   hex in templates. The token names are historical (`bronze` is currently the red accent).
8. **Accessibility and motion:** one `<h1>` per page, visible focus, real alt text, and every
   animation must respect `prefers-reduced-motion`.

## Gotchas (learned the hard way)

- **Nitro preset is forced to `static`** in `nuxt.config.ts`. Without it, Cloudflare CI
  auto-detects the platform and emits a server Worker, and the deploy fails with
  `entry-point file at "index.mjs" was not found`.
- **`<NuxtImg sizes>`**: a bare `sizes="100vw"` produces 1–2px images. Use breakpoint syntax,
  e.g. `sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"` or `xs:100vw lg:50vw`.
- **Indexing switch (`siteMode` in `nuxt.config.ts`):** on Cloudflare Workers Builds, `main` is
  production and every other branch is noindex, regardless of any `NUXT_PUBLIC_SITE_ENV` in the
  dashboard (a stale `staging` value once blocked Google). Locally, only
  `NUXT_PUBLIC_SITE_ENV=production` makes a build indexable. The key is named `siteMode`, not
  `siteEnv`, so Nuxt's automatic `NUXT_PUBLIC_*` runtime override cannot replace it.
- **Sticky elements** must use `top-[var(--header-offset)]`, not `--header-h`: the header has an
  extra utility bar on `xl` screens.
- **In-page anchor links** must use `useAnchorScroll().scrollToId` so native hash jumps and the
  router's scroll handling don't fight each other.
- **New dynamic routes** (services, areas, projects, resources) are prerendered from the lists in
  `nuxt.config.ts → nitro.prerender.routes`. Data drives it, so adding data is enough.
- **`v-reveal`** never hides content that is already on screen at load, and is skipped for
  reduced motion. Don't put it on above-the-fold hero content; the hero has its own CSS intro.
- **New npm package:** the Cloudflare build installs from `package-lock.json`, but the owner's
  local `node_modules` will not have it until `npm install` is run.

## Git and deploy

- Branch `main` deploys automatically: GitHub push → Cloudflare Workers Builds →
  `npm run generate` → `npx wrangler deploy`.
- Commit only the files you changed (`git add <paths>`), never `git add -A`: the owner often has
  unrelated work in progress, and `.idea/` must stay out of commits.
- Write commit messages that explain *why*. The owner pushes from their own Terminal.

## Where to read next

| Task | Read |
|---|---|
| Understand how the site is built | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Change colors, type, layout, motion | [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) |
| Add or edit a service, FAQ, area, review, credential, guide | [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) |
| Day-to-day workflow, verification, troubleshooting | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| Hosting, domain, Cloudflare | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| SEO, schema, sitemap, AI visibility | [docs/SEO.md](docs/SEO.md) |
| Forms | [docs/FORMS.md](docs/FORMS.md) |
| Analytics and conversions | [docs/ANALYTICS.md](docs/ANALYTICS.md) |
| Photos, videos, logo, certificates | [docs/ASSETS.md](docs/ASSETS.md) |
| Why things are the way they are | [docs/DECISIONS.md](docs/DECISIONS.md) |
| What the business still has to supply | [docs/BUSINESS-CHECKLIST.md](docs/BUSINESS-CHECKLIST.md) |

Folder-specific rules: [data/CLAUDE.md](data/CLAUDE.md), [components/CLAUDE.md](components/CLAUDE.md).
