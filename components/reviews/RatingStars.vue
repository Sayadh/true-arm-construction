<script setup lang="ts">
import { Star } from 'lucide-vue-next'

/** Five stars filled to the given rating (fractional fill for the last star). */
const props = withDefaults(defineProps<{ rating: number; size?: number }>(), { size: 18 })
const fill = (i: number) => Math.max(0, Math.min(1, props.rating - (i - 1)))
</script>

<template>
  <span class="inline-flex items-center gap-0.5" role="img" :aria-label="`${rating.toFixed(1)} out of 5 stars`">
    <span v-for="i in 5" :key="i" class="relative inline-block" :style="{ width: `${size}px`, height: `${size}px` }" aria-hidden="true">
      <Star :size="size" class="absolute inset-0 text-stone-300" fill="currentColor" stroke-width="0" />
      <span class="absolute inset-0 overflow-hidden" :style="{ width: `${fill(i) * 100}%` }">
        <Star :size="size" class="text-[#E9A23B]" fill="currentColor" stroke-width="0" />
      </span>
    </span>
  </span>
</template>
