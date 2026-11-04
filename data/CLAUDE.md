# CLAUDE.md: `data/`

Every business fact and every piece of page copy comes from this folder. Pages, JSON-LD,
`sitemap.xml`, `llms.txt`, and the footer all read from here, so one edit updates everything.
Full how-to: [docs/CONTENT-GUIDE.md](../docs/CONTENT-GUIDE.md).

## Files

| File | Holds | Notes |
|---|---|---|
| `company.ts` | Name, phones, email, hours, license, social links, logo, hero image/slides | `null` = hidden. License "Active" shows only when `statusConfirmed: true`. |
| `services.ts` | `serviceGroups` (4) and `services` (one entry per `/services/<slug>` page) | `enabled: false` removes a page everywhere. `featuredServiceSlugs` drives featured lists. |
| `areas.ts` | Service areas; entries with a `page` get `/service-areas/<slug>` | Enable a city only if the company really serves it, with city-specific content. |
| `faqs.ts` | FAQ categories and items | Used on `/faq`, service pages, city pages, homepage, and FAQ schema. |
| `planner.ts` | Project planner questions + the service finder (`navigatorChoices`) | Every `service` slug must exist in `services.ts`. |
| `reviews.ts` | Review platforms (rating, count, URL, `checkedOn`) and `testimonials` | Copy numbers exactly as each platform shows them. Testimonials word for word. |
| `credentials.ts` | Certificates beyond the CSLB license (e.g. EPA Lead-Safe) | `published: true` to show; `status: 'confirmed'` only after checking with the issuer. |
| `work-media.ts` | **Generated** by `npm run media:import` | Edit only `alt`/`caption` by hand (keep valid JSON). |
| `work.ts` | Helpers over work media (per service, featured, covers) | Logic, not content. |
| `projects.ts` | Case-study projects | Real projects only. `published: true` to show. |
| `resources.ts` | Homeowner guides (`/resources/<slug>`) | General information, never legal/permit advice. |
| `navigation.ts` | Menus, `estimatePath` | |

## Rules

- **Types first.** Shapes are in `types/index.ts`. Add or change a field there, then in data.
- **Slugs are URLs.** Renaming a service/area/resource slug changes its URL: add a 301 in
  `public/_redirects` and update every reference (`related`, `planner.ts`, `navigatorChoices`, FAQs).
- **No fabricated facts** (reviews, ratings, years, counts, awards, insurance, warranties, prices).
  If something must be confirmed by the owner, leave it `null`/unpublished and add a
  `// TODO(client): …` comment plus a line in `docs/BUSINESS-CHECKLIST.md`.
- **Stock images never go here** as project or work media. Only real job photos.
- **Inline links** in copy use `[label](/path)` (parsed by `utils/text.ts`, internal paths only).
- **SEO fields:** `seoTitle` ~60 characters, `metaDescription` ~150 characters, unique per page
  (`npm run check:links` fails on duplicates).
- After editing: `npm run typecheck && npm run generate && npm run check:links`.
