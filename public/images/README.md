# Image folders

| Folder | What goes here | Wired up in |
|---|---|---|
| `brand/` | Official logo (`logo.png` + `logo.webp`, master `true-arm-construction-logo.png`) | `data/company.ts` → `logo.src` |
| `hero/` | Homepage hero photo (min 2000px wide) | `data/company.ts` → `heroImage` |
| `services/` | Service photos, e.g. `services/bathroom-1.jpg` | `data/services.ts` → `images` of each service |
| `projects/<slug>/` | Real project photos (cover, gallery, before/after) | `data/projects.ts` |
| `certificates/` | Certificate images / PDFs | `data/credentials.ts` |
| `social/` | Open Graph share image (1200×630) | `data/company.ts` → `defaultOgImage` |

Only original, authorized photos. Generic stock photos must never be presented as True Arm Construction projects.
See `docs/ASSETS.md` for details.
