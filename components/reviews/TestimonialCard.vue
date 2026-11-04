<script setup lang="ts">
import type { Testimonial } from '~/types'
import { platformName } from '~/data/reviews'
import { getService } from '~/data/services'

const props = defineProps<{ review: Testimonial }>()
const service = computed(() => (props.review.service ? getService(props.review.service) : undefined))
const date = computed(() => {
  const d = props.review.date
  if (!d) return ''
  const parts = d.split('-')
  return new Date(`${parts[0]}-${parts[1] ?? '01'}-${parts[2] ?? '01'}T12:00:00`).toLocaleDateString('en-US', parts[2] ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' })
})
</script>

<template>
  <figure class="flex h-full flex-col rounded-lg border border-stone-300 bg-white p-6">
    <RatingStars :rating="review.rating" :size="16" />
    <blockquote class="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-body">
      <p>“{{ review.quote }}”</p>
    </blockquote>
    <figcaption class="mt-6 border-t border-stone-300 pt-4 text-sm">
      <span class="font-bold text-ink">{{ review.author }}</span>
      <span class="text-muted"> · via {{ platformName(review.platform) }}<template v-if="date"> · {{ date }}</template></span>
      <span v-if="service" class="mt-1 block text-muted">{{ service.shortName }}</span>
    </figcaption>
  </figure>
</template>
