<script setup lang="ts">
import { serviceGroups, servicesByGroup } from '~/data/services'

const title = 'Construction & Remodeling Services in Sacramento, CA'
const description =
  'Bathroom remodeling, tile installation, painting, siding, fence repair, pressure washing, gazebos, and new construction in Sacramento, CA.'
const path = '/services'

const groups = serviceGroups
  .map((g) => ({ ...g, items: servicesByGroup(g.id) }))
  .filter((g) => g.items.length)

usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path }])
])
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Services', path: '/services' }]"
      title="Construction and remodeling services"
      lead="Residential and commercial services in Sacramento, grouped by the kind of work. Not sure where your project fits? Use the service finder below."
    />

    <nav aria-label="Service groups" class="sticky top-[var(--header-h)] z-20 border-b border-stone-300 bg-paper/95 backdrop-blur">
      <ul class="wrap flex gap-6 overflow-x-auto py-3 text-sm font-semibold text-ink [scrollbar-width:none]">
        <li v-for="g in groups" :key="g.id" class="shrink-0">
          <a :href="`#${g.id}`" class="inline-block py-1 hover:text-bronze-dark">{{ g.name }}</a>
        </li>
        <li class="shrink-0"><a href="#navigator" class="inline-block py-1 text-bronze-dark">Service finder</a></li>
      </ul>
    </nav>

    <section v-for="(g, gi) in groups" :id="g.id" :key="g.id" class="scroll-mt-32 py-14 sm:py-20" :class="gi % 2 ? 'bg-stone-50' : ''">
      <div class="wrap">
        <div class="grid gap-4 border-b border-stone-300 pb-6 md:grid-cols-12 md:items-end">
          <h2 class="text-h2 md:col-span-7">{{ g.name }}</h2>
          <p class="text-muted md:col-span-5">{{ g.description }}</p>
        </div>
        <div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="s in g.items" :key="s.slug" :service="s" />
        </div>
      </div>
    </section>

    <section id="navigator" class="section scroll-mt-32 border-t border-stone-300" aria-labelledby="finder-heading">
      <div class="wrap">
        <div class="max-w-2xl">
          <h2 id="finder-heading" class="text-h2">Find the right service</h2>
          <p class="mt-4 text-lead text-muted">Choose what you are planning. If a project spans several services, start with the main one and mention the rest in your request.</p>
        </div>
        <div class="mt-10"><ProjectNavigator :show-all-link="false" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
