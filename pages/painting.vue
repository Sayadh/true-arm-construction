<script setup lang="ts">
import { ArrowRight, MessageSquareText, Phone, ShieldCheck } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { paintingHub as hub } from '~/data/painting'
import { getService } from '~/data/services'
import { faqsByIds } from '~/data/faqs'
import { publishedResources } from '~/data/resources'
import { publishedCredentials } from '~/data/credentials'
import { workMedia, mediaForService, coverImage } from '~/data/work'
import type { Service, WorkMedia } from '~/types'

const services = hub.services.map(getService).filter((s): s is Service => Boolean(s))
const faqItems = faqsByIds(hub.faqIds)
// Guides whose first related service is a painting service
const guides = publishedResources.filter((r) => getService(r.relatedServices[0] ?? '')?.group === 'painting')
const epa = publishedCredentials.find((c) => c.id === 'epa-lead-safe')

const heroMedia = workMedia.find((m) => m.id === hub.heroMedia)
const heroImage = heroMedia ? coverImage(heroMedia) : null

// Real painting work only: interior first, then exterior, featured items leading each.
const work: WorkMedia[] = [...mediaForService('interior-painting'), ...mediaForService('exterior-painting')]

const { scrollToId } = useAnchorScroll()
const crumbs = [{ name: 'Painting', path: hub.path }]

usePageSeo({ title: hub.seoTitle, description: hub.metaDescription, path: hub.path, absoluteTitle: true, image: heroImage?.src })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path: hub.path, title: hub.seoTitle, description: hub.metaDescription }),
  paintingServiceSchema({ path: hub.path, description: hub.metaDescription, services }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs]),
  ...(faqItems.length ? [faqSchema(faqItems)] : [])
])
</script>

