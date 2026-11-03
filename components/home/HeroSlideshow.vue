<script setup lang="ts">
import type { ImageAsset } from '~/types'

/**
 * Full-bleed background slideshow for the homepage hero. Renders nothing when
 * empty (the hero falls back to its plain dark background), a single static
 * photo for one slide, or a slow auto-advancing crossfade for two or more.
 */
const props = defineProps<{ slides: ImageAsset[] }>()

const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.slides.length < 2) return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.slides.length
  }, 6000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div v-if="slides.length" class="absolute inset-0 overflow-hidden" aria-hidden="true">
    <NuxtImg
      v-for="(slide, i) in slides"
      :key="slide.src"
      format="webp"
      :src="slide.src"
      alt=""
      sizes="100vw"
      :loading="i === 0 ? 'eager' : 'lazy'"
      :fetchpriority="i === 0 ? 'high' : undefined"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
      :class="i === active ? 'opacity-100' : 'opacity-0'"
    />
    <!-- Scrim: keeps the hero text readable over any photo -->
    <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/75" />
  </div>
</template>
