<script setup lang="ts">
import { Phone, Info, Check } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { getService, serviceGroups } from '~/data/services'
import { faqsByCategory, faqsByIds } from '~/data/faqs'
import { projectsForService } from '~/data/projects'
import { estimatePath } from '~/data/navigation'
import type { Service } from '~/types'

const route = useRoute()
const slug = String(route.params.slug)
const found = getService(slug)
if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}
const service = found as Service

const group = serviceGroups.find((g) => g.id === service.group)
const related = service.related.map(getService).filter((s): s is Service => Boolean(s))
const projects = projectsForService(service.slug)
const faqItems = (() => {
  const list = [...faqsByCategory(service.faqCategory), ...faqsByIds(service.faqIds ?? [])]
  return list.filter((f, i) => list.findIndex((x) => x.id === f.id) === i).slice(0, 6)
})()
const estimateLink = `${estimatePath}?service=${service.slug}`
const { track } = useAnalytics()
const path = `/services/${service.slug}`
const crumbs = [
  { name: 'Services', path: '/services' },
  { name: service.name, path }
]

usePageSeo({ title: service.seoTitle, description: service.metaDescription, path, absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title: service.seoTitle, description: service.metaDescription }),
  serviceSchema(service),
  breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
  ...(faqItems.length ? [faqSchema(faqItems)] : [])
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-stone-300 bg-stone-50">
      <div class="wrap grid gap-10 pb-14 pt-8 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-10">
        <div class="lg:col-span-7">
          <Breadcrumbs :items="crumbs" />
          <p v-if="group" class="kicker mt-8">{{ group.name }}</p>
          <h1 class="mt-2 text-h1">{{ service.heroTitle }}</h1>
          <p class="mt-5 max-w-[40rem] text-lead text-muted">{{ service.heroLead }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton :to="estimateLink" size="lg" track="service_cta_click" :track-label="service.slug">
              Get a free {{ service.shortName.toLowerCase() }} estimate
            </AppButton>
            <AppButton v-if="company.phone" :href="`tel:${company.phone}`" variant="outline" size="lg" track="phone_click" :track-label="service.slug">
              <Phone :size="18" aria-hidden="true" /> {{ formatPhone(company.phone) }}
            </AppButton>
          </div>
          <div class="mt-8"><LicenseTag /></div>
        </div>
        <div class="lg:col-span-5">
          <MediaFrame
            :image="service.images[0] ?? null"
            :icon="service.icon"
            :label="`${service.shortName} photo coming soon`"
            aspect="aspect-[4/3]"
            sizes="xs:100vw lg:40vw"
            priority
          />
        </div>
      </div>
    </section>

    <!-- Intro + estimate aside -->
    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="text-h2"><span class="capitalize-first">{{ service.shortName }}</span> for Sacramento properties</h2>
          <div class="mt-6 text-lead text-body"><RichParagraphs :paragraphs="service.intro" /></div>

          <div v-if="service.scopeNote" class="mt-8 flex gap-3 rounded border border-bronze/40 bg-bronze/5 p-5 text-[0.9375rem]">
            <Info :size="20" aria-hidden="true" class="mt-0.5 shrink-0 text-bronze-dark" />
            <p>{{ service.scopeNote }}</p>
          </div>
        </div>
        <aside class="lg:col-span-4 lg:col-start-9">
          <div class="rounded bg-ink p-7 text-stone lg:sticky lg:top-[calc(var(--header-offset)+1.5rem)]">
            <p class="text-lg font-bold text-paper">Free estimate</p>
            <p class="mt-2 text-[0.9375rem] text-stone/75">Tell us about your {{ service.shortName.toLowerCase() }} project in a few short steps. Skip anything you are not sure about.</p>
            <ul class="mt-5 space-y-2 text-[0.9375rem]">
              <li v-if="company.confirmedFacts.residential && company.confirmedFacts.commercial" class="flex gap-2"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-light" aria-hidden="true" />Residential and commercial</li>
              <li class="flex gap-2"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-light" aria-hidden="true" />CA License #{{ company.license.number }}, Class {{ company.license.classification }}</li>
              <li class="flex gap-2"><Check :size="18" class="mt-0.5 shrink-0 text-bronze-light" aria-hidden="true" />Serving {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}</li>
            </ul>
            <AppButton :to="estimateLink" block class="mt-6" track="service_cta_click" :track-label="`${service.slug}_aside`">Start your estimate</AppButton>
          </div>
        </aside>
      </div>
    </section>

    <!-- Scope -->
    <section class="section border-y border-stone-300 bg-white" aria-labelledby="scope-heading">
      <div class="wrap">
        <h2 id="scope-heading" class="max-w-2xl text-h2">{{ service.scopeTitle }}</h2>
        <!-- Grouped scope (e.g. Installation / Repair) -->
        <div v-if="service.scopeGroups?.length" class="mt-12 grid gap-6 lg:grid-cols-2">
          <article
            v-for="(g, gi) in service.scopeGroups"
            :id="g.id"
            :key="g.id"
            class="flex flex-col overflow-hidden rounded border border-stone-300"
          >
            <header class="relative p-7 sm:p-8" :class="gi === 0 ? 'bg-ink text-stone' : 'bg-stone-50'">
              <div class="flex items-center gap-3">
                <span
                  class="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold"
                  :class="gi === 0 ? 'border-bronze text-bronze-light' : 'border-bronze-dark text-bronze-dark'"
                  aria-hidden="true"
                >{{ gi === 0 ? '+' : '↺' }}</span>
                <h3 class="text-h3" :class="gi === 0 ? 'text-paper' : 'text-ink'">{{ g.title }}</h3>
              </div>
              <p v-if="g.intro" class="mt-3 text-[0.9375rem]" :class="gi === 0 ? 'text-stone/75' : 'text-muted'">{{ g.intro }}</p>
            </header>
            <ul class="flex-1 divide-y divide-stone-300 bg-white">
              <li v-for="item in g.items" :key="item.title" class="flex gap-4 px-7 py-5 sm:px-8">
                <span class="mt-[0.8em] h-px w-4 shrink-0 bg-bronze" aria-hidden="true" />
                <div>
                  <h4 class="font-bold text-ink">{{ item.title }}</h4>
                  <p class="mt-1 text-[0.9375rem] text-muted">{{ item.text }}</p>
                </div>
              </li>
            </ul>
            <div class="border-t border-stone-300 bg-white px-7 py-5 sm:px-8">
              <NuxtLink
                :to="`${estimateLink}`"
                class="text-sm font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-4 hover:decoration-ink"
                @click="track('service_cta_click', { label: `${service.slug}_${g.id}` })"
              >Request {{ /^[aeiou]/i.test(g.title) ? 'an' : 'a' }} {{ g.title.toLowerCase() }} estimate</NuxtLink>
            </div>
          </article>
        </div>

        <ul v-else class="mt-12 grid gap-px overflow-hidden rounded border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in service.scope" :key="item.title" class="bg-white p-6 sm:p-7">
            <h3 class="text-lg font-bold text-ink">{{ item.title }}</h3>
            <p class="mt-2 text-[0.9375rem] text-muted">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Considerations -->
    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <article v-for="sec in service.sections" :key="sec.title" class="mb-12 last:mb-0">
            <h2 class="text-h3">{{ sec.title }}</h2>
            <div class="mt-4"><RichParagraphs :paragraphs="sec.body" /></div>
          </article>
          <article v-for="a in service.anchors ?? []" :id="a.id" :key="a.id" class="mt-12 border-t border-stone-300 pt-10">
            <h2 class="text-h3">{{ a.title }}</h2>
            <div class="mt-4"><RichParagraphs :paragraphs="a.body" /></div>
          </article>
        </div>
        <div class="space-y-10 lg:col-span-4 lg:col-start-9">
          <div class="rounded border border-stone-300 p-7">
            <h2 class="text-lg font-bold text-ink">What affects your estimate</h2>
            <ul class="mt-4 space-y-3 text-[0.9375rem]">
              <li v-for="f in service.costFactors" :key="f" class="flex gap-3">
                <span class="mt-[0.7em] h-px w-3 shrink-0 bg-bronze" aria-hidden="true" />{{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Expectations -->
    <section class="section on-dark bg-ink text-stone" aria-labelledby="expect-heading">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="expect-heading" class="text-h2 text-paper">What to expect</h2>
          <p class="mt-4 text-stone/75">How a {{ service.shortName.toLowerCase() }} project typically moves from first contact to completion.</p>
        </div>
        <ol class="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
          <li v-for="(e, i) in service.expectations" :key="e" class="flex gap-4 border-t border-slate-line pt-5">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze text-sm font-bold text-bronze-light">{{ i + 1 }}</span>
            <span class="pt-1 text-paper">{{ e }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- Photos (only when supplied) -->
    <section v-if="service.images.length > 1" class="section" aria-labelledby="photos-heading">
      <div class="wrap">
        <h2 id="photos-heading" class="text-h2">{{ service.shortName }} photos</h2>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MediaFrame v-for="img in service.images.slice(1)" :key="img.src" :image="img" />
        </div>
      </div>
    </section>

    <!-- Related projects (only real ones) -->
    <section v-if="projects.length" class="section" aria-labelledby="related-projects-heading">
      <div class="wrap">
        <h2 id="related-projects-heading" class="text-h2">Related projects</h2>
        <div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="faqItems.length" class="section bg-stone-50" aria-labelledby="svc-faq-heading">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="svc-faq-heading" class="text-h2">{{ service.shortName }} questions</h2>
          <p class="mt-4 text-muted">Do not see your question? <NuxtLink to="/faq" class="font-semibold text-ink underline decoration-bronze underline-offset-4">Browse all FAQs</NuxtLink> or ask us directly in your estimate request.</p>
        </div>
        <div class="lg:col-span-8"><FaqAccordion :items="faqItems" /></div>
      </div>
    </section>

    <!-- Related services -->
    <section v-if="related.length" class="section" aria-labelledby="related-heading">
      <div class="wrap">
        <h2 id="related-heading" class="text-h2">Related services</h2>
        <div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard v-for="s in related" :key="s.slug" :service="s" />
        </div>
      </div>
    </section>

    <CtaBand
      :title="`Planning ${service.shortName.toLowerCase()} in Sacramento?`"
      cta="Request your free estimate"
      :service="service.slug"
    />
  </div>
</template>
