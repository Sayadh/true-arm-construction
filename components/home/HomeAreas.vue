<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { company } from '~/data/company'
import { enabledAreas, areaNames } from '~/data/areas'
</script>

<template>
  <section class="section" aria-labelledby="areas-heading">
    <div class="wrap grid gap-10 lg:grid-cols-12">
      <div v-reveal class="lg:col-span-6">
        <h2 id="areas-heading" class="text-h2">Serving {{ company.primaryArea.city }} and nearby communities</h2>
        <p class="mt-5 max-w-prose text-lead text-muted">
          We work on homes and commercial properties in {{ areaNames() }}. If your property is nearby,
          include your ZIP code in your request and we will let you know whether we can take on the project.
        </p>
        <div class="mt-8">
          <AppButton to="/service-areas" variant="outline">Service areas</AppButton>
        </div>
      </div>
      <!-- Site plan-style panel: the service area marked like a survey point -->
      <div v-reveal="{ delay: 150 }" class="relative overflow-hidden rounded-lg bg-ink p-8 text-paper sm:p-10 lg:col-span-5 lg:col-start-8">
        <div class="graph-paper-dark absolute inset-0" aria-hidden="true" />
        <div class="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border border-bronze/40" aria-hidden="true">
          <span class="absolute inset-4 rounded-full border border-bronze/60" />
          <span class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-light" />
          <span class="absolute left-1/2 top-[-1.5rem] h-[calc(100%+3rem)] w-px -translate-x-1/2 bg-bronze/30" />
          <span class="absolute left-[-1.5rem] top-1/2 h-px w-[calc(100%+3rem)] -translate-y-1/2 bg-bronze/30" />
        </div>
        <div class="relative">
          <p class="text-sm font-semibold text-bronze-light">Service areas</p>
          <ul class="mt-24 space-y-2">
            <li v-for="a in enabledAreas" :key="a.slug">
              <NuxtLink :to="a.page ? `/service-areas/${a.slug}` : '/service-areas'" class="group flex items-center gap-3">
                <MapPin :size="22" aria-hidden="true" class="shrink-0 text-bronze-light" />
                <span class="font-display text-3xl font-extrabold leading-none [font-stretch:78%] group-hover:underline group-hover:decoration-bronze sm:text-4xl">{{ a.name }}, {{ company.primaryArea.regionCode }}</span>
              </NuxtLink>
            </li>
          </ul>
          <div class="dim-line mt-8 text-bronze/50" aria-hidden="true" />
          <p class="mt-4 text-sm text-stone/70">Nearby? Add your ZIP code to your request and we will confirm whether we can take on the project.</p>
        </div>
      </div>
    </div>
  </section>
</template>
