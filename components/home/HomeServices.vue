<script setup lang="ts">
import { featuredServiceSlugs, getService } from '~/data/services'
import type { Service } from '~/types'

const featured = featuredServiceSlugs.map(getService).filter((s): s is Service => Boolean(s))
</script>

<template>
  <section class="section" aria-labelledby="services-heading">
    <div class="wrap">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <h2 id="services-heading" class="text-h2">Services for homes and commercial properties</h2>
          <p class="mt-4 text-lead text-muted">
            From a single repair to a full build, each service is planned around the property, the scope, and how you will use the space.
          </p>
        </div>
        <AppButton to="/services" variant="outline">View all services</AppButton>
      </div>
      <div class="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in featured" :key="s.slug" :service="s" />
      </div>
    </div>
  </section>
</template>
