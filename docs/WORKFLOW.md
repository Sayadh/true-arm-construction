# Workflow

Day-to-day process for changing the site safely, for people and for AI assistants.

## 1. Local setup

```bash
git clone https://github.com/Sayadh/true-arm-construction.git
cd true-arm-construction
npm install                 # Node 20.19+ (22 LTS recommended)
cp .env.example .env        # optional
npm run dev                 # http://localhost:3000
```

Run `npm install` again whenever `package.json` changes (for example after pulling a commit that
added a font or library). Restart `npm run dev` afterwards.

## 2. Making a change

1. **Clarify first.** For a new feature or a visible design change, agree on the scope and
   the look before writing code (ask the owner; offer 2–3 options when taste is involved).
2. **Find the source of truth.** Content → `data/`. Look → tokens in `tailwind.config.ts` /
   `main.css`, then the component. Behavior → the component or composable.
3. **Change the smallest thing that solves it.** Keep existing architecture, naming, and URLs.
4. **Verify** (all must pass):

   ```bash
   npm run typecheck
   npm run generate
   npm run check:links
   npx serve .output/public      # look at it: desktop 1440px and mobile 390px
   ```

   For visual work also check: no console errors, reduced-motion still readable, sticky header
   not covering content, text over photos legible.
5. **Commit only your files** with a message that explains why:

   ```bash
   git add path/to/changed/files
   git commit -m "Short summary

   Why the change was needed and what it does."
   ```

   Do not use `git add -A` (the owner may have unrelated work in progress; `.idea/` stays out).
6. **Deploy:** `git push` to `main`. Cloudflare builds and deploys in ~1–2 minutes.
7. **Check live:** open https://truearmconstruction.com (hard refresh) and the changed pages.
   After content changes that matter for search, run `npm run indexnow`.

## 3. Checklists

**New or changed page**
- [ ] One `<h1>`; `usePageSeo` with unique title (~60 chars) and description (~150 chars)
- [ ] `useJsonLd` with at least `organizationSchema()`, `webPageSchema()`, `breadcrumbSchema()`
- [ ] Linked from navigation, footer, or a related page (crawlable)
- [ ] Prerendered (dynamic routes come from data lists in `nuxt.config.ts`)

**New component**
- [ ] Unique file name; typed props; no hardcoded content
- [ ] Tokens only (no hex); works at 390px; keyboard focus visible
- [ ] Animations guarded for reduced motion; observers/timers cleaned up

**Removed or renamed URL**
- [ ] 301 in `public/_redirects`
- [ ] All internal references updated (`npm run check:links` passes)

## 4. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Dev error `Cannot find package '@fontsource-variable/…'` (or any package) | `package.json` changed, local `node_modules` not updated | `npm install`, restart `npm run dev` |
| Cloudflare deploy: `entry-point file at "index.mjs" was not found` | Nitro switched to a server preset | Keep `preset: 'static'` in `nuxt.config.ts`; build command must be `npm run generate` |
| Live site is `noindex` / robots blocks all | Build not detected as production | See `docs/SEO.md` → "Going live"; remove a stray `NUXT_PUBLIC_SITE_ENV` in Cloudflare |
| Images look blurry or are 1–2px wide | Bare `sizes="100vw"` on `<NuxtImg>` | Use breakpoint `sizes` (see `components/CLAUDE.md`) |
| `generate` fails with a 404 during prerender | A link points to a page that doesn't exist (disabled service, typo) | Fix the link or the data; check `related`/planner slugs |
| `check:links` reports duplicate title/description | Two pages share SEO text | Make each unique in `data/` |
| Sticky bar overlaps content on large screens | Used `--header-h` | Use `--header-offset` |
| Anchor link jumps to the wrong place | Native hash jump + router scroll | Use `useAnchorScroll().scrollToId` |
| Form says "not connected" | No form endpoint | Default Formspree endpoint is in `nuxt.config.ts`; see `docs/FORMS.md` |
| `git` fails with `index.lock: File exists` | A previous git process was interrupted | Make sure no git is running, then delete `.git/index.lock` |

## 5. Working with an AI assistant (Claude)

- Start the session from the repository root so `CLAUDE.md` is loaded.
- Give the goal and constraints ("on mobile", "only the homepage", "don't change the copy").
- Attach a screenshot for visual issues; say which page and screen size.
- Ask for screenshots of the result, then `git push` yourself.
- Keep `CLAUDE.md`, `data/CLAUDE.md`, `components/CLAUDE.md`, and these docs updated when a
  convention or decision changes (the assistant should do this as part of the change).
