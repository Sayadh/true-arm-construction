<script setup lang="ts">
import { ArrowRight, X } from 'lucide-vue-next'
import type { NavigatorChoice } from '~/data/planner'
import { getService } from '~/data/services'
import { estimatePath } from '~/data/navigation'

/** Follow-up step of the service finder: one question, each answer recommends a service. */
const props = defineProps<{ choice: NavigatorChoice }>()
const emit = defineEmits<{ close: []; pick: [service: string] }>()

const svc = (slug: string) => getService(slug)
const options = computed(() => props.choice.next?.options ?? [])
</script>

<template>
  <div class="rounded-lg border border-bronze/40 bg-white p-5 shadow-[0_24px_60px_-36px_rgba(19,41,75,0.45)] sm:p-7">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold text-bronze-dark">{{ choice.label }}</p>
        <p class="mt-1 font-display text-[1.75rem] font-extrabold leading-none text-ink [font-stretch:78%]">{{ choice.next?.question }}</p>
      </div>
      <button
        type="button"
        class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-muted transition-colors hover:border-ink hover:text-ink"
        aria-label="Close"
        @click="emit('close')"
      >
        <X :size="16" aria-hidden="true" />
      </button>
    </div>

    <ul class="mt-6 grid gap-3" :class="options.length > 3 ? 'md:grid-cols-2' : 'md:grid-cols-3'">
      <li
        v-for="(o, i) in options"
        :key="o.service"
        class="option group relative flex flex-col justify-between gap-5 rounded-md border border-stone-300 bg-paper/60 p-5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-white"
        :style="{ '--i': i }"
      >
        <div>
          <p class="text-lg font-bold leading-snug text-ink">
            <NuxtLink :to="`/services/${o.service}`" class="after:absolute after:inset-0 after:rounded-md" @click="emit('pick', o.service)">
              {{ o.label }}
            </NuxtLink>
          </p>
          <p class="mt-1.5 text-sm text-muted">
            Best fit: <span class="font-semibold text-ink">{{ svc(o.service)?.name }}</span>
          </p>
        </div>
        <div class="flex items-center justify-between gap-3">
          <NuxtLink
            :to="`${estimatePath}?service=${o.service}`"
            class="relative z-10 text-sm font-semibold text-bronze-dark underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze-dark"
            @click="emit('pick', o.service)"
          >
            Start an estimate
          </NuxtLink>
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-colors group-hover:bg-bronze group-hover:text-white" aria-hidden="true">
            <ArrowRight :size="16" />
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .option {
    animation: option-in 0.45s cubic-bezier(.2, .7, .2, 1) both;
    animation-delay: calc(var(--i) * 60ms + 80ms);
  }
}
@keyframes option-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
</style>
