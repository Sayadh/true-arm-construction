<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import { publishedResources } from '~/data/resources'
import { featuredFaqs } from '~/data/faqs'

const title = 'Homeowner Resources | Planning Guides & FAQ'
const description =
  'Planning guides and answers for Sacramento homeowners and property owners preparing for remodeling and construction projects.'
const path = '/resources'
usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resources', path }])
])

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Resources', path }]"
      title="Homeowner resources"
      lead="Guides and answers to help you plan a project, prepare for an estimate, and know what to expect."
    />

    <section class="section" aria-labelledby="guides-heading">
      <div class="wrap">
        <h2 id="guides-heading" class="text-h2">Planning guides</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <article v-for="r in publishedResources" :key="r.slug" class="group relative flex flex-col rounded border border-stone-300 bg-white p-7 transition-colors hover:border-ink sm:p-9">
            <p class="flex items-center gap-2 text-sm text-muted">
              <Clock :size="16" aria-hidden="true" /> {{ r.readingMinutes }} min read
              <span aria-hidden="true">|</span>
              <time :datetime="r.publishedOn">{{ fmt(r.publishedOn) }}</time>
            </p>
            <h3 class="mt-4 text-h3">
              <NuxtLink :to="`/resources/${r.slug}`" class="after:absolute after:inset-0 group-hover:text-bronze-dark">{{ r.title }}</NuxtLink>
            </h3>
            <p class="mt-3 text-muted">{{ r.description }}</p>
            <span class="mt-6 text-sm font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-[5px]" aria-hidden="true">Read the guide</span>
          </article>
        </div>
      </div>
    </section>

    <section class="section bg-stone-50" aria-labelledby="faq-preview-heading">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="faq-preview-heading" class="text-h2">Frequently asked questions</h2>
          <div class="mt-6"><AppButton to="/faq" variant="outline">View all FAQs</AppButton></div>
        </div>
        <div class="lg:col-span-8"><FaqAccordion :items="featuredFaqs" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
