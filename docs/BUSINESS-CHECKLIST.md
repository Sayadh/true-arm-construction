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
- [ ] Exact scope of **"Wall Install"** (drywall? framing? partitions?) → `data/services.ts` `wall-installation`
- [ ] Exact scope of **"Window"** (repair? replacement? trim?) → `window-services`
- [ ] Siding materials offered and whether full re-siding is offered → `siding`
- [ ] Whether residential and commercial new construction are both offered → `new-construction`
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
