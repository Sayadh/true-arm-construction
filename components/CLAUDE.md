# CLAUDE.md: `components/`

Design rules live in [docs/DESIGN-SYSTEM.md](../docs/DESIGN-SYSTEM.md). This file covers how to write components here.

## Folders

| Folder | Purpose |
|---|---|
| `layout/` | `SiteHeader`, `MobileNav`, `SiteFooter`, `MobileActionBar`, `Wordmark` (used by `layouts/default.vue`) |
| `ui/` | Shared building blocks: `AppButton`, `AppIcon`, `PageHeader`, `CtaBand`, `MediaFrame`, `LicenseCard`, `LicenseTag`, `CredentialBadge`, `RichParagraphs` |
| `home/` | Homepage sections, one component per section, in page order in `pages/index.vue` |
| `services/` | `ServiceCard` and the animated scope/process illustrations (`EpoxyBuild`, `AdditionBuild`, `BaseboardBuild`, `HandymanBuild`, `ScrollSteps`, …) |
| `forms/` | `ProjectPlanner`, `ContactForm`, `ProjectNavigator` + `NavigatorPanel` (service finder), `NavIcon` |
| `work/`, `projects/` | Work media gallery, project cards, before/after slider, gallery lightbox |
| `reviews/`, `faq/`, `seo/` | Review cards and stars, FAQ accordion, breadcrumbs |

## Conventions

- `<script setup lang="ts">`, typed props with `defineProps<{…}>()`, `withDefaults` for defaults.
- **File names must be unique across folders** (auto-import uses the bare file name).
- **No content in components.** Read from `data/`. Small UI strings (button labels, headings) are fine.
- **Icons:** `<AppIcon name="Wrench" />`. A new icon name must be imported and registered in
  `ui/AppIcon.vue` (keeps the bundle small). In a component that needs a fixed icon you may
  import it from `lucide-vue-next` directly.
- **Buttons/links:** use `AppButton` (`to` for internal, `href` for external/tel/mailto,
  `track`/`track-label` for analytics). Add `data-primary-cta` to a page's own primary estimate
  button so the mobile sticky bar hides while it is visible.
- **Images:** `NuxtImg` with `format="webp"`, real `alt` (or `alt=""` + `aria-hidden` for
  decoration), and breakpoint `sizes` (never a bare `100vw`). Lazy-load anything below the fold.
- **Client-only APIs** (`window`, `IntersectionObserver`, `matchMedia`) only inside `onMounted`.
  Always disconnect observers / clear timers in `onBeforeUnmount`.
- **Motion:** prefer `v-reveal` for scroll entrances; wrap custom CSS animations in
  `@media (prefers-reduced-motion: no-preference)`. Never hide content in server HTML in a way
  that depends on JS to show it again, except decorative elements.
- **Analytics:** `useAnalytics().track(event, params)`; events are typed in
  `composables/useAnalytics.ts` and must never include personal data.
- **Sticky UI** uses `top-[var(--header-offset)]`.
