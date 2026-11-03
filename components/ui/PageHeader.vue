<script setup lang="ts">
import type { Crumb } from '~/types'

defineProps<{ crumbs: Crumb[]; title: string; lead?: string; kicker?: string }>()
</script>

<template>
  <section class="relative overflow-hidden border-b border-stone-300 bg-stone-50">
    <div class="graph-paper absolute inset-0 opacity-70 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
    <div class="wrap relative pb-14 pt-8 lg:pb-20 lg:pt-10">
      <Breadcrumbs :items="crumbs" />
      <p v-if="kicker" class="kicker mt-10">{{ kicker }}</p>
      <h1 class="text-h1 max-w-4xl" :class="kicker ? 'mt-2' : 'mt-10'">{{ title }}</h1>
      <p v-if="lead" class="mt-5 max-w-[44rem] text-lead text-muted">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>
