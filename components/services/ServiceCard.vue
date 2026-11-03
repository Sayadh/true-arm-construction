<script setup lang="ts">
import type { Service } from '~/types'

defineProps<{ service: Service; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <article class="group relative flex flex-col">
    <MediaFrame :image="service.images[0] ?? null" :icon="service.icon" :label="`${service.shortName} photo coming soon`" aspect="aspect-[3/2]" sizes="xs:100vw sm:50vw lg:33vw" />
    <component :is="headingLevel || 'h3'" class="mt-5 text-h3">
      <NuxtLink :to="`/services/${service.slug}`" class="after:absolute after:inset-0 hover:text-bronze-dark">
        {{ service.name }}
      </NuxtLink>
    </component>
    <p class="mt-2 text-[0.9375rem] text-muted">{{ service.cardText }}</p>
    <span class="mt-4 text-sm font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-[5px] group-hover:decoration-ink" aria-hidden="true">
      Learn more
    </span>
  </article>
</template>
