# Replacing images and branding

All image references live in `data/`. Components never hardcode image paths.

## Logo
Put `logo.svg` in `public/images/brand/` and set in `data/company.ts`:
```ts
logo: { src: '/images/brand/logo.svg', alt: 'True Arm Construction' }
```
The typographic wordmark disappears everywhere automatically. Also replace `public/favicon.svg` and `public/apple-touch-icon.png` (180×180).

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
