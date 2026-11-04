# True Arm Construction — website

Static marketing website for **True Arm Construction**, a Class B general building contractor
(CA license #1128503) in Sacramento, California. Live at https://truearmconstruction.com.

- **Stack:** Nuxt 3 · Vue 3 (`<script setup lang="ts">`) · strict TypeScript · Tailwind CSS 3 · Nuxt Image · Lucide
- **Rendering:** fully prerendered static HTML (`nuxt generate`), no server in production
- **Hosting:** Cloudflare Workers (Static Assets), auto-deployed from GitHub `main`
- **Content:** typed data files in `data/` (no CMS, no database)
- **Forms:** Formspree (swappable to any JSON webhook)

## Quick start

```bash
npm install
npm run dev               # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run typecheck` | Type checking (`vue-tsc`) |
| `npm run generate` | Static build into `.output/public/` |
| `npm run check:links` | After `generate`: broken links, one H1, title/description/canonical, duplicates |
| `npm run preview` | Serve the generated site locally |
| `npm run media:import -- <inbox>` | Import work photos/videos into `public/` + `data/work-media.ts` |
| `npm run indexnow` | Ping Bing/IndexNow after a production deploy |

## Deploy

Push to `main`. Cloudflare Workers Builds runs `npm run generate` and `npx wrangler deploy`
(`wrangler.jsonc`). Builds of `main` are indexable; every other build is `noindex`.
Details: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project map

```
data/            business facts and all page content  → start here for content changes
types/           content types (CMS-ready)
pages/           routes
components/      layout, ui, home, services, forms, work, projects, reviews, faq, seo
composables/     SEO, JSON-LD, analytics, forms, anchor scrolling
plugins/         analytics (client), v-reveal directive
server/routes/   sitemap.xml, robots.txt, llms.txt, llms-full.txt
scripts/         link checker, media importer, IndexNow
public/          images, videos, icons, _redirects
docs/            documentation (below)
```

## Documentation

| Doc | For |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Start here: rules, commands, gotchas (for AI assistants and developers) |
| [Architecture](docs/ARCHITECTURE.md) | How the site is built: rendering, data flow, routes |
| [Design system](docs/DESIGN-SYSTEM.md) | Colors, type, layout, motifs, motion |
| [Content guide](docs/CONTENT-GUIDE.md) | Adding services, FAQs, areas, reviews, credentials, guides |
| [Workflow](docs/WORKFLOW.md) | Making, verifying, and shipping changes; troubleshooting |
| [Deployment](docs/DEPLOYMENT.md) | Cloudflare setup, domain, alternatives |
| [SEO](docs/SEO.md) | Indexing, schema, sitemap, AI visibility |
| [Forms](docs/FORMS.md) | Planner + contact form delivery |
| [Analytics](docs/ANALYTICS.md) | GA4, GTM, Ads conversions, consent |
| [Assets](docs/ASSETS.md) | Logo, icons, photos, videos, certificates |
| [Decisions](docs/DECISIONS.md) | Why things are the way they are |
| [Business checklist](docs/BUSINESS-CHECKLIST.md) | What the owner still has to supply |

## Content rules

Never publish unconfirmed facts (reviews, ratings, years in business, project counts, awards,
insurance, warranties, prices). Stock photos are atmosphere only and never presented as True Arm
work. See [CLAUDE.md](CLAUDE.md) → "Golden rules".
