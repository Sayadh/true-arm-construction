<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { serviceGroups, servicesByGroup } from '~/data/services'
import type { ServiceGroupId } from '~/types'

/**
 * Service groups as photo tiles. Photos are licensed stock used as category
 * atmosphere only (never captioned as True Arm work); swap in real project
 * photos per group when available.
 */
const groupImages: Record<ServiceGroupId, { src: string; alt: string }> = {
  remodeling: { src: '/images/stock/group-remodeling.jpg', alt: 'Open-plan living room and kitchen interior' },
  flooring: { src: '/images/stock/group-flooring.jpg', alt: 'Light wood floor in an empty, finished room' },
  exterior: { src: '/images/stock/group-painting.jpg', alt: 'Paint roller applying blue paint to a wall' },
  repairs: { src: '/images/stock/group-repairs.jpg', alt: 'Cordless drill resting on a worn subfloor' }
}

// Asymmetric 12-column rhythm on desktop: wide / narrow, then narrow / wide.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

const groups = serviceGroups
  .map((g) => ({ ...g, items: servicesByGroup(g.id), image: groupImages[g.id] }))
  .filter((g) => g.items.length)
</script>

<template>
  <section class="section" aria-labelledby="services-heading">
    <div class="wrap">
      <div v-reveal class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <h2 id="services-heading" class="text-h2">Services for homes and commercial properties</h2>
          <p class="mt-4 text-lead text-muted">
            From a single repair to a full remodel, each service is planned around the property, the scope, and how you will use the space.
          </p>
        </div>
        <AppButton to="/services" variant="outline">View all services</AppButton>
      </div>

      <div class="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
        <article
          v-for="(g, i) in groups"
          :key="g.id"
          v-reveal="{ type: 'wipe', delay: (i % 2) * 120 }"
          class="tile group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg bg-deep text-paper sm:min-h-[30rem]"
          :class="spans[i]"
        >
          <NuxtImg
            format="webp"
            :src="g.image.src"
            :alt="g.image.alt"
            sizes="xs:100vw lg:60vw"
            loading="lazy"
            class="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
          />
          <div class="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/70 to-deep/10" aria-hidden="true" />

          <div class="p-6 sm:p-8">
            <h3 class="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-extrabold leading-none text-paper [font-stretch:78%]">
              <NuxtLink :to="`/services#${g.id}`" class="hover:text-bronze-light">{{ g.name }}</NuxtLink>
            </h3>
            <p class="mt-2 max-w-md text-stone/80">{{ g.description }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="s in g.items" :key="s.slug">
                <NuxtLink
                  :to="`/services/${s.slug}`"
                  class="inline-flex items-center gap-1 rounded-full border border-paper/25 bg-deep/30 px-3.5 py-1.5 text-sm font-semibold text-paper backdrop-blur-sm transition-colors hover:border-bronze-light hover:bg-bronze hover:text-white"
                >
                  {{ s.shortName }}
                  <ArrowUpRight :size="14" aria-hidden="true" class="opacity-60" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
