<script setup lang="ts">
import { areaNames } from '~/data/areas'
import { company } from '~/data/company'
import { serviceGroups, servicesByGroup } from '~/data/services'

const title = 'About True Arm Construction | Sacramento General Contractor'
const description =
  'True Arm Construction is a California-licensed Class B general building contractor serving residential and commercial properties in Sacramento.'
const path = '/about'
usePageSeo({ title, description, path, absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About Us', path }])
])

const principles = [
  {
    title: 'Clear scope before work begins',
    text: 'We put the scope in writing so you know what is included, what is not, and which decisions are still open.'
  },
  {
    title: 'Straight answers',
    text: 'If something will cost more, take longer, or needs a permit, we would rather tell you early than surprise you later.'
  },
  {
    title: 'Careful work on site',
    text: 'Preparation, protection of your property, and cleanup are part of the job, not extras.'
  },
  {
    title: 'Communication throughout',
    text: 'You should always know what is happening next. We keep you informed as the work moves forward.'
  }
]

const groups = serviceGroups.map((g) => ({ ...g, items: servicesByGroup(g.id) }))
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'About Us', path: '/about' }]"
      title="About True Arm Construction"
      lead="A Sacramento construction and remodeling contractor focused on quality workmanship, clear communication, and dependable project execution."
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="text-h2">Built around your vision</h2>
          <div class="rich mt-6 text-lead">
            <p>
              True Arm Construction works with homeowners, property owners, and businesses in {{ areaNames() }} on
              projects ranging from kitchen and bathroom remodels, flooring, and painting to room additions, fences, and repairs.
            </p>
            <p>
              We hold a California contractor license, #{{ company.license.number }}, in Class {{ company.license.classification }}
              ({{ company.license.classificationName }}). That classification covers projects involving multiple building trades,
              which describes most remodeling and room addition work.
            </p>
            <p>
              Every project starts with a conversation. We want to understand what you are trying to achieve, how you use the space,
              and what matters most to you before we talk about materials or scheduling.
            </p>
          </div>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <LicenseCard />
        </div>
      </div>
    </section>

    <section class="section bg-stone-50" aria-labelledby="principles-heading">
      <div class="wrap">
        <h2 id="principles-heading" class="max-w-2xl text-h2">How we approach every project</h2>
        <dl class="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          <div v-for="p in principles" :key="p.title" class="border-t border-ink/15 pt-6">
            <dt class="text-lg font-bold text-ink">{{ p.title }}</dt>
            <dd class="mt-2 text-muted">{{ p.text }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="section" aria-labelledby="what-heading">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="what-heading" class="text-h2">What we do</h2>
          <p class="mt-4 text-muted">Residential and commercial services, grouped by the type of work.</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:col-span-8">
          <div v-for="g in groups" :key="g.id">
            <h3 class="font-bold text-ink">{{ g.name }}</h3>
            <ul class="mt-3 space-y-2">
              <li v-for="s in g.items" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="text-body underline decoration-stone-400 underline-offset-4 hover:decoration-bronze">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CtaBand title="Let’s talk about your project." />
  </div>
</template>
