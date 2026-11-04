<script setup lang="ts">
import { MapPin, ArrowRight } from 'lucide-vue-next'
import { company } from '~/data/company'
import { enabledAreas, areaNames } from '~/data/areas'
import { enabledServices } from '~/data/services'

const title = 'Areas We Serve in the Sacramento Region'
const description = `Remodeling, construction, and repair services in ${areaNames()}, California, from a licensed Class B general contractor.`
const path = '/service-areas'
usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Areas', path }])
])
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Service Areas', path }]"
      title="Where we work"
      :lead="`We provide construction, remodeling, and property improvement services for residential and commercial properties in ${areaNames()}.`"
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <h2 class="text-h2">Our service areas</h2>
          <ul class="mt-8 space-y-3">
            <li v-for="a in enabledAreas" :key="a.slug">
              <component
                :is="a.page ? 'NuxtLink' : 'div'"
                :to="a.page ? `/service-areas/${a.slug}` : undefined"
                class="group flex items-center gap-4 rounded border border-stone-300 bg-white p-5 transition-colors"
                :class="a.page ? 'hover:border-ink/40' : ''"
              >
                <MapPin :size="24" class="shrink-0 text-bronze-dark" aria-hidden="true" />
                <div class="flex-1">
                  <p class="text-lg font-bold text-ink">{{ a.name }}, {{ company.primaryArea.regionCode }}</p>
                  <p class="text-sm text-muted">{{ a.county }}</p>
                </div>
                <ArrowRight v-if="a.page" :size="20" class="text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </component>
            </li>
          </ul>
          <div class="rich mt-8">
            <p>
              Is your property nearby but not listed? Include your ZIP code when you request an estimate, and we will let you know whether we can
              take on the project.
            </p>
            <p>
              Permits are issued by different offices depending on the address: the City of Sacramento, the City of West Sacramento, or Sacramento
              County for unincorporated communities such as Carmichael. Each area page explains which one applies.
            </p>
          </div>
          <div class="mt-8"><AppButton to="/free-estimate" track="estimate_cta_click" track-label="service_areas">Check your project</AppButton></div>
        </div>
        <div class="lg:col-span-5 lg:col-start-8">
          <div class="rounded bg-stone-50 p-7">
            <h2 class="text-lg font-bold text-ink">Services in every area</h2>
            <ul class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <li v-for="s in enabledServices" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="text-[0.9375rem] font-medium text-body underline decoration-stone-400 underline-offset-4 hover:decoration-bronze">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
