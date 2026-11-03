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
  <section class="on-dark relative isolate overflow-hidden bg-ink text-stone">
    <!-- Licensed stock interior as atmosphere, washed in forest so the copy stays the focus -->
    <NuxtImg
      format="webp"
      src="/images/stock/cta-living-room.jpg"
      alt=""
      aria-hidden="true"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      loading="lazy"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/85 to-deep/50" aria-hidden="true" />
    <div class="graph-paper-dark absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
    <div class="wrap relative grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-32">
      <div v-reveal class="lg:col-span-7">
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
