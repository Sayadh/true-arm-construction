# Business information checklist

What the owner has supplied, and what is still open. Edit the listed file, then rebuild.
Last reviewed: 2026-11-04.

## Done
- [x] CSLB license #1128503 confirmed active → `license.statusConfirmed: true`, `statusCheckedOn` (`data/company.ts`)
- [x] Legal business name → `legalName`
- [x] Phones: (213) 248-1760 call/text → `phone`; (213) 248-1273 text only → `textPhone`
- [x] Email → `email`
- [x] Business hours (Mon–Fri 7 AM – 7 PM) → `hours`
- [x] Instagram, Facebook, Google Business Profile → `social`
- [x] Official logo and icon set → `public/images/brand/`, `logo.src`
- [x] Form provider (Formspree, notifications to the company Gmail) → `nuxt.config.ts`
- [x] Review platform ratings (Google, Thumbtack, Yelp, Facebook) → `data/reviews.ts`
- [x] EPA Lead-Safe Certified Firm `NAT-F312370-1` + logo → `data/credentials.ts`

## Open
- [ ] **EPA certificate:** check `NAT-F312370-1` in EPA's firm locator, then set `status: 'confirmed'`; add `issuedOn` / `expiresOn` from the certificate
- [ ] **Yelp URL:** confirm the exact business URL → `data/reviews.ts`
- [ ] **Review numbers:** re-copy ratings and counts monthly, update `checkedOn`
- [ ] **Testimonials:** real quotes (word for word, first name + last initial) → `testimonials`
- [ ] **Privacy policy** reviewed by the owner → `pages/privacy-policy.vue`
- [ ] **Google Ads:** destination for the former "New Construction" campaign (suggested `/services/room-additions`)
- [ ] **Analytics IDs:** GA4 / GTM, Google Ads conversion ID + label → env vars (`docs/ANALYTICS.md`)
- [ ] **Search Console / Bing Webmaster** verification and sitemap submission (`docs/SEO.md`)
- [ ] Public business address — only if the owner wants one shown → `address`
- [ ] Additional service cities, each with city-specific content → `data/areas.ts`

## Content to confirm
- [ ] Drywall: repair only, or also new installation? → `drywall-repair`
- [ ] Flooring materials actually installed (LVP, laminate, engineered wood) → `flooring-installation`
- [ ] Epoxy systems and spaces (garage, commercial) → `epoxy-flooring`
- [ ] Fence materials (wood, vinyl, chain link, metal) and gate types → `fences-gates`
- [ ] Room additions: typical scope; plans/permits in-house or partnered → `room-additions`

## Assets
- [ ] Real photos to replace the homepage stock images (hero slides, service-group tiles,
      "Why choose", process, CTA band) — see below
- [ ] More work photos/videos per service → `npm run media:import` (`docs/ASSETS.md`)
- [ ] Case-study projects with titles, scope, and approved location wording → `data/projects.ts`
- [ ] Other certificates (image/PDF) with issuer, number, and dates → `data/credentials.ts`

## Stock photography (temporary)

The homepage uses licensed stock photos (Unsplash License) from `public/images/stock/` as
atmosphere: hero slideshow, service-group tiles, "Why choose" photo, process section and the
closing CTA band. They are never captioned or presented as True Arm projects.

- [ ] Replace with real project photos as they become available (same file names, or update
      `company.heroSlides` in `data/company.ts` and the `groupImages` map in
      `components/home/HomeServices.vue`).
- [ ] Never move stock photos into `data/projects.ts`, `data/work-media.ts`, or service galleries.

## Never publish without written confirmation
Years in business, project counts, ratings beyond what platforms show, testimonials not copied
from a real review, awards, insurance or bonding claims, warranty terms, prices or financing.
