<script setup lang="ts">
import { company } from '~/data/company'

const reasons = [
  {
    icon: 'ShieldCheck',
    title: 'Licensed in California',
    text: `License #${company.license.number}, Class ${company.license.classification} General Building Contractor. You can verify it on the CSLB website in under a minute.`
  },
  {
    icon: 'Building2',
    title: 'Residential and commercial',
    text: 'We work on homes and commercial properties, from single-room updates to room additions.'
  },
  {
    icon: 'FileText',
    title: 'Free, project-specific estimates',
    text: 'Your estimate reflects your property and your scope, not a generic price list.'
  },
  {
    icon: 'MessagesSquare',
    title: 'Consultation before commitment',
    text: 'We talk through goals, options, and practical considerations before any work is scheduled.'
  },
  {
    icon: 'HardHat',
    title: 'One contractor coordinating the work',
    text: 'Multi-trade projects such as remodels are planned and managed by one licensed general contractor.'
  }
]
</script>

<template>
  <section class="section bg-stone-50" aria-labelledby="why-heading">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
      <!-- Photo column (licensed stock, atmosphere only) with the real license as a stamp -->
      <div class="relative lg:col-span-5">
        <div class="lg:sticky lg:top-[calc(var(--header-offset)+2rem)]">
          <div v-reveal="'wipe'" class="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink">
            <NuxtImg
              format="webp"
              src="/images/stock/craft-carpentry.jpg"
              alt="Carpenter measuring and cutting lumber on a job site"
              sizes="xs:100vw lg:40vw"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div
            v-reveal="{ delay: 300 }"
            class="absolute -bottom-6 left-6 right-6 rounded-lg bg-ink p-5 text-paper shadow-[0_24px_60px_-24px_rgba(12,27,51,0.7)] sm:left-auto sm:right-[-1.5rem] sm:w-72"
          >
            <p class="text-xs font-semibold text-bronze-light">California license</p>
            <p class="mt-1 font-display text-3xl font-extrabold leading-none [font-stretch:78%]">#{{ company.license.number }}</p>
            <p class="mt-2 text-sm text-stone/75">Class {{ company.license.classification }}, {{ company.license.classificationName }}</p>
          </div>
        </div>
      </div>

      <div class="pt-6 lg:col-span-7 lg:pt-0">
        <div v-reveal>
          <h2 id="why-heading" class="text-h2">Why choose True Arm Construction</h2>
          <p class="mt-5 max-w-xl text-lead text-muted">
            Straightforward information, a licensed contractor, and a plan you understand before work begins.
          </p>
        </div>
        <dl class="mt-10">
          <div
            v-for="(r, i) in reasons"
            :key="r.title"
            v-reveal="{ delay: i * 70 }"
            class="group grid grid-cols-[auto,1fr] gap-x-5 border-t border-ink/15 py-6 last:border-b"
          >
            <dt class="contents">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bronze-light transition-colors duration-300 group-hover:bg-bronze group-hover:text-white">
                <AppIcon :name="r.icon" :size="22" />
              </span>
              <span class="self-center text-lg font-bold text-ink">{{ r.title }}</span>
            </dt>
            <dd class="col-start-2 mt-1 text-[0.9375rem] text-muted">{{ r.text }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
