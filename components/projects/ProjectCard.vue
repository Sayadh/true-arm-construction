<script setup lang="ts">
import type { Project } from '~/types'
import { categoryName } from '~/data/projects'

defineProps<{ project: Project; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <article class="group relative flex flex-col">
    <MediaFrame :image="project.cover" aspect="aspect-[4/3]" sizes="xs:100vw sm:50vw lg:33vw">
      <span
        v-if="project.beforeAfter?.length"
        class="absolute left-3 top-3 rounded-sm bg-deep/85 px-2.5 py-1 text-xs font-semibold text-paper"
      >Before &amp; after</span>
    </MediaFrame>
    <p class="mt-4 text-sm font-semibold text-bronze-dark">
      {{ categoryName(project.category) }}<template v-if="project.location">, {{ project.location }}</template>
    </p>
    <component :is="headingLevel || 'h3'" class="mt-1 text-h3">
      <NuxtLink :to="`/projects/${project.slug}`" class="after:absolute after:inset-0 hover:text-bronze-dark">{{ project.title }}</NuxtLink>
    </component>
    <p class="mt-2 text-[0.9375rem] text-muted">{{ project.summary }}</p>
    <span class="mt-3 text-sm font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-[5px]" aria-hidden="true">View project details</span>
  </article>
</template>
