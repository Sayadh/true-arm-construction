<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const title = 'Free Estimate | Plan Your Project in Sacramento'
const description =
  'Request a free estimate from True Arm Construction. Answer a few short questions about your Sacramento construction or remodeling project.'
const path = '/free-estimate'
usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free estimate', path }])
])
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Free estimate', path: '/free-estimate' }]"
      title="Plan your project"
      lead="A few short questions so we can understand your project before we follow up. Estimates are free, project details are optional, and “not sure yet” is always a fine answer."
    />
    <section class="py-10 sm:py-14">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <ProjectPlanner />
        </div>
        <aside class="space-y-8 lg:col-span-4">
          <div>
            <h2 class="text-lg font-bold text-ink">What happens next</h2>
            <ul class="mt-4 space-y-3 text-[0.9375rem]">
              <li class="flex gap-3"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />We review your request.</li>
              <li class="flex gap-3"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />We contact you to talk through the project.</li>
              <li class="flex gap-3"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />For most projects, we arrange a site visit before preparing the estimate.</li>
            </ul>
          </div>
          <LicenseCard />
          <p class="text-sm text-muted">
            Your details are used only to respond to this request. See our <NuxtLink to="/privacy-policy" class="font-semibold text-ink underline decoration-bronze underline-offset-4">Privacy Policy</NuxtLink>.
          </p>
        </aside>
      </div>
    </section>
  </div>
</template>
