<script setup lang="ts">
import { featuredFaqs } from '~/data/faqs'

// Painting-first positioning (client decision, 2026-11); remodeling stays in the title as the second line.
const title = 'Painting & Remodeling Contractor in Sacramento, CA | True Arm'
const description =
  'Interior, exterior, cabinet, and commercial painting in Sacramento, plus remodeling, flooring, and repairs. Licensed contractor, EPA Lead-Safe Certified Firm.'

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
    <HomePainting />

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
    <HomeWork />
    <HomeReviews />
    <HomeProcess />
    <HomePlannerCta />
    <HomeCredentials />
    <HomeAreas />
    <HomeFaq />
    <CtaBand />
  </div>
</template>
