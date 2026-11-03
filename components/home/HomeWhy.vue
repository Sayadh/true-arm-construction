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
    <div class="wrap grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="why-heading" class="text-h2">Why choose True Arm Construction</h2>
        <p class="mt-5 text-lead text-muted">
          Straightforward information, a licensed contractor, and a plan you understand before work begins.
        </p>
      </div>
      <dl class="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
        <div v-for="r in reasons" :key="r.title" class="border-t border-ink/15 pt-6">
          <dt class="flex items-center gap-3 text-lg font-bold text-ink">
            <AppIcon :name="r.icon" :size="24" class="text-bronze-dark" />
            {{ r.title }}
          </dt>
          <dd class="mt-3 text-[0.9375rem] text-muted">{{ r.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
