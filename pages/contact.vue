<script setup lang="ts">
import { Instagram, Facebook, Mail, MapPin, Phone, Clock, MessageSquare } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'

const title = 'Contact True Arm Construction | Sacramento, CA'
const description =
  'Contact True Arm Construction about a construction or remodeling project in Sacramento, CA, or start a free estimate with the project planner.'
const path = '/contact'
usePageSeo({ title, description, path, absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path }])
])
const { track } = useAnalytics()
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Contact', path }]"
      title="Contact us"
      lead="For an estimate, the project planner is the fastest way to share the details we need. For anything else, send a message below."
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="space-y-8 lg:col-span-5">
          <div class="rounded bg-ink p-7 text-stone">
            <h2 class="text-h3 text-paper">Request a free estimate</h2>
            <p class="mt-3 text-stone/75">Answer a few short questions about your project. Most people finish in a couple of minutes.</p>
            <AppButton to="/free-estimate" class="mt-6" track="estimate_cta_click" track-label="contact_page">Start the project planner</AppButton>
          </div>

          <div>
            <h2 class="text-lg font-bold text-ink">Contact details</h2>
            <ul class="mt-4 space-y-4">
              <li v-if="company.phone" class="flex items-center gap-3">
                <Phone :size="20" class="text-bronze-dark" aria-hidden="true" />
                <a :href="`tel:${company.phone}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4" @click="track('phone_click', { label: 'contact_page' })">{{ formatPhone(company.phone) }}</a>
                <span class="text-sm text-muted">call or text</span>
              </li>
              <li v-if="company.textPhone" class="flex items-center gap-3">
                <MessageSquare :size="20" class="text-bronze-dark" aria-hidden="true" />
                <a :href="`sms:${company.textPhone}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4" @click="track('sms_click', { label: 'contact_page' })">{{ formatPhone(company.textPhone) }}</a>
                <span class="text-sm text-muted">text only</span>
              </li>
              <li v-if="company.email" class="flex items-center gap-3">
                <Mail :size="20" class="text-bronze-dark" aria-hidden="true" />
                <a :href="`mailto:${company.email}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4" @click="track('email_click', { label: 'contact_page' })">{{ company.email }}</a>
              </li>
              <li v-if="company.social.instagram" class="flex items-center gap-3">
                <Instagram :size="20" class="text-bronze-dark" aria-hidden="true" />
                <a :href="company.social.instagram" target="_blank" rel="noopener" class="font-semibold text-ink underline decoration-bronze underline-offset-4">@truearmconstruction<span class="sr-only"> on Instagram (opens in a new tab)</span></a>
              </li>
              <li v-if="company.social.facebook" class="flex items-center gap-3">
                <Facebook :size="20" class="text-bronze-dark" aria-hidden="true" />
                <a :href="company.social.facebook" target="_blank" rel="noopener" class="font-semibold text-ink underline decoration-bronze underline-offset-4">True Arm Construction<span class="sr-only"> on Facebook (opens in a new tab)</span></a>
              </li>
              <li class="flex items-center gap-3">
                <MapPin :size="20" class="text-bronze-dark" aria-hidden="true" />
                <span v-if="company.address">{{ company.address.street }}, {{ company.address.city }}, {{ company.address.region }} {{ company.address.postalCode }}</span>
                <span v-else>Serving {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}</span>
              </li>
              <li v-if="company.hours?.length" class="flex items-start gap-3">
                <Clock :size="20" class="mt-0.5 text-bronze-dark" aria-hidden="true" />
                <span><span v-for="h in company.hours" :key="h.days" class="block">{{ h.days }}: {{ h.hours }}</span></span>
              </li>
            </ul>
          </div>
          <LicenseTag />
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <h2 class="mb-6 text-h3">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
