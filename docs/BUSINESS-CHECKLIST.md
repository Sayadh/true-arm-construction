# Business information checklist

Items the client must supply or confirm before launch. Edit the listed file, then rebuild.

## Required before launch
- [ ] **Verify CSLB license #1128503** status at cslb.ca.gov → set `license.statusConfirmed: true` and `statusCheckedOn` in `data/company.ts`
- [ ] **Legal business name** exactly as on the CSLB record → `legalName`
- [ ] **Phone number** (E.164, e.g. `+19165550100`) → `phone` (enables call buttons + mobile call bar)
- [ ] **Email address** → `email`
- [ ] **Form provider** endpoint → `NUXT_PUBLIC_FORM_ENDPOINT` (see docs/FORMS.md)
- [ ] **Privacy policy** reviewed → `pages/privacy-policy.vue`

## Content to confirm
- [ ] Drywall: repair only, or also new drywall installation? (formerly "Wall Install") → `data/services.ts` `drywall-repair`
- [ ] Flooring materials actually installed (LVP, laminate, engineered wood, tile) → `flooring-installation`
- [ ] Epoxy systems offered (solid, flake) and spaces (garage, commercial) → `epoxy-flooring`
- [ ] Fence materials offered (wood, vinyl, chain link, metal?) and gate types → `fences-gates`
- [ ] Room additions: typical scope and whether plans/permits are handled in-house → `room-additions`
- [ ] Phone numbers to publish: (213) 248-1760 call/text, (213) 248-1273 text → `phone`
- [ ] Facebook page URL → `social.facebook`
- [ ] Additional service cities, if any → `data/areas.ts` (`enabled: true`)
- [ ] Business hours (optional) → `hours`
- [ ] Public business address (only if the company wants one shown) → `address`

## Assets
- [ ] Official logo (SVG) — or approve the typographic wordmark
- [ ] Hero photo of real work
- [ ] Service photos (at least one per service)
- [ ] Project photos with titles, category, services, and approved location
- [ ] Certificates (image or PDF) with issuer, number, and dates

## Accounts
- [ ] Google Analytics 4 / Google Tag Manager IDs
- [ ] Google Ads conversion ID + label
- [ ] Google Search Console verification
- [ ] Google Business Profile URL → `social.google`

## Never publish without written confirmation
Years in business, project counts, ratings, reviews/testimonials, awards, insurance or bonding claims, warranty terms, prices or financing.

## Stock photography (temporary)

The homepage uses licensed stock photos (Unsplash License) from `public/images/stock/` as
atmosphere: hero slideshow, service-group tiles, "Why choose" photo, process section and the
closing CTA band. They are never captioned or presented as True Arm projects.

- [ ] Replace with real project photos as they become available (same file names, or update
      `company.heroSlides` in `data/company.ts` and the `groupImages` map in
      `components/home/HomeServices.vue`).
- [ ] Never move stock photos into `data/projects.ts` or service galleries.
