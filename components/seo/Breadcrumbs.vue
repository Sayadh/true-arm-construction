<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { Crumb } from '~/types'

const props = withDefaults(defineProps<{ items: Crumb[]; tone?: 'light' | 'dark' }>(), { tone: 'light' })
const all = computed<Crumb[]>(() => [{ name: 'Home', path: '/' }, ...props.items])
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm" :class="tone === 'dark' ? 'text-stone/70' : 'text-muted'">
      <li v-for="(c, i) in all" :key="c.path" class="inline-flex items-center gap-1.5">
        <NuxtLink
          v-if="i < all.length - 1"
          :to="c.path"
          class="hover:underline hover:underline-offset-4"
          :class="tone === 'dark' ? 'hover:text-paper' : 'hover:text-ink'"
        >{{ c.name }}</NuxtLink>
        <span v-else aria-current="page" class="font-semibold" :class="tone === 'dark' ? 'text-paper' : 'text-ink'">{{ c.name }}</span>
        <ChevronRight v-if="i < all.length - 1" :size="14" aria-hidden="true" class="opacity-60" />
      </li>
    </ol>
  </nav>
</template>
