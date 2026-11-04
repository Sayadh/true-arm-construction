<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { ReviewPlatform } from '~/types'

defineProps<{ platform: ReviewPlatform; tone?: 'light' | 'dark' }>()
</script>

<template>
  <a
    :href="platform.url"
    target="_blank"
    rel="noopener"
    class="group flex h-full flex-col rounded-lg border p-6 transition-colors"
    :class="tone === 'dark' ? 'border-paper/15 bg-paper/5 hover:border-paper/35' : 'border-stone-300 bg-white hover:border-ink/40'"
  >
    <span class="text-sm font-bold uppercase tracking-[0.12em]" :class="tone === 'dark' ? 'text-stone/75' : 'text-muted'">{{ platform.name }}</span>
    <span class="mt-3 flex items-baseline gap-3">
      <span class="font-display text-[2.75rem] font-extrabold leading-none [font-stretch:78%]" :class="tone === 'dark' ? 'text-paper' : 'text-ink'">{{ platform.rating.toFixed(1) }}</span>
      <RatingStars :rating="platform.rating" />
    </span>
    <span class="mt-2 text-[0.9375rem]" :class="tone === 'dark' ? 'text-stone/75' : 'text-muted'">
      {{ platform.reviewCount }} review{{ platform.reviewCount === 1 ? '' : 's' }}
    </span>
    <span class="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold" :class="tone === 'dark' ? 'text-paper' : 'text-ink'">
      <span class="underline decoration-bronze decoration-2 underline-offset-4">Read reviews on {{ platform.name }}</span>
      <ArrowUpRight :size="16" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      <span class="sr-only">(opens in a new tab)</span>
    </span>
  </a>
</template>
