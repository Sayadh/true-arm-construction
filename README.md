# True Arm Construction — website

Static (SSG) marketing website for **True Arm Construction**, a Class B general building contractor in Sacramento, CA.

- **Stack:** Nuxt 3 · Vue 3 (Composition API, `<script setup lang="ts">`) · TypeScript (strict) · Tailwind CSS 3 · Nuxt Image · Lucide icons
- **Rendering:** fully prerendered static HTML (`nuxt generate`). No Node.js process needed in production.
- **Backend:** none. Forms post to a hosted provider (Formspree by default) via a swappable abstraction.

## Quick start

```bash
npm install
cp .env.example .env      # optional for local work
npm run dev               # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run generate` | Build the static site into `.output/public/` |
| `npm run preview` | Serve the generated site locally |
| `npm run typecheck` | `vue-tsc` type checking |
| `npm run lint` | Alias of typecheck (no ESLint configured, by design for v1) |
| `npm run check:links` | After `generate`: checks internal links, single H1, title/description/canonical, duplicates |
| `npm run build` | Nuxt build (not needed for static hosting; use `generate`) |

## Production build

```bash
NUXT_PUBLIC_SITE_ENV=production \
NUXT_PUBLIC_SITE_URL=https://truearmconstruction.com \
NUXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/XXXXXXX \
npm run generate
npm run check:links
```

Upload the **contents** of `.output/public/` to your host. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

> ⚠️ Without `NUXT_PUBLIC_SITE_ENV=production`, every page is `noindex` and `robots.txt` blocks crawlers. This is intentional so staging builds never get indexed.

## Where things live

```
data/            ← ALL business content (edit here, not in components)
  company.ts       name, phone, email, license, social, logo, hero image
  services.ts      service catalogue + groups (copy for every service page)
  projects.ts      real projects only (empty until photos are supplied)
  credentials.ts   certificates (empty until supplied and verified)
  faqs.ts          FAQ content by category
  resources.ts     homeowner guides
  areas.ts         service areas (only Sacramento enabled)
  planner.ts       project planner questions + service navigator
  navigation.ts    menus
types/           ← TypeScript interfaces (CMS-ready shapes)
components/      ← layout/, ui/, home/, services/, projects/, forms/, seo/, faq/
composables/     ← usePageSeo, useSchema (JSON-LD), useAnalytics, useFormSubmit
pages/           ← routes
server/routes/   ← sitemap.xml + robots.txt (prerendered at build time)
public/images/   ← logo, hero, service, project, certificate, social images
docs/            ← deployment, forms, analytics, assets, business checklist
```

## Routes

`/` · `/services` · `/services/{home-remodeling, kitchen-remodeling, bathroom-remodeling, room-additions, flooring-installation, epoxy-flooring, tile-installation, baseboard-installation, interior-painting, exterior-painting, power-washing, fences-gates, drywall-repair, dry-rot-repair, handyman-services}` · `/projects` · `/projects/[slug]` (only published projects) · `/about` · `/licenses-certifications` · `/service-areas` · `/faq` · `/resources` · `/resources/[slug]` · `/contact` · `/free-estimate` (project planner) · `/privacy-policy` · custom 404.

Google Ads landing pages: `/services/home-remodeling` (+ `/services/kitchen-remodeling`, `/services/bathroom-remodeling`), `/services/tile-installation`. The third campaign (originally New Construction, which was removed) needs a new destination, e.g. `/services/room-additions`.

Old URLs of removed or renamed services are 301-redirected in `public/_redirects`.

## Content rules (important)

- Never add testimonials, ratings, years in business, project counts, awards, insurance or warranty claims unless the client confirms them in writing.
- `company.license.statusConfirmed` stays `false` until the license is checked on cslb.ca.gov; the site never says "active" before that.
- Contact values set to `null` are never rendered and never become links.
- Projects and credentials only render when `published: true`.

## Docs

- [Deployment](docs/DEPLOYMENT.md) — cPanel/HayHost, Cloudflare Pages, Nginx/DigitalOcean/DreamHost VPS
- [Forms](docs/FORMS.md) — connecting Formspree or a webhook
- [Analytics](docs/ANALYTICS.md) — GA4, GTM, Google Ads conversions, Search Console, consent
- [Assets](docs/ASSETS.md) — replacing logo, hero, service and project photos
- [Business checklist](docs/BUSINESS-CHECKLIST.md) — what the client still needs to supply
