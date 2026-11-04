<script setup lang="ts">
import { Landmark, ExternalLink, MapPin } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { getArea, areaPages } from '~/data/areas'
import { serviceGroups, servicesByGroup } from '~/data/services'
import { reviewTotals } from '~/data/reviews'
import { estimatePath } from '~/data/navigation'
import type { FaqItem } from '~/types'

const route = useRoute()
const area = getArea(String(route.params.slug))
if (!area?.page) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const page = area.page
const path = `/service-areas/${area.slug}`
const place = `${area.name}, ${company.primaryArea.regionCode}`

usePageSeo({ title: page.seoTitle, description: page.metaDescription, path, absoluteTitle: true })

const faqItems: FaqItem[] = page.faqs.map((f, i) => ({ id: `${area.slug}-${i}`, category: 'general', question: f.question, answer: f.answer }))
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title: page.seoTitle, description: page.metaDescription }),
  areaServicesSchema(area),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/service-areas' }, { name: area.name, path }]),
  faqSchema(faqItems)
])

const groups = serviceGroups.map((g) => ({ ...g, items: servicesByGroup(g.id) })).filter((g) => g.items.length)
const otherAreas = areaPages.filter((a) => a.slug !== area.slug)
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Service Areas', path: '/service-areas' }, { name: area.name, path }]"
      :kicker="area.county"
      :title="`Remodeling and construction in ${place}`"
    >
      <RichParagraphs :paragraphs="page.intro" class="mt-5 max-w-[44rem] text-lead text-muted" />
      <div class="mt-8 flex flex-wrap gap-3">
        <AppButton :to="estimatePath" size="lg" track="estimate_cta_click" :track-label="`area_${area.slug}`">Get a Free Estimate</AppButton>
        <AppButton v-if="company.phone" :href="`tel:${company.phone}`" variant="outline" size="lg" track="phone_click" :track-label="`area_${area.slug}`">
          Call {{ formatPhone(company.phone) }}
        </AppButton>
      </div>
      <p v-if="reviewTotals.average" class="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <RatingStars :rating="reviewTotals.average" :size="16" />
        <NuxtLink to="/reviews" class="underline decoration-stone-400 underline-offset-4 hover:decoration-bronze">
          {{ reviewTotals.average.toFixed(1) }} from {{ reviewTotals.count }} reviews
        </NuxtLink>
        <span aria-hidden="true">·</span>
        <span>CA License #{{ company.license.number }}</span>
      </p>
    </PageHeader>

    <section class="section" aria-labelledby="area-services">
      <div class="wrap">
        <h2 id="area-services" class="text-h2">Services in {{ area.name }}</h2>
        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="g in groups" :key="g.id">
            <h3 class="text-sm font-bold uppercase tracking-[0.12em] text-muted">{{ g.name }}</h3>
            <ul class="mt-3 space-y-2">
              <li v-for="s in g.items" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="font-semibold text-ink underline decoration-stone-400 underline-offset-4 hover:decoration-bronze">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-stone-50" aria-labelledby="area-local">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 id="area-local" class="text-h2">Good to know in {{ area.name }}</h2>
          <ul class="mt-8 space-y-6">
            <li v-for="n in page.localNotes" :key="n.title" class="border-l-2 border-bronze pl-5">
              <h3 class="text-lg font-bold text-ink">{{ n.title }}</h3>
              <p class="mt-1 text-body">{{ n.text }}</p>
            </li>
          </ul>
          <p v-if="page.neighborhoods?.length" class="mt-8 flex items-start gap-2 text-[0.9375rem] text-muted">
            <MapPin :size="18" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />
            <span>We work throughout {{ area.name }}, including {{ page.neighborhoods.join(', ') }}.</span>
          </p>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <div class="rounded-lg border border-stone-300 bg-white p-6">
            <Landmark :size="24" class="text-bronze-dark" aria-hidden="true" />
            <h2 class="mt-3 text-lg font-bold text-ink">Building permits</h2>
            <p class="mt-1 text-sm font-semibold text-muted">{{ page.permits.authority }}</p>
            <p class="mt-3 text-[0.9375rem] text-body">{{ page.permits.text }}</p>
            <a :href="page.permits.url" target="_blank" rel="noopener" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-bronze underline-offset-4">
              Official permit information <ExternalLink :size="15" aria-hidden="true" /><span class="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="area-faq">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="area-faq" class="text-h2">{{ area.name }} questions</h2>
          <p class="mt-4 text-muted">More answers on the <NuxtLink to="/faq" class="font-semibold text-ink underline decoration-bronze underline-offset-4">FAQ page</NuxtLink>.</p>
        </div>
        <div class="lg:col-span-8">
          <FaqAccordion :items="faqItems" />
        </div>
      </div>
      <div v-if="otherAreas.length" class="wrap mt-14">
        <p class="text-sm text-muted">
          Also serving:
          <template v-for="(a, i) in otherAreas" :key="a.slug">
            <NuxtLink :to="`/service-areas/${a.slug}`" class="font-semibold text-ink underline decoration-stone-400 underline-offset-4 hover:decoration-bronze">{{ a.name }}</NuxtLink><template v-if="i < otherAreas.length - 1">, </template>
          </template>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
