<script setup lang="ts">
import type { ImageAsset } from '~/types'

/**
 * Shows a real photo when provided; otherwise a clearly labeled placeholder.
 * Placeholders are intentionally obvious so they can't be mistaken for project photos.
 */
const props = withDefaults(
  defineProps<{
    image?: ImageAsset | null
    icon?: string
    label?: string
    aspect?: string
    sizes?: string
    priority?: boolean
    tone?: 'light' | 'dark'
    rounded?: boolean
  }>(),
  {
    image: null,
    icon: 'Camera',
    label: 'Photo coming soon',
    aspect: 'aspect-[4/3]',
    sizes: 'xs:100vw sm:50vw lg:33vw',
    priority: false,
    tone: 'light',
    rounded: true
  }
)
</script>

<template>
  <div class="relative overflow-hidden" :class="[aspect, rounded ? 'rounded' : '']">
    <NuxtImg
      format="webp"
      v-if="props.image"
      :src="props.image.src"
      :alt="props.image.alt"
      :width="props.image.width"
      :height="props.image.height"
      :sizes="sizes"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div
      v-else
      class="absolute inset-0 flex flex-col items-center justify-center gap-3"
      :class="tone === 'dark' ? 'bg-ink text-stone/50 graph-paper-dark' : 'bg-stone-50 text-ink/35 graph-paper'"
      role="img"
      :aria-label="`${label} (placeholder)`"
    >
      <!-- corner ticks, like a drawing frame -->
      <span class="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-current" />
      <span class="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-current" />
      <span class="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-current" />
      <span class="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-current" />
      <AppIcon :name="icon" :size="34" :stroke-width="1.25" />
      <span class="text-xs font-semibold" :class="tone === 'dark' ? 'text-stone/60' : 'text-muted'">{{ label }}</span>
    </div>
    <slot />
  </div>
</template>
