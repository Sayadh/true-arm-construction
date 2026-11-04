<script setup lang="ts">
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
import { navigatorChoices } from '~/data/planner'

/**
 * Service finder. Direct choices are plain links (work without JS); choices
 * with a follow-up question open a panel of answers. On phones the panel opens
 * right under the tapped card; on larger screens it opens under the grid and
 * scrolls into view, so the next step is never off screen.
 */
withDefaults(defineProps<{ showAllLink?: boolean }>(), { showAllLink: true })

const NuxtLink = resolveComponent('NuxtLink')
const { track } = useAnalytics()
const active = ref<number | null>(null)
const desktopPanel = ref<HTMLElement | null>(null)
const mobilePanel = ref<HTMLElement[] | null>(null)

const current = computed(() => (active.value === null ? null : navigatorChoices[active.value]))

async function open(i: number) {
  active.value = active.value === i ? null : i
  if (active.value === null) return
  await nextTick()
  const isPhone = window.matchMedia('(max-width: 639px)').matches
  const el = isPhone ? mobilePanel.value?.[0] : desktopPanel.value
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
  el.focus({ preventScroll: true })
}

// Entrance: cards rise in one after another the first time the grid scrolls into view.
// Armed only after mount, so without JS (or before hydration) everything is simply visible.
const grid = ref<HTMLElement | null>(null)
const armed = ref(false)
const shownIn = ref(false)
let io: IntersectionObserver | null = null
onMounted(() => {
  if (!grid.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  armed.value = true
  io = new IntersectionObserver(
    ([e]) => {
      if (!e?.isIntersecting) return
      shownIn.value = true
      io?.disconnect()
    },
    { threshold: 0.15 }
  )
  io.observe(grid.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  liveIo?.disconnect()
})

// Touch screens have no hover: the card passing through the middle of the screen
// gets the same treatment (icon animation, accent line, dark icon tile).
const live = ref<number | null>(null)
let liveIo: IntersectionObserver | null = null
onMounted(() => {
  if (!grid.value || !window.matchMedia('(hover: none)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  liveIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const idx = Number((e.target as HTMLElement).dataset.idx)
        if (e.isIntersecting) live.value = idx
        else if (live.value === idx) live.value = null
      }
    },
    { rootMargin: '-38% 0px -38% 0px' }
  )
  grid.value.querySelectorAll<HTMLElement>('[data-idx]').forEach((el) => liveIo?.observe(el))
})
const lit = (i: number) => active.value === i || live.value === i

// Soft light that follows the pointer inside a card (no re-render: CSS variables only)
function spot(ev: PointerEvent) {
  const el = ev.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${ev.clientX - r.left}px`)
  el.style.setProperty('--my', `${ev.clientY - r.top}px`)
}

function recommend(service: string) {
  track('navigator_recommendation', { service })
}
</script>

<template>
  <div>
    <ul ref="grid" class="nav-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4" :class="{ armed, in: shownIn }">
      <template v-for="(c, i) in navigatorChoices" :key="c.label">
        <li class="nav-item" :style="{ '--i': i }">
          <component
            :is="c.service ? NuxtLink : 'button'"
            v-bind="c.service ? { to: `/services/${c.service}` } : { type: 'button', 'aria-expanded': active === i, 'aria-controls': 'navigator-panel' }"
            :data-idx="i"
            class="choice group relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white p-5 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_22px_50px_-30px_rgba(19,41,75,0.55)] sm:p-6"
            :class="[{ live: live === i }, active === i ? 'border-bronze shadow-[0_22px_50px_-30px_rgba(19,41,75,0.55)] ring-1 ring-bronze' : 'border-stone-300']"
            @click="c.service ? recommend(c.service) : open(i)"
            @pointermove="spot"
          >
            <span class="spot" aria-hidden="true" />
            <span
              class="icon-tile relative flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300"
              :class="lit(i) ? 'on bg-ink text-paper' : 'bg-ink/[0.05] text-ink group-hover:bg-ink group-hover:text-paper'"
            >
              <NavIcon :name="c.icon" :drawn="shownIn || !armed" :active="lit(i)" />
            </span>
            <span class="relative mt-5 block text-lg font-bold leading-snug text-ink">{{ c.label }}</span>
            <span class="relative mt-1 block text-[0.9375rem] text-muted">{{ c.description }}</span>

            <span class="block min-h-[1.25rem] flex-1" aria-hidden="true" />
            <span class="relative flex items-center justify-between gap-3 border-t border-stone-300 pt-4">
              <span class="line absolute -top-px left-0 h-px w-full bg-bronze" :class="{ full: active === i }" aria-hidden="true" />
              <span class="text-sm font-semibold text-ink">
                {{ c.service ? 'See the service' : `${c.next?.options.length} options to choose from` }}
              </span>
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300"
                :class="active === i ? 'bg-bronze text-white' : 'bg-paper text-ink group-hover:bg-ink group-hover:text-paper'"
                aria-hidden="true"
              >
                <ArrowRight v-if="c.service" :size="16" class="transition-transform duration-300 group-hover:translate-x-0.5" />
                <ChevronDown v-else :size="16" class="transition-transform duration-300" :class="active === i ? 'rotate-180' : 'group-hover:translate-y-0.5'" />
              </span>
            </span>
          </component>
        </li>

        <!-- Phones: the follow-up opens directly under the tapped card -->
        <li v-if="active === i && current?.next" class="sm:hidden">
          <div id="navigator-panel-mobile" ref="mobilePanel" tabindex="-1" class="scroll-mt-28 outline-none" aria-live="polite">
            <NavigatorPanel :choice="current" @close="active = null" @pick="recommend" />
          </div>
        </li>
      </template>

      <li v-if="showAllLink" class="nav-item sm:col-span-2 lg:col-span-2" :style="{ '--i': navigatorChoices.length }">
        <NuxtLink
          to="/services"
          :data-idx="navigatorChoices.length"
          class="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-lg bg-ink p-6 text-paper transition-transform duration-300 hover:-translate-y-1"
        >
          <span class="graph-paper-dark drift absolute -inset-10" aria-hidden="true" />
          <span class="glow absolute -right-24 -top-24 h-72 w-72 rounded-full" aria-hidden="true" />
          <span class="icon-tile dark relative flex h-14 w-14 items-center justify-center rounded-xl bg-paper/10 text-paper">
            <NavIcon name="ClipboardList" :drawn="shownIn || !armed" :active="live === navigatorChoices.length" />
          </span>
          <span class="relative mt-6 flex items-end justify-between gap-4">
            <span>
              <span class="block font-display text-[1.875rem] font-extrabold leading-none [font-stretch:78%]">Not sure? See every service</span>
              <span class="mt-2 block text-sm text-stone/70">Remodeling, flooring, painting, fences and repairs in one place.</span>
            </span>
            <span class="nudge inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bronze text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <ArrowRight :size="18" />
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Tablets and desktops: the follow-up opens under the grid -->
    <Transition name="drop">
      <div
        v-if="current?.next"
        id="navigator-panel"
        ref="desktopPanel"
        tabindex="-1"
        class="mt-4 hidden scroll-mt-32 outline-none sm:block"
        aria-live="polite"
      >
        <NavigatorPanel :choice="current" @close="active = null" @pick="recommend" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* entrance: rise in one after another */
.armed .nav-item { opacity: 0; transform: translateY(18px); }
.armed.in .nav-item {
  opacity: 1;
  transform: none;
  transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: calc(var(--i) * 70ms);
}

/* pointer light */
.spot {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgb(198 61 44 / 0.07), transparent 70%);
  transition: opacity 0.35s ease;
}
.choice:hover .spot, .choice.live .spot { opacity: 1; }

/* icon tile: accent color for the drawing, small lift on hover */
.icon-tile { --accent: #C63D2C; transition: background-color 0.3s ease, color 0.3s ease, transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1), box-shadow 0.3s ease; }
.choice:hover .icon-tile, .icon-tile.on, .icon-tile.dark { --accent: #F0907A; }
.choice:hover .icon-tile, .choice.live .icon-tile { transform: translateY(-2px); box-shadow: 0 10px 22px -12px rgb(19 41 75 / 0.7); }

/* divider fills with the accent color */
.line { transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.choice:hover .line, .choice.live .line, .line.full { transform: scaleX(1); }

/* "Not sure" card: slow drifting grid, soft glow, arrow nudge now and then */
.drift { animation: drift 24s linear infinite; }
@keyframes drift { from { transform: translate(0, 0); } to { transform: translate(40px, 40px); } }
.glow { background: radial-gradient(closest-side, rgb(198 61 44 / 0.28), transparent); animation: breathe 6s ease-in-out infinite; }
@keyframes breathe { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
.nudge { animation: nudge 4.5s ease-in-out infinite; }
.group:hover .nudge { animation: none; }
@keyframes nudge { 0%, 82%, 100% { transform: translateX(0); } 88% { transform: translateX(5px); } 94% { transform: translateX(0); } }

@media (prefers-reduced-motion: reduce) {
  .drift, .glow, .nudge { animation: none; }
  .icon-tile, .line { transition: none; }
}

.drop-enter-active, .drop-leave-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(.2, .7, .2, 1); }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
