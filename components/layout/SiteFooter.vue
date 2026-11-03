<script setup lang="ts">
import { Instagram, Facebook } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { serviceGroups, servicesByGroup } from '~/data/services'
import { enabledAreas } from '~/data/areas'
import { primaryNav, estimatePath } from '~/data/navigation'

const year = new Date().getFullYear()
const { track } = useAnalytics()
const groups = serviceGroups.map((g) => ({ ...g, items: servicesByGroup(g.id) }))
</script>

<template>
  <footer class="on-dark bg-deep text-stone/75">
    <div class="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
      <div class="lg:col-span-4">
        <Wordmark tone="light" size="lg" />
        <p class="mt-6 max-w-sm text-[0.9375rem] leading-relaxed">{{ company.description }}</p>
        <div class="mt-6"><LicenseTag tone="dark" /></div>
        <ul class="mt-6 space-y-2 text-[0.9375rem]">
          <li v-if="company.phone">
            <a :href="`tel:${company.phone}`" class="font-semibold text-paper hover:underline" @click="track('phone_click', { label: 'footer' })">{{ formatPhone(company.phone) }}</a>
          </li>
          <li v-if="company.email">
            <a :href="`mailto:${company.email}`" class="font-semibold text-paper hover:underline">{{ company.email }}</a>
          </li>
          <li v-if="company.social.instagram">
            <a :href="company.social.instagram" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-semibold text-paper hover:underline">
              <Instagram :size="16" aria-hidden="true" /> @truearmconstruction<span class="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </li>
          <li v-if="company.social.facebook">
            <a :href="company.social.facebook" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-semibold text-paper hover:underline">
              <Facebook :size="16" aria-hidden="true" /> True Arm Construction<span class="sr-only"> on Facebook (opens in a new tab)</span>
            </a>
          </li>
        </ul>
        <div class="mt-8">
          <AppButton :to="estimatePath" track="estimate_cta_click" track-label="footer">Get a Free Estimate</AppButton>
        </div>
      </div>

      <nav aria-label="Services" class="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
        <div v-for="g in groups" :key="g.id">
          <p class="text-sm font-bold text-paper">{{ g.name }}</p>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li v-for="s in g.items" :key="s.slug">
              <NuxtLink :to="`/services/${s.slug}`" class="hover:text-paper">{{ s.shortName }}</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <div class="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
        <nav aria-label="Company">
          <p class="text-sm font-bold text-paper">Company</p>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li v-for="l in primaryNav" :key="l.to"><NuxtLink :to="l.to" class="hover:text-paper">{{ l.label }}</NuxtLink></li>
            <li><NuxtLink to="/faq" class="hover:text-paper">FAQ</NuxtLink></li>
          </ul>
        </nav>
        <div>
          <p class="text-sm font-bold text-paper">Service area</p>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li v-for="a in enabledAreas" :key="a.slug">{{ a.name }}, {{ company.primaryArea.regionCode }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-line">
      <div class="wrap flex flex-col gap-3 py-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ year }} {{ company.legalName || company.name }}. All rights reserved.</p>
        <p class="flex gap-6">
          <NuxtLink to="/privacy-policy" class="hover:text-paper">Privacy Policy</NuxtLink>
          <NuxtLink to="/licenses-certifications" class="hover:text-paper">License information</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>
