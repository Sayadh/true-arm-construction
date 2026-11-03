<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { company } from '~/data/company'
import { enabledAreas } from '~/data/areas'
import { enabledServices } from '~/data/services'

const title = 'Service Areas | Sacramento, CA Contractor'
const description =
  'True Arm Construction provides construction, remodeling, and property improvement services in Sacramento, California.'
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
      :title="`Serving ${company.primaryArea.city}, California`"
      lead="We provide construction, remodeling, and property improvement services for residential and commercial properties in Sacramento."
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <h2 class="text-h2">Where we work</h2>
          <ul class="mt-8 space-y-3">
            <li v-for="a in enabledAreas" :key="a.slug" class="flex items-center gap-4 rounded border border-stone-300 bg-white p-5">
              <MapPin :size="24" class="shrink-0 text-bronze-dark" aria-hidden="true" />
              <div>
                <p class="text-lg font-bold text-ink">{{ a.name }}, {{ company.primaryArea.regionCode }}</p>
                <p class="text-sm text-muted">{{ a.county }}</p>
              </div>
            </li>
          </ul>
          <div class="rich mt-8">
            <p>
              Is your property outside {{ company.primaryArea.city }}? Include your ZIP code when you request an estimate, and we will
              let you know whether we can take on the project.
            </p>
            <p>
              Permit requirements differ between the City of Sacramento and unincorporated Sacramento County. See the
              <a href="https://www.cityofsacramento.gov/community-development/building" target="_blank" rel="noopener">City of Sacramento Building Division</a>
              or
              <a href="https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html" target="_blank" rel="noopener">Sacramento County Building Permits &amp; Inspection</a>
              for official information.
            </p>
          </div>
          <div class="mt-8"><AppButton to="/free-estimate" track="estimate_cta_click" track-label="service_areas">Check your project</AppButton></div>
        </div>
        <div class="lg:col-span-5 lg:col-start-8">
          <div class="rounded bg-stone-50 p-7">
            <h2 class="text-lg font-bold text-ink">Services available in {{ company.primaryArea.city }}</h2>
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
