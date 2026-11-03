<script setup lang="ts">
import { ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { navigatorChoices } from '~/data/planner'
import { getService } from '~/data/services'
import { estimatePath } from '~/data/navigation'

/**
 * Lightweight service finder. Direct choices are plain links (work without JS);
 * choices with follow-ups expand inline and recommend a service page.
 */
withDefaults(defineProps<{ showAllLink?: boolean }>(), { showAllLink: true })

const { track } = useAnalytics()
const active = ref<number | null>(null)
const panel = ref<HTMLElement | null>(null)

const current = computed(() => (active.value === null ? null : navigatorChoices[active.value]))

async function open(i: number) {
  active.value = active.value === i ? null : i
  await nextTick()
  panel.value?.focus()
}

function recommend(service: string) {
  track('navigator_recommendation', { service })
}

const svc = (slug: string) => getService(slug)
</script>

<template>
  <div>
    <ul class="grid gap-px overflow-hidden rounded border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(c, i) in navigatorChoices" :key="c.label" class="bg-paper">
        <NuxtLink
          v-if="c.service"
          :to="`/services/${c.service}`"
          class="group flex h-full min-h-[9.5rem] flex-col justify-between gap-6 p-6 transition-colors hover:bg-white"
          @click="recommend(c.service)"
        >
          <AppIcon :name="c.icon" :size="30" class="text-bronze-dark" />
          <span>
            <span class="flex items-center justify-between gap-3 text-lg font-bold text-ink">
              {{ c.label }}
              <ArrowRight :size="18" aria-hidden="true" class="shrink-0 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span class="mt-1 block text-[0.9375rem] text-muted">{{ c.description }}</span>
          </span>
        </NuxtLink>
        <button
          v-else
          type="button"
          class="group flex h-full min-h-[9.5rem] w-full flex-col justify-between gap-6 p-6 text-left transition-colors hover:bg-white"
          :class="active === i ? 'bg-white ring-2 ring-inset ring-bronze' : ''"
          :aria-expanded="active === i"
          aria-controls="navigator-panel"
          @click="open(i)"
        >
          <AppIcon :name="c.icon" :size="30" class="text-bronze-dark" />
          <span>
            <span class="flex items-center justify-between gap-3 text-lg font-bold text-ink">
              {{ c.label }}
              <span class="text-sm font-semibold text-bronze-dark">{{ active === i ? 'Close' : 'Choose' }}</span>
            </span>
            <span class="mt-1 block text-[0.9375rem] text-muted">{{ c.description }}</span>
          </span>
        </button>
      </li>
      <li v-if="showAllLink" class="bg-ink sm:col-span-2 lg:col-span-2">
        <NuxtLink to="/services" class="group flex h-full min-h-[9.5rem] flex-col justify-between gap-6 p-6 text-paper">
          <AppIcon name="ClipboardList" :size="30" class="text-bronze-light" />
          <span class="flex items-center justify-between gap-3 text-lg font-bold">
            Explore all services
            <ArrowRight :size="18" aria-hidden="true" class="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </span>
        </NuxtLink>
      </li>
    </ul>

    <div
      v-if="current?.next"
      id="navigator-panel"
      ref="panel"
      tabindex="-1"
      class="mt-4 rounded border border-stone-300 bg-white p-6 outline-none sm:p-8"
      aria-live="polite"
    >
      <div class="flex items-start justify-between gap-4">
        <p class="text-h3 text-ink">{{ current.next.question }}</p>
        <button type="button" class="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-muted hover:text-ink" @click="active = null">
          <ArrowLeft :size="16" aria-hidden="true" /> Back
        </button>
      </div>
      <ul class="mt-6 grid gap-3 md:grid-cols-2">
        <li v-for="o in current.next.options" :key="o.service" class="flex flex-col justify-between gap-4 rounded border border-stone-300 p-5">
          <div>
            <p class="font-bold text-ink">{{ o.label }}</p>
            <p class="mt-1 text-[0.9375rem] text-muted">We recommend: {{ svc(o.service)?.name }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
            <NuxtLink :to="`/services/${o.service}`" class="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-4" @click="recommend(o.service)">
              View {{ svc(o.service)?.shortName.toLowerCase() }}
            </NuxtLink>
            <NuxtLink :to="`${estimatePath}?service=${o.service}`" class="text-sm font-semibold text-bronze-dark hover:underline" @click="recommend(o.service)">
              Start an estimate
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
