<script setup lang="ts">
import { reviewPlatforms, reviewTotals, featuredTestimonials, checkedLabel } from '~/data/reviews'

const quotes = featuredTestimonials()
</script>

<template>
  <section v-if="reviewPlatforms.length" class="section" aria-labelledby="reviews-heading">
    <div class="wrap">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div v-reveal class="max-w-2xl">
          <h2 id="reviews-heading" class="text-h2">What our customers say</h2>
          <p v-if="reviewTotals.average" class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lead text-muted">
            <RatingStars :rating="reviewTotals.average" :size="20" />
            <span><strong class="text-ink">{{ reviewTotals.average.toFixed(1) }}</strong> average from {{ reviewTotals.count }} reviews on {{ reviewPlatforms.map((p) => p.name).join(', ') }}</span>
          </p>
        </div>
        <AppButton to="/reviews" variant="outline">See all reviews</AppButton>
      </div>

      <div v-reveal="{ delay: 100 }" class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ReviewPlatformCard v-for="p in reviewPlatforms" :key="p.id" :platform="p" />
      </div>

      <div v-if="quotes.length" v-reveal="{ delay: 150 }" class="mt-6 grid gap-4 md:grid-cols-3">
        <TestimonialCard v-for="(q, i) in quotes" :key="i" :review="q" />
      </div>

      <p class="mt-6 text-sm text-muted">Ratings as shown on each platform, {{ checkedLabel() }}.</p>
    </div>
  </section>
</template>
