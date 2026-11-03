<script setup lang="ts">
import type { ImageAsset } from '~/types'

/**
 * Full-bleed background slideshow for the homepage hero. Renders nothing when
 * empty (the hero falls back to its plain dark background), a single static
 * photo for one slide, or a slow crossfade with a gentle push-in for two or more.
 */
const props = defineProps<{ slides: ImageAsset[] }>()

const active = ref(0)
const started = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return
  requestAnimationFrame(() => (started.value = true))
  if (props.slides.length < 2) return
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.slides.length
  }, 7000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <!-- On mobile the hero stacks very tall; keep the photo to the first screen so it isn't over-zoomed -->
  <div v-if="slides.length" class="absolute inset-x-0 top-0 h-[115svh] overflow-hidden lg:inset-0 lg:h-auto" aria-hidden="true">
    <NuxtImg
      v-for="(slide, i) in slides"
      :key="slide.src"
      format="webp"
      :src="slide.src"
      alt=""
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      :loading="i === 0 ? 'eager' : 'lazy'"
      :fetchpriority="i === 0 ? 'high' : undefined"
      class="slide absolute inset-0 h-full w-full object-cover"
      :class="[i === active ? 'opacity-100' : 'opacity-0', started && i === active ? 'is-pushing' : '']"
    />
    <!-- Scrim: forest wash, heaviest behind the text column -->
    <div class="absolute inset-0 bg-gradient-to-b from-deep/65 via-deep/75 to-deep lg:bg-gradient-to-r lg:from-deep/95 lg:via-deep/65 lg:to-deep/5" />
    <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep to-transparent lg:from-deep/80" />
  </div>
</template>

<style scoped>
.slide {
  transform: scale(1);
  transition: opacity 1.6s ease-in-out, transform 9s linear;
}
.slide.is-pushing { transform: scale(1.07); }
@media (prefers-reduced-motion: reduce) {
  .slide { transition: none; }
  .slide.is-pushing { transform: none; }
}
</style>
