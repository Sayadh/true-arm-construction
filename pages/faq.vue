<script setup lang="ts">
import { faqCategories, faqs, faqsByCategory } from '~/data/faqs'

const title = 'Construction & Remodeling FAQ | Sacramento'
const description =
  'Answers to common questions about remodeling, room additions, flooring, painting, fences, repairs, permits, and estimates in Sacramento.'
const path = '/faq'
usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path }]),
  faqSchema(faqs)
])

const groups = faqCategories.map((c) => ({ ...c, items: faqsByCategory(c.id) })).filter((g) => g.items.length)
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Resources', path: '/resources' }, { name: 'FAQ', path }]"
      title="Frequently asked questions"
      lead="Practical answers about planning, estimates, permits, and the services we offer."
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <nav aria-label="FAQ categories" class="lg:col-span-3">
          <ul class="flex flex-wrap gap-2 lg:sticky lg:top-[calc(var(--header-h)+3.5rem)] lg:flex-col lg:gap-1">
            <li v-for="g in groups" :key="g.id">
              <a :href="`#${g.id}`" class="inline-block rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink hover:border-ink lg:rounded lg:border-0 lg:px-0 lg:py-1.5 lg:hover:text-bronze-dark">{{ g.name }}</a>
            </li>
          </ul>
        </nav>
        <div class="space-y-16 lg:col-span-8 lg:col-start-5">
          <section v-for="g in groups" :id="g.id" :key="g.id" class="scroll-mt-32" :aria-labelledby="`h-${g.id}`">
            <h2 :id="`h-${g.id}`" class="mb-4 text-h3">{{ g.name }}</h2>
            <FaqAccordion :items="g.items" />
          </section>
        </div>
      </div>
    </section>

    <CtaBand title="Still have a question?" text="Ask it in your estimate request, and we will answer it when we follow up." />
  </div>
</template>
