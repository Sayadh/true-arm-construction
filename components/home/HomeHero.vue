<script setup lang="ts">
import { company } from '~/data/company'
import { estimatePath } from '~/data/navigation'
</script>

<template>
  <section class="on-dark relative overflow-hidden bg-ink text-stone">
    <div class="graph-paper-dark absolute inset-0" aria-hidden="true" />
    <div class="wrap relative grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
      <div class="flex flex-col justify-center lg:col-span-7">
        <p class="flex items-center gap-3 text-[0.9375rem] font-semibold text-bronze-light">
          <span class="h-px w-8 bg-bronze" aria-hidden="true" />
          General contractor in {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}
        </p>
        <h1 class="mt-6 text-display text-paper">
          Construction and remodeling, built around you.
        </h1>
        <p class="mt-6 max-w-[38rem] text-lead text-stone/80">
          Residential and commercial construction, remodeling, and property improvements in Sacramento. From kitchen and
          bathroom remodels to room additions, flooring, and fences, we help you turn a plan into a finished space.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <AppButton :to="estimatePath" size="lg" track="estimate_cta_click" track-label="hero">Get a Free Estimate</AppButton>
          <AppButton to="/projects" variant="outline-light" size="lg">View Projects</AppButton>
        </div>

        <!-- Trust detail: measured like a drawing annotation -->
        <div class="mt-12 max-w-[38rem]">
          <div class="dim-line text-bronze/70" aria-hidden="true" />
          <dl class="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt class="text-stone/60">California license</dt>
              <dd class="mt-0.5 font-semibold text-paper">#{{ company.license.number }}, Class {{ company.license.classification }}</dd>
            </div>
            <div v-if="company.confirmedFacts.residential && company.confirmedFacts.commercial">
              <dt class="text-stone/60">Property types</dt>
              <dd class="mt-0.5 font-semibold text-paper">Residential and commercial</dd>
            </div>
            <div v-if="company.confirmedFacts.freeEstimates">
              <dt class="text-stone/60">Estimates</dt>
              <dd class="mt-0.5 font-semibold text-paper">Free, project-specific</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="lg:col-span-5">
        <figure class="relative rounded border border-slate-line bg-deep/60 p-4 sm:p-6">
          <div v-if="company.heroImage" class="aspect-[4/5] overflow-hidden rounded-sm">
            <NuxtImg
              format="webp"
              :src="company.heroImage.src"
              :alt="company.heroImage.alt"
              :width="company.heroImage.width"
              :height="company.heroImage.height"
              sizes="xs:100vw lg:40vw"
              loading="eager"
              fetchpriority="high"
              class="h-full w-full object-cover"
            />
          </div>
          <HeroElevation v-else />

          <!-- Title block, as on a construction drawing -->
          <figcaption class="mt-4 grid grid-cols-2 border border-slate-line text-[0.8125rem]">
            <div class="border-b border-r border-slate-line p-3">
              <span class="block text-stone/55">Project</span>
              <span class="font-semibold text-paper">Yours</span>
            </div>
            <div class="border-b border-slate-line p-3">
              <span class="block text-stone/55">Location</span>
              <span class="font-semibold text-paper">{{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}</span>
            </div>
            <div class="border-r border-slate-line p-3">
              <span class="block text-stone/55">Contractor</span>
              <span class="font-semibold text-paper">{{ company.name }}</span>
            </div>
            <div class="p-3">
              <span class="block text-stone/55">License</span>
              <span class="font-semibold text-paper">#{{ company.license.number }}</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
