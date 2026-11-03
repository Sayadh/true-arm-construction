<script setup lang="ts">
import { featuredFaqs } from '~/data/faqs'

const title = 'General Contractor in Sacramento, CA | True Arm Construction'
const description =
  'Residential and commercial construction, remodeling, tile, painting, and property improvements in Sacramento, CA. Licensed Class B contractor. Free estimates.'

usePageSeo({ title, description, path: '/', absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  websiteSchema(),
  webPageSchema({ path: '/', title, description }),
  faqSchema(featuredFaqs.slice(0, 6))
])
</script>

<template>
  <div>
    <HomeHero />

    <section class="section" aria-labelledby="selector-heading">
      <div class="wrap">
        <div class="max-w-2xl">
          <h2 id="selector-heading" class="text-h2">What are you planning to improve?</h2>
          <p class="mt-4 text-lead text-muted">Pick the closest match and we will take you to the right service.</p>
        </div>
        <div class="mt-10">
          <ProjectNavigator />
        </div>
      </div>
    </section>

    <HomeServices />
    <HomeWhy />
    <HomeProjects />
    <HomeProcess />
    <HomePlannerCta />
    <HomeCredentials />
    <HomeAreas />
    <HomeFaq />
    <CtaBand />
  </div>
</template>
