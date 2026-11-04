# Content guide

How to add or change content. Everything below is an edit in `data/` (plus image files in
`public/`); no component changes are needed. After any edit:

```bash
npm run typecheck && npm run generate && npm run check:links
```

## Truth rules (read first)

- Publish only facts the owner has confirmed. Never invent reviews, ratings, testimonials, years
  in business, project counts, awards, insurance, bonding, warranty terms, prices, or financing.
- Review numbers are copied exactly from each platform, with the date in `checkedOn`.
- Testimonials are word for word, first name + last initial only.
- Credentials are `status: 'confirmed'` only after the issuer's record was checked.
- Stock photos never appear as projects, work media, or service galleries.
- Unknown values stay `null` / unpublished with a `// TODO(client): …` comment and a line in
  `docs/BUSINESS-CHECKLIST.md`.

## Company facts — `data/company.ts`

Name, legal name, phones (`phone` calls/texts, `textPhone` texts only, E.164 format), email,
hours (also used in schema `openingHoursSpecification`), license, social profiles, logo, hero
image/slides. Keep name, phone, hours, and service area **identical** to the Google Business
Profile, Yelp, Thumbtack, and Facebook.

## Services — `data/services.ts`

Each entry in `services` is one page at `/services/<slug>`.

**Edit copy:** change the fields of the entry (`heroTitle`, `heroLead`, `intro`, `scope`,
`sections`, `costFactors`, `expectations`, …). Keep `seoTitle` ≈60 and `metaDescription` ≈150
characters and unique.

**Add a service:**
1. Copy an existing entry of the same group and change `slug`, `name`, `shortName`, `group`,
   `icon`, SEO fields, and all copy. Set `enabled: true`.
2. If the icon name is new, register it in `components/ui/AppIcon.vue`.
3. Point `faqCategory` at an existing FAQ category (or add one, see FAQs), and list `related` slugs.
4. Add it to the service finder (`navigatorChoices` in `data/planner.ts`) and the planner
   options (`plannerServiceOptions`, `plannerQuestions`) if visitors should be able to pick it.
5. Optional: `scopeGroups` for split scopes (e.g. Installation / Repair), `scopeVisual` +
   `process` for an animated walkthrough, `coverMedia` to choose the cover photo, `adsLanding`
   for a focused paid-ads landing page.

**Hide a service:** `enabled: false` removes the page, menus, sitemap, and schema entries. If the
URL was live, add a 301 in `public/_redirects`.

**Rename a slug:** update every reference (`related`, `planner.ts`, FAQs, `featuredServiceSlugs`,
work media folders) and add a 301 from the old URL.

## Service groups

`serviceGroups` (4 groups) organize menus, `/services`, and the homepage tiles. The homepage tile
photo per group is set in `components/home/HomeServices.vue` (`groupImages`).

## FAQs — `data/faqs.ts`

Add `{ id, category, question, answer: ['paragraph', …], featured? }`. Answers may contain
internal links as `[text](/path)`. `featured: true` makes it eligible for the homepage.
Service pages show their `faqCategory` plus any `faqIds`. FAQ schema is generated automatically.

## Service areas — `data/areas.ts`

Set `enabled: true` only for cities the company really serves. A city page
(`/service-areas/<slug>`) is created when the entry has a `page` block with city-specific
content: intro, the permit authority and its URL, local notes, optional neighborhoods, and FAQs.
Do not create name-swapped copies of another city (Google treats them as doorway pages).

## Reviews — `data/reviews.ts`

- `reviewPlatforms`: update `rating`, `reviewCount`, and `checkedOn` exactly as shown on the
  platform. Remove an entry to hide a platform.
- `testimonials`: real quotes only, e.g.
  `{ quote: '…', author: 'Maria G.', platform: 'thumbtack', rating: 5, date: '2026-09', service: 'interior-painting', featured: true }`.
  Up to 3 `featured` appear on the homepage; the section hides while the list is empty.

## Credentials — `data/credentials.ts`

Example (EPA Lead-Safe Certified Firm is already in place):

```ts
{
  id: 'epa-lead-safe',
  name: 'EPA Lead-Safe Certified Firm',
  issuer: 'U.S. Environmental Protection Agency (EPA)',
  credentialNumber: 'NAT-F312370-1',
  description: '…plain-language explanation…',
  status: 'pending-verification',   // 'confirmed' after checking verifyUrl
  issuedOn: undefined,              // 'YYYY-MM-DD'
  expiresOn: undefined,
  verifyUrl: 'https://cdxapps.epa.gov/ocspp-oppt-lead/firm-location-search',
  image: { src: '/images/certificates/epa-lead-safe-certified-firm.png', alt: '…', width: 800, height: 589 },
  published: true
}
```

Files go in `public/images/certificates/`. Published credentials appear on
`/licenses-certifications` (full card) and in the homepage "Licensed and certified" section.

## Work photos and videos

Use the importer, not hand edits: `npm run media:import -- /path/to/inbox` (one sub-folder per
service slug). It writes `data/work-media.ts`; afterwards edit only `alt` and `caption` there.
Full instructions: `docs/ASSETS.md`.

## Projects (case studies) — `data/projects.ts`

Real projects only, with approved location wording. Add photos under
`public/images/projects/<slug>/`, add the entry, set `published: true`.

## Guides — `data/resources.ts`

Each published entry is `/resources/<slug>` with `body` blocks (`heading`, `paragraphs`,
`list`). Keep guides general; never give legal or permit advice. Set `publishedOn` (and
`updatedOn` when edited) and `relatedServices`.

## Hero slideshow and homepage imagery

`company.heroSlides` lists the hero background photos (crossfade every 7s; one photo = static;
empty = plain navy). Use wide, simply composed photos; text stays readable thanks to the scrim.
Other homepage stock images are referenced in `HomeServices.vue`, `HomeWhy.vue`,
`HomeProcess.vue`, and `components/ui/CtaBand.vue`.

## Writing style

- Plain, specific, honest. Describe what the company does and how, not superlatives.
- Sentence case for headings. Active voice for buttons ("Get a Free Estimate", "Start an estimate").
- Mention Sacramento naturally where it helps the reader, not as keyword stuffing.
- Alt text describes what is visible in the photo.