<template>
  <div>
    <!-- Hero: real painting work, the quote one tap away -->
    <section class="on-dark relative overflow-hidden bg-ink text-stone">
      <div class="graph-paper-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div class="wrap relative grid gap-10 pb-14 pt-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-10">
        <div class="lg:col-span-7">
          <Breadcrumbs :items="crumbs" tone="dark" />
          <p class="mt-8 flex items-center gap-3 text-[0.9375rem] font-semibold text-bronze-light">
            <span class="h-px w-8 bg-bronze" aria-hidden="true" />
            Painting contractor in {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}
          </p>
          <h1 class="mt-4 text-h1 text-paper">{{ hub.heroTitle }}</h1>
          <p class="mt-6 max-w-[40rem] text-lead text-stone/85">{{ hub.heroLead }}</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <AppButton href="#quote" size="lg" data-primary-cta track="estimate_cta_click" track-label="painting_hero" @click="scrollToId('quote', $event)">
              Get a free painting estimate
            </AppButton>
            <AppButton v-if="company.phone" :href="`tel:${company.phone}`" variant="outline-light" size="lg" track="phone_click" track-label="painting_hero">
              <Phone :size="18" aria-hidden="true" /> {{ formatPhone(company.phone) }}
            </AppButton>
          </div>
          <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/10 pt-6">
            <LicenseTag tone="dark" />
            <NuxtLink v-if="epa" to="/licenses-certifications" class="group inline-flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-full border border-bronze/60 bg-bronze/10 text-bronze-light"><ShieldCheck :size="20" aria-hidden="true" /></span>
              <span class="text-sm leading-tight">
                <span class="block font-semibold text-paper group-hover:text-bronze-light">EPA Lead-Safe Certified Firm</span>
                <span class="text-stone/65">{{ epa.credentialNumber }}</span>
              </span>
            </NuxtLink>
          </div>
        </div>

        <div class="relative lg:col-span-5">
          <div class="relative overflow-hidden rounded-lg border border-paper/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <MediaFrame :image="heroImage" icon="PaintRoller" label="Painting photo" aspect="aspect-[4/5]" sizes="xs:100vw lg:40vw" priority :rounded="false" />
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 to-transparent p-5 pt-16">
              <p class="text-sm font-semibold text-paper">Our work: exterior repaint, Sacramento area</p>
            </div>
          </div>
          <div v-if="epa?.image" class="absolute -left-4 -top-5 hidden w-32 rotate-[-6deg] rounded-lg bg-white p-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] sm:block lg:-left-8">
            <NuxtImg format="webp" :src="epa.image.src" :alt="epa.image.alt" :width="epa.image.width" :height="epa.image.height" sizes="xs:128px" class="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>

    <!-- Painting services -->
    <section class="section" aria-labelledby="painting-services-heading">
      <div class="wrap">
        <div v-reveal class="max-w-2xl">
          <h2 id="painting-services-heading" class="text-h2">Painting services</h2>
          <p class="mt-4 text-lead text-muted">One crew for the inside, the outside, the cabinets, and the fence. Choose what you need.</p>
        </div>
        <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <li v-for="(s, i) in services" :key="s.slug" v-reveal="{ delay: i * 70 }">
            <NuxtLink
              :to="`/services/${s.slug}`"
              class="group flex h-full flex-col rounded-lg border border-stone-300 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_22px_50px_-30px_rgba(19,41,75,0.5)]"
            >
              <span class="flex h-12 w-12 items-center justify-center rounded-md bg-ink/[0.06] text-bronze-dark transition-colors duration-300 group-hover:bg-ink group-hover:text-bronze-light">
                <AppIcon :name="s.icon" :size="24" />
              </span>
              <span class="mt-5 block text-lg font-bold leading-snug text-ink">{{ s.name }}</span>
              <span class="mt-1.5 block text-[0.9375rem] text-muted">{{ s.cardText }}</span>
              <span class="block min-h-[1.25rem] flex-1" aria-hidden="true" />
              <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Learn more <ArrowRight :size="15" aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- What's included -->
    <section class="section bg-stone-50" aria-labelledby="included-heading">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div v-reveal class="lg:col-span-4">
          <h2 id="included-heading" class="text-h2">What every painting job includes</h2>
          <p class="mt-5 text-lead text-muted">The paint is the last step. The difference is in what happens before and after it.</p>
        </div>
        <dl class="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          <div v-for="(p, i) in hub.promises" :key="p.title" v-reveal="{ delay: (i % 2) * 90 }" class="border-t border-ink/15 pt-6">
            <dt class="flex items-center gap-3 text-lg font-bold text-ink">
              <AppIcon :name="p.icon" :size="22" class="text-bronze-dark" />
              {{ p.title }}
            </dt>
            <dd class="mt-2.5 text-[0.9375rem] text-muted">{{ p.text }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Lead-safe -->
    <section v-if="epa" class="section on-dark relative overflow-hidden bg-deep text-stone" aria-labelledby="lead-safe-heading">
      <div class="graph-paper-dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div class="wrap relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div v-reveal class="lg:col-span-7">
          <h2 id="lead-safe-heading" class="text-h2 text-paper">{{ hub.leadSafe.title }}</h2>
          <div class="mt-6 space-y-4 text-lead text-stone/85">
            <p v-for="(para, i) in hub.leadSafe.body" :key="i">{{ para }}</p>
          </div>
          <div class="mt-8 flex flex-wrap gap-3">
            <AppButton href="#quote" track="estimate_cta_click" track-label="painting_lead_safe" @click="scrollToId('quote', $event)">Request an estimate</AppButton>
            <AppButton to="/licenses-certifications" variant="outline-light">See our certification</AppButton>
          </div>
        </div>
        <div v-reveal="{ delay: 150 }" class="lg:col-span-4 lg:col-start-9">
          <div class="rounded-lg bg-white p-6 text-center shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
            <NuxtImg v-if="epa.image" format="webp" :src="epa.image.src" :alt="epa.image.alt" :width="epa.image.width" :height="epa.image.height" sizes="xs:90vw sm:320px" loading="lazy" class="mx-auto h-auto w-full max-w-[16rem]" />
            <p class="mt-4 text-sm font-semibold text-ink">{{ epa.name }}</p>
            <p class="text-sm text-muted">Certification {{ epa.credentialNumber }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Real work -->
    <section v-if="work.length" id="work" class="section" aria-labelledby="painting-work-heading">
      <div class="wrap">
        <div v-reveal class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-2xl">
            <h2 id="painting-work-heading" class="text-h2">Our painting work</h2>
            <p class="mt-3 text-lead text-muted">Photos and videos from our own interior and exterior painting jobs, including prep and masking.</p>
          </div>
          <AppButton to="/projects" variant="outline">See all our work</AppButton>
        </div>
        <div class="mt-10"><WorkGallery :items="work" :initial="9" /></div>
      </div>
    </section>

    <!-- Process -->
    <section class="section border-y border-stone-300 bg-white" aria-labelledby="painting-process-heading">
      <div class="wrap">
        <h2 id="painting-process-heading" v-reveal class="max-w-2xl text-h2">How a painting project works</h2>
        <ol class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(step, i) in hub.process" :key="step.title" v-reveal="{ delay: (i % 3) * 90 }" class="relative pl-16">
            <span class="absolute left-0 top-0 font-display text-5xl font-extrabold leading-none text-bronze [font-stretch:72%]" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-lg font-bold text-ink">{{ step.title }}</h3>
            <p class="mt-1.5 text-[0.9375rem] text-muted">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Quote -->
    <section id="quote" class="section scroll-mt-14 bg-stone-50" aria-labelledby="quote-heading">
      <div class="wrap grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="quote-heading" class="text-h2">{{ hub.quote.title }}</h2>
          <p class="mt-4 text-lead text-muted">{{ hub.quote.lead }}</p>
          <div class="mt-8 space-y-4 border-t border-ink/15 pt-6">
            <p class="text-sm font-semibold text-ink">Prefer to talk?</p>
            <a v-if="company.phone" :href="`tel:${company.phone}`" class="flex items-center gap-3 font-semibold text-ink hover:text-bronze-dark">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper"><Phone :size="18" aria-hidden="true" /></span>
              {{ formatPhone(company.phone) }}
            </a>
            <a v-if="company.textPhone" :href="`sms:${company.textPhone}`" class="flex items-center gap-3 font-semibold text-ink hover:text-bronze-dark">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper"><MessageSquareText :size="18" aria-hidden="true" /></span>
              <span>{{ formatPhone(company.textPhone) }} <span class="block text-sm font-normal text-muted">Text photos of the job</span></span>
            </a>
          </div>
        </div>
        <div class="lg:col-span-8"><PaintingQuoteForm /></div>
      </div>
    </section>

    <!-- Painting guides -->
    <section v-if="guides.length" class="section pb-0" aria-labelledby="painting-guides-heading">
      <div class="wrap">
        <h2 id="painting-guides-heading" class="text-h2">Painting guides</h2>
        <ul class="mt-8 grid gap-4 md:grid-cols-3">
          <li v-for="g in guides" :key="g.slug">
            <NuxtLink :to="`/resources/${g.slug}`" class="group flex h-full flex-col rounded-lg border border-stone-300 bg-white p-6 hover:border-ink/40">
              <span class="text-lg font-bold leading-snug text-ink group-hover:text-bronze-dark">{{ g.title }}</span>
              <span class="mt-2 flex-1 text-[0.9375rem] text-muted">{{ g.description }}</span>
              <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">Read the guide <ArrowRight :size="16" aria-hidden="true" class="transition-transform group-hover:translate-x-0.5" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="faqItems.length" class="section" aria-labelledby="painting-faq-heading">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="painting-faq-heading" class="text-h2">Painting questions</h2>
          <p class="mt-4 text-lead text-muted">More answers on the <NuxtLink to="/faq#painting" class="font-semibold text-ink underline decoration-bronze underline-offset-4">FAQ page</NuxtLink>.</p>
        </div>
        <div class="lg:col-span-8"><FaqAccordion :items="faqItems" /></div>
      </div>
    </section>
  </div>
</template>
