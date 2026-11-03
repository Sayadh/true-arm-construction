<script setup lang="ts">
import { company } from '~/data/company'

/**
 * Brand mark. Shows the official logo when company.logo.src is set,
 * otherwise the typographic fallback wordmark.
 * On dark backgrounds (tone="light") the logo sits on a light tile, because its
 * navy "CONSTRUCTION" lettering would disappear on the dark footer.
 */
const props = withDefaults(defineProps<{ tone?: 'light' | 'dark'; size?: 'md' | 'lg' }>(), { tone: 'dark', size: 'md' })
// WebP version lives next to the PNG (same name), see docs/ASSETS.md
const webp = computed(() => company.logo.src?.replace(/\.png$/i, '.webp'))
const heightClass = computed(() => (props.size === 'lg' ? 'h-20' : 'h-12 sm:h-14'))
</script>

<template>
  <span class="inline-flex items-center">
    <span v-if="company.logo.src" class="inline-flex" :class="tone === 'light' ? 'rounded-xl bg-paper p-2.5' : ''">
      <picture>
        <source v-if="webp && webp !== company.logo.src" :srcset="webp" type="image/webp">
        <img :src="company.logo.src" :alt="company.logo.alt" :class="heightClass" class="w-auto" width="600" height="526" decoding="async">
      </picture>
    </span>
    <span v-else class="flex flex-col leading-none" :class="tone === 'light' ? 'text-paper' : 'text-ink'">
      <span aria-hidden="true" class="text-[1.3rem] font-extrabold tracking-[0.14em]">TRUE ARM</span>
      <span aria-hidden="true" class="mt-[5px] flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.42em]" :class="tone === 'light' ? 'text-stone/70' : 'text-muted'">
        <span class="h-px w-4 bg-bronze" aria-hidden="true" />CONSTRUCTION
      </span>
      <span class="sr-only">{{ company.name }}</span>
    </span>
  </span>
</template>
