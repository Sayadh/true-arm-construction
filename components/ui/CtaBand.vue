<script setup lang="ts">
import { company, formatPhone } from '~/data/company'
import { estimatePath } from '~/data/navigation'

withDefaults(
  defineProps<{
    title?: string
    text?: string
    cta?: string
    to?: string
    service?: string
  }>(),
  {
    title: 'Ready to bring your project to life?',
    text: 'Tell us what you are planning. Estimates are free, and you can skip any question you are not sure about yet.',
    cta: 'Request your free estimate',
    to: estimatePath
  }
)
</script>

<template>
  <section class="on-dark relative overflow-hidden bg-ink text-stone">
    <div class="graph-paper-dark absolute inset-0 opacity-60" aria-hidden="true" />
    <div class="wrap relative grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
      <div class="lg:col-span-7">
        <h2 class="text-h2 text-paper">{{ title }}</h2>
        <p class="mt-5 max-w-prose text-lead text-stone/80">{{ text }}</p>
      </div>
      <div class="flex flex-col gap-4 lg:col-span-5 lg:items-end">
        <div class="flex flex-col gap-3 sm:flex-row">
          <AppButton :to="service ? `${to}?service=${service}` : to" size="lg" track="estimate_cta_click" :track-label="service || 'cta_band'">
            {{ cta }}
          </AppButton>
          <AppButton
            v-if="company.phone"
            :href="`tel:${company.phone}`"
            variant="outline-light"
            size="lg"
            track="phone_click"
          >
            Call {{ formatPhone(company.phone) }}
          </AppButton>
        </div>
        <LicenseTag tone="dark" />
      </div>
    </div>
  </section>
</template>
