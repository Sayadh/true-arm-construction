<script setup lang="ts">
import { company } from '~/data/company'

/**
 * Temporary typographic wordmark. Not an official logo.
 * Set company.logo.src to an SVG/PNG to replace it everywhere.
 */
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'dark' })
</script>

<template>
  <span class="inline-flex items-center">
    <img v-if="company.logo.src" :src="company.logo.src" :alt="company.logo.alt" class="h-9 w-auto" width="160" height="36">
    <span v-else class="flex flex-col leading-none" :class="tone === 'light' ? 'text-paper' : 'text-ink'">
      <span aria-hidden="true" class="text-[1.3rem] font-extrabold tracking-[0.14em]">TRUE ARM</span>
      <span aria-hidden="true" class="mt-[5px] flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.42em]" :class="tone === 'light' ? 'text-stone/70' : 'text-muted'">
        <span class="h-px w-4 bg-bronze" aria-hidden="true" />CONSTRUCTION
      </span>
      <span class="sr-only">{{ company.name }}</span>
    </span>
  </span>
</template>
