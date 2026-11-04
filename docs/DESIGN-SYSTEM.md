# Design system

The visual language is **"construction drawing"**: navy and signal red taken from the logo, warm
white paper, condensed signage-style headlines, and drawing motifs (dimension lines, graph paper,
title blocks). Restraint first; one memorable moment per section.

Sources of truth: `tailwind.config.ts` (tokens) and `assets/css/main.css` (base styles,
components, utilities). Change values there, not in templates.

## Color tokens

Token names are historical (the palette has changed twice) but stable: change the hex in
`tailwind.config.ts` and every page re-themes. **Never use raw hex in templates.**

| Token | Hex | Use |
|---|---|---|
| `ink` | `#13294B` | Navy. Headings, dark sections, primary dark UI |
| `deep` | `#0C1B33` | Deepest navy. Footer, hero/photo scrims, overlays |
| `paper` | `#F8F6F2` | Page background, text on dark |
| `stone` (50–400) | `#F0EDE7` → `#ABA497` | Alternate section backgrounds (`bg-stone-50`), borders (`border-stone-300`), light text on dark (`text-stone/70`) |
| `bronze` | `#C63D2C` | **Red accent** (logo red, muted). Primary buttons, ticks, focus ring |
| `bronze-light` | `#F0907A` | Accent text/icons **on navy** |
| `bronze-dark` | `#A2301F` | Accent text **on white** (passes contrast) |
| `body` | `#262B33` | Body text |
| `muted` | `#5D6370` | Secondary text |
| `slate-line` / `slate-soft` | `#2A3F63` / `#9FB0C8` | Hairlines and soft text on navy |

Also update the two hardcoded spots when the palette changes: `:focus-visible` outline in
`main.css` and `theme-color` in `nuxt.config.ts` (plus SVG strokes in `HeroElevation.vue`).

Dark sections use `class="on-dark bg-ink text-stone"` (or `bg-deep`); `.kicker` switches to the
light accent inside `.on-dark`.

## Typography

| Role | Family | Setting |
|---|---|---|
| Headlines (`h1`, `h2`, `.text-display/.text-h1/.text-h2`) | Archivo Variable | `font-stretch: 78%`, weight 780–800, tight leading |
| Body, UI, `h3`+ | Manrope Variable | 17px base, line-height 1.65, `ss01` |

Fluid scale (Tailwind `fontSize`): `text-display` (hero), `text-h1` (page titles), `text-h2`
(section titles), `text-h3` (card titles), `text-lead` (intros). For a one-off headline in
Archivo use `font-display … [font-stretch:78%]`.

Rules: sentence case; no all-caps labels; no accenting a single word in a headline; keep line
length under ~70 characters (`max-w-prose`, `max-w-2xl`).

## Layout

- Container: `.wrap` (max 80rem, 16/24/40px gutters). Section rhythm: `.section`
  (64/80/112px vertical padding). Alternate light sections with `bg-stone-50`.
- 12-column grids on desktop (`lg:grid-cols-12`), single column on mobile.
- Radii: `rounded-sm` 3px, `rounded` 6px, `rounded-lg` 10px (cards, tiles, panels).
- Sticky elements: `top-[var(--header-offset)]` (header height incl. the xl utility bar).
- Bottom padding on mobile (`pb-20`) leaves room for the sticky action bar.

## Motifs

| Motif | How |
|---|---|
| Dimension line | `<div class="dim-line text-bronze/70" />` (hairline with end ticks) |
| Graph paper | `.graph-paper` (light) / `.graph-paper-dark` (on navy), usually `absolute inset-0` |
| Title block | Bordered 2×2 cell grid, as on a drawing (hero figure caption) |
| Blueprint elevation | `HeroElevation.vue` SVG, draws itself on view |
| Survey point | Concentric rings + crosshair (service-area panel) |
| Credential strip | Glass panel with icon rings (hero trust row) |

## Photography

- **Real work** (`public/images/work/`, `data/work-media.ts`): projects, service pages, galleries.
- **Licensed stock** (`public/images/stock/`, Unsplash License): homepage atmosphere only (hero
  slideshow, service-group tiles, "Why choose", process background, CTA band). Never captioned
  or listed as True Arm work. Replace with real photos as they arrive.
- Text over photos always sits on a navy scrim (`bg-gradient-to-* from-deep …`). Check legibility.

## Motion

Principle: restrained and purposeful. One orchestrated moment on load (hero), gentle entrances on
scroll, feedback on interaction. **Everything respects `prefers-reduced-motion`**
(global override in `main.css` + per-component guards).

| Pattern | API |
|---|---|
| Scroll entrance (fade + rise) | `v-reveal` or `v-reveal="{ delay: 120 }"` |
| Image unveil (top-down wipe + settle) | `v-reveal="'wipe'"` on the image wrapper |
| Stagger | `v-reveal="{ delay: i * 80 }"` |
| Hero load sequence | `.intro-item` / `.word-in` CSS in `HomeHero.vue` |
| Hover | Cards lift `-translate-y-1` + border to `ink`; images `scale-[1.05]` over ~1.4s |

Easing: `cubic-bezier(.2,.7,.2,1)` (Tailwind `ease-out`). Durations: 300ms for UI feedback,
0.8–1.2s for entrances.

## Components to reuse

`AppButton` (variants `primary`, `dark`, `outline`, `outline-light`, `quiet`; sizes `md`, `lg`),
`AppIcon`, `PageHeader`, `CtaBand`, `MediaFrame` (photo or clearly labeled placeholder),
`LicenseCard`, `LicenseTag`, `CredentialBadge`, `FaqAccordion`, `ServiceCard`,
`ProjectNavigator`.

## Quality floor

- Contrast AA for text; accent text on white uses `bronze-dark`, on navy `bronze-light`.
- Visible keyboard focus (global `:focus-visible`), 44px minimum touch targets (`AppButton` sizes).
- Check every visual change at 390px and 1440px.
