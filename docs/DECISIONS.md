# Decisions log

Short records of decisions that shape the project, so they are not re-litigated by accident.
Add new entries at the top. Format: date, decision, why, consequences.

---

### 2026-11-04 — EPA Lead-Safe credential published
- **Decision:** Show EPA Lead-Safe Certified Firm `NAT-F312370-1` on `/licenses-certifications`
  and the homepage credentials section, with a link to EPA's firm locator.
- **Why:** Required for work disturbing paint in pre-1978 homes; a strong trust signal for
  painting, drywall, and remodeling.
- **Consequences:** `status` stays `pending-verification` ("Check with issuer") until the number
  is confirmed in EPA's locator; issue/expiry dates still to be supplied.

### 2026-11 — Homepage redesign with photography and motion
- **Decision:** Photo-led homepage (hero slideshow, service-group photo tiles, process, CTA band),
  condensed Archivo headlines, restrained scroll entrances (`v-reveal`).
- **Why:** Local competitors' sites are text-heavy with little visual polish; leading remodelers
  use photo-led, magazine-style layouts. This positions True Arm above local competition.
- **Consequences:** Until enough real photos exist, licensed **Unsplash stock** is used as
  atmosphere only, never presented as True Arm work. Replace as real photos arrive.

### 2026-11 — Palette taken from the logo
- **Decision:** Navy + muted logo red on warm white (after a short "City of Trees" green/brass
  phase). Token names (`ink`, `bronze`, …) were kept so the whole site re-themes from
  `tailwind.config.ts`.
- **Consequences:** `bronze` means "accent" (currently red). Do not rename tokens casually.

### 2026-11 — Service catalog aligned with the business card
- **Decision:** Services match what the company confirmed. Removed unconfirmed services, renamed
  "Wall installation" → `drywall-repair`, merged fences into `fences-gates` with Installation and
  Repair groups. Window replacement and gazebo construction were later re-added by the owner.
- **Consequences:** Old URLs are 301-redirected in `public/_redirects`.

### 2026-11 — Hosting on Cloudflare Workers (Static Assets), not a VPS
- **Decision:** GitHub `main` → Cloudflare Workers Builds → static files. Free tier.
- **Why:** The site is fully static; no server to maintain; global CDN; free SSL.
- **Consequences:** Nitro preset forced to `static` (CI auto-detection otherwise emits a Worker).
  Production indexing is detected from `WORKERS_CI_BRANCH=main`.

### 2026-11 — No backend, no admin panel (v1)
- **Decision:** Content in typed `data/*.ts` files; forms via Formspree.
- **Why:** Lowest cost and maintenance; fastest site; content changes are rare and handled in Git.
- **Consequences:** Editing content means a commit + push. Types mirror a CMS shape so a CMS or
  NestJS API can replace `data/` later without rewriting components.

### 2026-11 — Truth-first content policy
- **Decision:** Never publish unconfirmed business facts (reviews, ratings, years, counts,
  awards, insurance, warranties, prices). No `AggregateRating` schema.
- **Why:** Trust, legal exposure (CSLB/FTC), and Google's policies on self-serving markup.
- **Consequences:** Missing facts stay `null`/unpublished and are tracked in `BUSINESS-CHECKLIST.md`.
