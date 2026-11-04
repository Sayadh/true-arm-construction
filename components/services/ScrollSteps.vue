<script setup lang="ts">
import type { ServiceScopeItem } from '~/types'

/**
 * Shared shell for the scroll-driven service illustrations (room additions, epoxy, baseboards).
 * A sticky drawing on the left, the steps on the right; as a step reaches the band just below
 * the middle of the screen it becomes active and the drawing shows that stage. Scrolling back
 * up reverses it, and clicking a step jumps to it. The drawing comes from the default slot,
 * which receives `active` and `shown(stage)`. All step text stays in the HTML for SEO.
 */
const props = defineProps<{ steps: ServiceScopeItem[] }>()

const active = ref(0)
const stepEls = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const shown = (stage: number) => active.value >= stage

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.step)
      }
    },
    // a thin band below the middle of the screen (stays clear of the sticky drawing on phones)
    { rootMargin: '-62% 0px -34% 0px' }
  )
  stepEls.value.forEach((el) => observer?.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())

function goTo(i: number) {
  stepEls.value[i]?.scrollIntoView({ block: 'center' })
}
</script>

<template>
  <div class="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
    <!-- Sticky drawing -->
    <div class="sticky top-[76px] z-10 -mx-4 self-start sm:mx-0 lg:top-32 lg:col-span-6">
      <div class="overflow-hidden bg-deep shadow-lg sm:rounded">
        <div class="flex items-center justify-between gap-4 px-5 pt-4 sm:px-6 sm:pt-5">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-light">Step {{ active + 1 }} of {{ props.steps.length }}</p>
          <p class="truncate text-sm font-semibold text-paper" aria-live="polite">{{ props.steps[active]?.title }}</p>
        </div>
        <div class="mt-3 flex gap-1 px-5 sm:px-6" aria-hidden="true">
          <span v-for="(_, i) in props.steps" :key="i" class="h-1 flex-1 rounded-full transition-colors duration-500" :class="i <= active ? 'bg-bronze' : 'bg-stone/15'" />
        </div>
        <slot :active="active" :shown="shown" />
      </div>
    </div>

    <!-- Steps -->
    <ol class="lg:col-span-6">
      <li
        v-for="(s, i) in props.steps"
        :key="s.title"
        ref="stepEls"
        :data-step="i"
        class="flex min-h-[38vh] items-center border-l-2 py-8 pl-6 transition-colors duration-500 sm:pl-8 lg:min-h-[46vh]"
        :class="i <= active ? 'border-bronze' : 'border-stone-300'"
      >
        <button type="button" class="group text-left" @click="goTo(i)">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-500"
            :class="i === active ? 'scale-110 border-bronze bg-bronze text-white' : i < active ? 'border-bronze text-bronze-dark' : 'border-stone-300 text-muted'"
          >{{ i + 1 }}</span>
          <h3 class="mt-4 text-h3 transition-colors duration-500" :class="i === active ? 'text-ink' : 'text-ink/70'">{{ s.title }}</h3>
          <p class="mt-2 max-w-md text-[0.9375rem] transition-colors duration-500" :class="i === active ? 'text-body' : 'text-muted'">{{ s.text }}</p>
        </button>
      </li>
    </ol>
  </div>
</template>
