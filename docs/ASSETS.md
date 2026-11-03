# Replacing images and branding

All image references live in `data/`. Components never hardcode image paths.

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

## Homepage hero photo
Until a photo is set, the hero shows a drawn house elevation. To use a real photo (min. 2000px wide, landscape or 4:5):
```ts
heroImage: { src: '/images/hero/home-hero.jpg', alt: 'Describe the photo', width: 2400, height: 3000 }
```

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
Add image/PDF files to `public/images/certificates/` and an entry in `data/credentials.ts`. Set `status: 'confirmed'` only after verifying with the issuer.

## Social share image
`public/images/social/og-default.png` (1200×630) is the fallback for every page.

## Image guidance
- JPG or PNG source files; the build creates resized WebP versions automatically.
- Hero: ≥2000px wide. Service/project: ≥1600px wide. Keep files under ~3 MB.
- Write specific alt text describing what is visible.
