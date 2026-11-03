<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { company } from '~/data/company'
import { enabledAreas } from '~/data/areas'
</script>

<template>
  <section class="section" aria-labelledby="areas-heading">
    <div class="wrap grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <h2 id="areas-heading" class="text-h2">Serving {{ company.primaryArea.city }}, California</h2>
        <p class="mt-5 max-w-prose text-lead text-muted">
          We work on homes and commercial properties in {{ company.primaryArea.city }}. If your property is nearby,
          include your ZIP code in your request and we will let you know whether we can take on the project.
        </p>
        <div class="mt-8">
          <AppButton to="/service-areas" variant="outline">Service areas</AppButton>
        </div>
      </div>
      <ul class="flex flex-wrap content-start gap-3 lg:col-span-5 lg:col-start-8">
        <li v-for="a in enabledAreas" :key="a.slug" class="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-3 font-semibold text-ink">
          <MapPin :size="18" aria-hidden="true" class="text-bronze-dark" />
          {{ a.name }}, {{ company.primaryArea.regionCode }}
        </li>
      </ul>
    </div>
  </section>
</template>
