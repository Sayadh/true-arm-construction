<script setup lang="ts">
import type { BeforeAfterPair } from '~/types'

/**
 * Accessible before/after comparison: a native range input drives the split,
 * so it works with mouse, touch, and keyboard (arrow keys, Home/End).
 */
/** `plain` renders <img> with the original files (for client-only views such as a lightbox, where no image variants were pre-generated). */
const props = defineProps<{ pair: BeforeAfterPair; id: string; plain?: boolean }>()
const pos = ref(50)
</script>

<template>
  <figure>
    <div class="relative aspect-[4/3] select-none overflow-hidden rounded bg-stone">
      <img v-if="plain" :src="props.pair.after.src" :alt="props.pair.after.alt" class="absolute inset-0 h-full w-full object-cover">
      <NuxtImg v-else format="webp" :src="props.pair.after.src" :alt="props.pair.after.alt" sizes="xs:100vw lg:60vw" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 overflow-hidden" :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
        <img v-if="plain" :src="props.pair.before.src" :alt="props.pair.before.alt" class="absolute inset-0 h-full w-full object-cover">
        <NuxtImg v-else format="webp" :src="props.pair.before.src" :alt="props.pair.before.alt" sizes="xs:100vw lg:60vw" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div class="pointer-events-none absolute inset-y-0 w-0.5 bg-paper shadow-[0_0_0_1px_rgb(16_23_25/0.3)]" :style="{ left: `${pos}%` }" aria-hidden="true">
        <span class="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow">
          ⇆
        </span>
      </div>
      <span class="absolute left-3 top-3 rounded-sm bg-deep/80 px-2 py-1 text-xs font-semibold text-paper">Before</span>
      <span class="absolute right-3 top-3 rounded-sm bg-deep/80 px-2 py-1 text-xs font-semibold text-paper">After</span>
      <label :for="`ba-${id}`" class="sr-only">Compare before and after. Slide to reveal more of the before photo.</label>
      <input
        :id="`ba-${id}`"
        v-model.number="pos"
        type="range"
        min="0"
        max="100"
        step="1"
        class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        :aria-valuetext="`${pos}% before`"
      >
    </div>
    <figcaption v-if="pair.caption" class="mt-3 text-sm text-muted">{{ pair.caption }}</figcaption>
  </figure>
</template>
