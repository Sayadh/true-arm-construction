# Architecture

How the True Arm Construction website is put together, and why.

## 1. Rendering model

- **Static site generation.** `npm run generate` renders every route to HTML at build time
  (`.output/public/`). Production serves files only: no Node.js process, no database.
- **Hydration.** Vue hydrates on the client for interactive parts (menus, service finder,
  planner, galleries, animations). Content is fully present in the HTML for SEO and no-JS visitors.
- **Prerender list.** `nuxt.config.ts → nitro.prerender` crawls links from `/` and also lists
  every service, city page, project, guide, and the text routes (`sitemap.xml`, `robots.txt`,
  `llms.txt`, `llms-full.txt`) explicitly. `failOnError: true` makes broken routes fail the build.
- **Preset forced to `static`** so CI platforms never switch Nitro to a server preset.

## 2. Data flow

```
types/index.ts ──► data/*.ts ──► pages/*.vue ──► components/*
                       │
                       ├──► composables/useSchema.ts   (JSON-LD)
                       ├──► server/routes/sitemap.xml   (URLs + image entries)
                       ├──► server/utils/llms.ts        (llms.txt, llms-full.txt)
                       └──► nuxt.config.ts             (prerender routes)
```

One source of truth: changing `data/` updates the page, its schema, the sitemap, and the AI
text files in the same build. `types/index.ts` mirrors what a future CMS or API would return,
so `data/` can later be replaced by fetched content without touching components.

## 3. Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.vue` | Hero, service finder, service groups, why, work, reviews, process, planner CTA, credentials, areas, FAQ, CTA |
| `/services` | `pages/services/index.vue` | Groups with sticky tab bar + service finder |
| `/services/<slug>` | `pages/services/[slug].vue` | One per enabled service in `data/services.ts` |
| `/service-areas`, `/service-areas/<slug>` | `pages/service-areas/` | City pages for areas with a `page` block in `data/areas.ts` |
| `/projects`, `/projects/<slug>` | `pages/projects/` | Work media from `data/work.ts`; case studies from `data/projects.ts` |
| `/reviews` | `pages/reviews.vue` | Platform ratings + testimonials from `data/reviews.ts` |
| `/about`, `/contact`, `/faq`, `/privacy-policy` | `pages/` | |
| `/licenses-certifications` | `pages/licenses-certifications.vue` | CSLB license + `data/credentials.ts` |
| `/resources`, `/resources/<slug>` | `pages/resources/` | Guides from `data/resources.ts` |
| `/free-estimate` | `pages/free-estimate.vue` | Project planner (`?service=<slug>` preselects) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt` | `server/routes/` | Prerendered text files |
| 404 | `error.vue` | Served as `404.html` with a real 404 status |

Removed/renamed URLs are 301-redirected in `public/_redirects` (Cloudflare format).

## 4. Page anatomy

Every page follows the same pattern:

```vue
<script setup lang="ts">
usePageSeo({ title, description, path })      // title, meta, canonical, OG, robots
useJsonLd([organizationSchema(), webPageSchema({ path, title, description }), breadcrumbSchema([...])])
</script>
<template>
  <PageHeader :crumbs title lead />   <!-- or a custom hero -->
  …sections built from data…
  <CtaBand />
</template>
```

`layouts/default.vue` wraps all pages with `SiteHeader`, `SiteFooter`, and `MobileActionBar`.

## 5. SEO and indexing

- `usePageSeo` sets `noindex, nofollow` on every page unless `siteMode === 'production'`.
  `robots.txt` follows the same switch. See `docs/SEO.md` for how production is detected.
- JSON-LD: `GeneralContractor` organization (license, phones, areas, service catalog,
  `sameAs`), `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`.
- No `AggregateRating` markup (self-published ratings are ignored or penalized by Google).

## 6. Forms

`ProjectPlanner` (multi-step, `/free-estimate`) and `ContactForm` both call
`useFormSubmit()`, which posts to Formspree (default) or any JSON webhook
(`NUXT_PUBLIC_FORM_PROVIDER=webhook`). Validation helpers are in `utils/validation.ts`.
Success is shown only after a 2xx response. Details: `docs/FORMS.md`.

## 7. Analytics

`plugins/analytics.client.ts` loads GA4 / Google Ads / GTM only when IDs are configured.
Components call `useAnalytics().track()` with typed events and no personal data.
Details: `docs/ANALYTICS.md`.

## 8. Client-side behavior

| Feature | Where | Notes |
|---|---|---|
| Scroll entrances | `plugins/reveal.ts` (`v-reveal`) | One observer; skips reduced motion and on-screen elements |
| Hero intro, slideshow | `components/home/HomeHero.vue`, `HeroSlideshow.vue` | CSS load sequence; crossfade + slow push-in |
| Blueprint drawing | `components/home/HeroElevation.vue` | SVG draw-on, starts when scrolled into view |
| Sticky tabs, active section | `pages/services/index.vue` | `IntersectionObserver` + `useAnchorScroll` |
| Service finder | `components/forms/ProjectNavigator.vue` + `NavigatorPanel.vue` | Panel opens under the tapped card on phones |
| Mobile action bar | `components/layout/MobileActionBar.vue` | Hidden while a `[data-primary-cta]` is on screen |

## 9. Hosting

GitHub `main` → Cloudflare Workers Builds (`npm run generate`, then `npx wrangler deploy`)
→ static assets from `.output/public` (`wrangler.jsonc`: `drop-trailing-slash`,
`404-page`). Domain `truearmconstruction.com` on Cloudflare with HTTPS forced and
`www` → apex redirect. Details: `docs/DEPLOYMENT.md`.

## 10. Extending later

- **CMS/admin:** replace `data/*.ts` exports with fetched data of the same types.
- **Photo uploads in the planner:** needs storage (e.g. Supabase Storage + signed URLs) and a
  small backend; see `docs/FORMS.md`.
- **Own API:** set the form provider to `webhook` and point it at the new endpoint.
