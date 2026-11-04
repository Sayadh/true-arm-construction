<script setup lang="ts">
import { reviewPlatforms, reviewTotals, testimonials, checkedLabel } from '~/data/reviews'
import { estimatePath } from '~/data/navigation'

const title = 'Customer Reviews | True Arm Construction, Sacramento'
const description = reviewTotals.average
  ? `True Arm Construction is rated ${reviewTotals.average.toFixed(1)} out of 5 from ${reviewTotals.count} reviews on ${reviewPlatforms.map((p) => p.name).join(', ')}. Read what Sacramento customers say.`
  : 'Read what Sacramento customers say about True Arm Construction.'
const path = '/reviews'
usePageSeo({ title, description, path, absoluteTitle: true })
// No AggregateRating markup: Google does not show stars for a business's own reviews of itself.
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path }])
])
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Reviews', path }]"
      title="Customer reviews"
      lead="Our ratings come from independent review platforms. Follow the links to read every review in full, in the customer’s own words."
    >
      <p v-if="reviewTotals.average" class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
        <RatingStars :rating="reviewTotals.average" :size="24" />
        <span class="text-lead"><strong class="text-ink">{{ reviewTotals.average.toFixed(1) }} out of 5</strong> <span class="text-muted">from {{ reviewTotals.count }} reviews</span></span>
      </p>
    </PageHeader>

    <section class="section" aria-labelledby="platforms-heading">
      <div class="wrap">
        <h2 id="platforms-heading" class="text-h2">Ratings by platform</h2>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReviewPlatformCard v-for="p in reviewPlatforms" :key="p.id" :platform="p" />
        </div>
        <p class="mt-6 max-w-prose text-sm text-muted">
          Ratings and review counts as shown on each platform, {{ checkedLabel() }}. The average above is weighted by the number of reviews on each platform.
        </p>
      </div>
    </section>

    <section v-if="testimonials.length" class="section bg-stone-50" aria-labelledby="quotes-heading">
      <div class="wrap">
        <h2 id="quotes-heading" class="text-h2">In our customers’ words</h2>
        <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard v-for="(t, i) in testimonials" :key="i" :review="t" />
        </div>
      </div>
    </section>

    <section class="section" :class="testimonials.length ? '' : 'bg-stone-50'" aria-labelledby="leave-heading">
      <div class="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <h2 id="leave-heading" class="text-h2">Worked with us?</h2>
          <p class="mt-4 text-lead text-muted">A short review on the platform you used helps other Sacramento homeowners choose a contractor.</p>
          <ul class="mt-6 flex flex-wrap gap-3">
            <li v-for="p in reviewPlatforms" :key="p.id">
              <AppButton :href="p.url" variant="outline">Review us on {{ p.name }}</AppButton>
            </li>
          </ul>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <AppButton :to="estimatePath" size="lg" block track="estimate_cta_click" track-label="reviews_page">Get a Free Estimate</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
