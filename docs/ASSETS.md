# Replacing images and branding

Image references live in `data/`, except the homepage stock photos listed under "Stock photos" below.

## Logo and icons
The official logo is wired in `data/company.ts` → `logo.src` (header, mobile menu, footer, and Organization schema for Google).

| File | Size | Used for |
|---|---|---|
| `public/images/brand/true-arm-construction-logo.png` | 1085×952, transparent | Master file (print, Google Business Profile, social profiles) |
| `public/images/brand/logo.png` | 600×526, transparent | Site logo + schema.org `logo` |
| `public/images/brand/logo.webp` | 600×526 | Same, smaller; served first via `<picture>` |
| `public/favicon.ico` | 16, 32, 48 | Browsers and Google Search results favicon |
| `public/favicon-96x96.png` | 96×96 | Modern browsers, Google (multiple of 48px) |
| `public/apple-touch-icon.png` | 180×180, white background | iPhone/iPad home screen |
| `public/web-app-manifest-192x192.png`, `-512x512.png` | transparent | Android / `site.webmanifest` |
| `public/web-app-manifest-512x512-maskable.png` | 512×512, white, safe-zone padding | Android adaptive icons |
| `public/images/social/og-default.png` | 1200×630 | Facebook / iMessage / LinkedIn link previews |

To replace the logo, regenerate every file above from the new master with the same names and sizes.
Google picks up a new favicon only after it recrawls the homepage (days to weeks); requesting indexing of `/` in Search Console speeds it up.

## Homepage hero

The hero background is a slideshow: `company.heroSlides` in `data/company.ts` (crossfade every
7s with a slow push-in; one photo = static; empty list = plain navy background).

```ts
heroSlides: [
  { src: '/images/hero/slides/slide-1.jpg', alt: '' },   // decorative: alt stays empty
  { src: '/images/hero/slides/slide-2.jpg', alt: '' }
]
```

Use wide (≥2000px), simply composed photos. A navy scrim keeps the text readable. The slides
currently point to licensed stock in `public/images/stock/`; swap in real work when available.

The blueprint drawing card on the right is shown while `heroImage` is `null`. Setting
`heroImage` (min. 2000px, landscape or 4:5) replaces the drawing with a photo:
```ts
heroImage: { src: '/images/hero/home-hero.jpg', alt: 'Describe the photo', width: 2400, height: 3000 }
```

## Stock photos (homepage only)

`public/images/stock/` holds licensed Unsplash photos used as atmosphere on the homepage
(hero slides, service-group tiles in `HomeServices.vue`, `HomeWhy.vue`, `HomeProcess.vue`,
`components/ui/CtaBand.vue`). They must never be used as project or work media. To replace one,
keep the same file name or update the reference.

## Work photos and videos (service pages, /projects, homepage)
1. Put files in an inbox folder with one sub-folder per service slug (`kitchen-remodeling`, `fences-gates`, …). Photos: JPG, PNG, WebP, HEIC. Videos: MP4, MOV (up to ~60 s).
2. Before/after pairs: same name ending in `-before` / `-after` (`oak-st-before.jpg`, `oak-st-after.jpg`). Start a name with `1-` to feature it (shown first and on the homepage).
3. Run `npm run media:import -- /path/to/inbox` (needs `ffmpeg` for videos and HEIC: `brew install ffmpeg`).
   - Photos → `public/images/work/<service>/` (max 2400 px, EXIF and GPS removed, rotation fixed)
   - Videos → `public/videos/work/<service>/` (H.264, no audio, under 12 MB) + poster image
   - Entries → `data/work-media.ts`. Edit `alt` and `caption` there; re-running the import keeps your edits and skips files already imported.
4. The gallery layout adapts to the count (1 wide, 2 side by side, 3 feature + two, 4 grid, 5+ feature + grid with "Show all"). Each service page shows its own work; `/projects` shows everything with service filters; the homepage shows the best item from each service.

## Service photos
In `data/services.ts`, fill each service's `images` array. The first image is used for cards and the service page hero; additional images appear in a photo grid on the service page.
```ts
images: [{ src: '/images/services/bathroom-1.jpg', alt: 'Walk-in tile shower with glass door', width: 1600, height: 1200 }]
```
Use only photos the company owns or has licensed. Generic stock must never imply it is True Arm work.

## Projects
1. Create `public/images/projects/<slug>/` and add `cover.jpg`, gallery photos, and before/after pairs.
2. Add an entry to `data/projects.ts` (see the commented example) with `published: true`.
3. Run `npm run generate`. The project page, sitemap entry, filters, lightbox, and before/after slider are created automatically. `/projects` becomes indexable once at least one project is published.

## Certificates
Add the logo/scan to `public/images/certificates/` (PNG/JPG ~800px wide; logos are shown whole,
never cropped) and an entry in `data/credentials.ts` (see `docs/CONTENT-GUIDE.md`). Set
`status: 'confirmed'` only after verifying with the issuer. Current: EPA Lead-Safe Certified Firm
(`epa-lead-safe-certified-firm.png`).

## Social share image
`public/images/social/og-default.png` (1200×630) is the fallback for every page.

## Image guidance
- JPG or PNG source files; the build creates resized WebP versions automatically.
- In components, give `<NuxtImg>` breakpoint `sizes` (e.g. `xs:100vw lg:50vw`); a bare `100vw` produces tiny images.
- Hero: ≥2000px wide. Service/project: ≥1600px wide. Keep files under ~3 MB.
- Write specific alt text describing what is visible.
