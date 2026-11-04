# SEO and AI visibility

Everything below is generated from `data/` at build time, so pages, schema, sitemap, and AI files never disagree.

## Going live (indexing)
Indexing is decided once at build time (`nuxt.config.ts` → `siteMode`):
- **Cloudflare Workers Builds** (`WORKERS_CI=1`): branch `main` = production (indexable), any other
  branch = preview (noindex). `NUXT_PUBLIC_SITE_ENV` is **ignored** on Cloudflare, because a
  dashboard variable applies to every branch (a leftover `staging` value once kept the live site
  out of Google with "Blocked by robots.txt").
- **Anywhere else** (local, other hosts): indexable only with `NUXT_PUBLIC_SITE_ENV=production`.
- Production `robots.txt`: `Allow: /`, disallows only the internal `/200.html` and `/404.html`
  shells, and lists `Sitemap: https://truearmconstruction.com/sitemap.xml`. Non-production:
  `Disallow: /` plus `noindex, nofollow` on every page.
- No `X-Robots-Tag` header is sent (there is no `public/_headers`); keep it that way for production.

To check a deployed build: `curl https://truearmconstruction.com/robots.txt`, and in the page
source look for `<meta name="robots" content="index, follow, max-image-preview:large">` and
`siteMode:"production"`.

After the first production deploy:
1. Check `https://truearmconstruction.com/robots.txt` shows `Allow: /`, and the page source has `<meta name="robots" content="index, follow, max-image-preview:large">`.
2. Google Search Console → Add property → **Domain** `truearmconstruction.com` → verify with the DNS TXT record (Cloudflare DNS → Add record → TXT). Then Sitemaps → submit `sitemap.xml`. URL Inspection → Request indexing for `/`, `/services`, `/service-areas/sacramento`, `/service-areas/west-sacramento`, `/service-areas/carmichael`, and the top service pages.
3. Bing Webmaster Tools → Import from Search Console (Bing also feeds ChatGPT search and Copilot).
4. Run `npm run indexnow` once after each production deploy. It pings Bing/IndexNow with every sitemap URL (key file: `public/54028431f3ae4576c07a6abc464b024b.txt`, keep it deployed).
5. Google Business Profile → Website: `https://truearmconstruction.com`. Hours, phone, and name there must match the site.

## What is in place
| Item | Where | Notes |
|---|---|---|
| Titles, descriptions, canonicals, Open Graph | `composables/usePageSeo.ts` | One call per page |
| Business schema (GeneralContractor) | `composables/useSchema.ts` | License, phones, service areas, service catalog, profiles (`sameAs`) |
| City landing pages | `data/areas.ts` → `/service-areas/<slug>` | Sacramento, West Sacramento, Carmichael — each with its own permit office, local notes, FAQs |
| FAQ schema | home, FAQ, service, and city pages | Answers come from `data/faqs.ts` |
| `sitemap.xml` | `server/routes/sitemap.xml.ts` | City pages, services, reviews, `/projects`; image entries for every work photo and video poster |
| Opening hours, email, legal name | `data/company.ts` → schema `openingHoursSpecification` | Keep identical to Google Business Profile |
| IndexNow | `scripts/indexnow.mjs`, key file in `public/` | `npm run indexnow` after deploys |
| `robots.txt` | `server/routes/robots.txt.ts` | Production allows all crawlers, including AI search bots |
| `llms.txt`, `llms-full.txt` | `server/utils/llms.ts` | Short index and full text for AI assistants (ChatGPT, Claude, Perplexity, Gemini) |

## Rules that protect rankings
- Add a city page only for an area the company actually serves, with content specific to that city (permit office, housing, local notes). Name-swapped pages are treated as doorway pages.
- No `AggregateRating` markup: Google ignores stars a business publishes about itself and can penalize it. Ratings are shown visually on `/reviews` with links to each platform.
- Keep review numbers in `data/reviews.ts` equal to what each platform shows.
- Keep Name, phone, and service area identical on the site, Google Business Profile, Yelp, Thumbtack, and Facebook.

## Off-site work with the biggest impact
1. Google Business Profile: primary category "General contractor", add secondary categories that match the services (Kitchen remodeler, Bathroom remodeler, Painter, Fence contractor, Handyman), set the service areas to the same three cities, add phone (213) 248-1760, website, hours, and photos of real jobs every month.
2. Ask every finished customer for a Google review with the "Ask for reviews" link; reply to every review.
3. Add the website link to Yelp, Thumbtack, Facebook, Instagram, and the CSLB-listed business details.
