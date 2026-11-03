<script setup lang="ts">
import { featuredFaqs } from '~/data/faqs'

const items = featuredFaqs.slice(0, 6)
</script>

<template>
  <section class="section bg-stone-50" aria-labelledby="faq-heading">
    <div class="wrap grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="faq-heading" class="text-h2">Common questions</h2>
        <p class="mt-5 text-lead text-muted">Practical answers about estimates, permits, and planning.</p>
        <div class="mt-8 flex flex-col items-start gap-2">
          <AppButton to="/faq" variant="outline">All questions</AppButton>
          <AppButton to="/resources" variant="quiet">Homeowner resources</AppButton>
        </div>
      </div>
      <div class="lg:col-span-8">
        <FaqAccordion :items="items" />
      </div>
    </div>
  </section>
</template>
