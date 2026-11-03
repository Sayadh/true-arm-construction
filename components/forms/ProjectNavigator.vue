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

function recommend(service: string) {
  track('navigator_recommendation', { service })
}
</script>

<template>
  <div>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <template v-for="(c, i) in navigatorChoices" :key="c.label">
        <li>
          <component
            :is="c.service ? NuxtLink : 'button'"
            v-bind="c.service ? { to: `/services/${c.service}` } : { type: 'button', 'aria-expanded': active === i, 'aria-controls': 'navigator-panel' }"
            class="choice group flex h-full w-full flex-col rounded-lg border bg-white p-5 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_22px_50px_-30px_rgba(30,58,48,0.55)] sm:p-6"
            :class="active === i ? 'border-bronze shadow-[0_22px_50px_-30px_rgba(30,58,48,0.55)] ring-1 ring-bronze' : 'border-stone-300'"
            @click="c.service ? recommend(c.service) : open(i)"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-md transition-colors duration-300"
              :class="active === i ? 'bg-ink text-bronze-light' : 'bg-ink/[0.06] text-bronze-dark group-hover:bg-ink group-hover:text-bronze-light'"
            >
              <AppIcon :name="c.icon" :size="24" />
            </span>
            <span class="mt-5 block text-lg font-bold leading-snug text-ink">{{ c.label }}</span>
            <span class="mt-1 block text-[0.9375rem] text-muted">{{ c.description }}</span>

            <span class="block min-h-[1.25rem] flex-1" aria-hidden="true" />
            <span class="flex items-center justify-between gap-3 border-t border-stone-300 pt-4">
              <span class="text-sm font-semibold text-ink">
                {{ c.service ? 'See the service' : `${c.next?.options.length} options to choose from` }}
              </span>
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300"
                :class="active === i ? 'bg-bronze text-deep' : 'bg-paper text-ink group-hover:bg-ink group-hover:text-paper'"
                aria-hidden="true"
              >
                <ArrowRight v-if="c.service" :size="16" class="transition-transform duration-300 group-hover:translate-x-0.5" />
                <ChevronDown v-else :size="16" class="transition-transform duration-300" :class="active === i ? 'rotate-180' : ''" />
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

      <li v-if="showAllLink" class="sm:col-span-2 lg:col-span-2">
        <NuxtLink
          to="/services"
          class="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-lg bg-ink p-6 text-paper transition-transform duration-300 hover:-translate-y-1"
        >
          <span class="graph-paper-dark absolute inset-0" aria-hidden="true" />
          <span class="relative flex h-12 w-12 items-center justify-center rounded-md bg-paper/10 text-bronze-light">
            <AppIcon name="ClipboardList" :size="24" />
          </span>
          <span class="relative mt-6 flex items-end justify-between gap-4">
            <span>
              <span class="block font-display text-[1.875rem] font-extrabold leading-none [font-stretch:78%]">Not sure? See every service</span>
              <span class="mt-2 block text-sm text-stone/70">Remodeling, flooring, painting, fences and repairs in one place.</span>
            </span>
            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bronze text-deep transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
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
.drop-enter-active, .drop-leave-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(.2, .7, .2, 1); }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
