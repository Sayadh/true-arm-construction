<script setup lang="ts">
import { company } from '~/data/company'
import { estimatePath } from '~/data/navigation'

/**
 * The title block "stamps in" after the house elevation finishes drawing
 * (or quickly, if a real hero photo is shown instead) rather than appearing
 * with the rest of the hero — it reads as the drawing being signed off.
 * Gated behind IntersectionObserver so it never fires off-screen on mobile.
 */
const headline = 'Construction and remodeling, built around you.'
const headlineWords = headline.split(' ')

const captionEl = ref<HTMLElement | null>(null)
const captionInView = ref(false)
const captionBaseDelay = company.heroImage ? '0.15s' : '2.2s'
let observer: IntersectionObserver | null = null

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !captionEl.value) {
    captionInView.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        captionInView.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
  )
  observer.observe(captionEl.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="on-dark relative overflow-hidden bg-deep text-stone">
    <HeroSlideshow :slides="company.heroSlides" />
    <div class="graph-paper-dark absolute inset-0 opacity-30" aria-hidden="true" />
    <div class="wrap relative grid gap-12 pb-16 pt-14 sm:pt-20 lg:min-h-[calc(100svh-var(--header-offset))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
      <div class="intro flex flex-col justify-center lg:col-span-7">
        <p class="intro-item flex items-center gap-3 text-[0.9375rem] font-semibold text-bronze-light" style="--d: 0ms">
          <span class="h-px w-8 bg-bronze" aria-hidden="true" />
          General contractor in {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}
        </p>
        <h1 class="mt-6 text-display text-paper" :aria-label="headline">
          <template v-for="(w, i) in headlineWords" :key="i"><span class="word" aria-hidden="true"><span class="word-in" :style="{ '--d': `${120 + i * 55}ms` }">{{ w }}</span></span>{{ ' ' }}</template>
        </h1>
        <p class="intro-item mt-7 max-w-[36rem] text-lead text-stone/85" style="--d: 520ms">
          Residential and commercial construction, remodeling, and property improvements in Sacramento. From kitchen and
          bathroom remodels to room additions, flooring, and fences, we help you turn a plan into a finished space.
        </p>
        <div class="intro-item mt-9 flex flex-col gap-3 sm:flex-row" style="--d: 640ms">
          <AppButton :to="estimatePath" size="lg" data-primary-cta track="estimate_cta_click" track-label="hero">Get a Free Estimate</AppButton>
          <AppButton to="/projects" variant="outline-light" size="lg">View Projects</AppButton>
        </div>

        <!-- Trust detail: measured like a drawing annotation -->
        <div class="intro-item mt-12 max-w-[38rem]" style="--d: 760ms">
          <div class="dim-line text-bronze/70" aria-hidden="true" />
          <dl class="spec-list mt-6 grid grid-cols-1 text-sm sm:grid-cols-3">
            <div class="spec-item">
              <dt class="text-stone/60">California license</dt>
              <dd class="mt-1 font-semibold text-paper">#{{ company.license.number }}, Class {{ company.license.classification }}</dd>
            </div>
            <div v-if="company.confirmedFacts.residential && company.confirmedFacts.commercial" class="spec-item">
              <dt class="text-stone/60">Property types</dt>
              <dd class="mt-1 font-semibold text-paper">Residential and commercial</dd>
            </div>
            <div v-if="company.confirmedFacts.freeEstimates" class="spec-item">
              <dt class="text-stone/60">Estimates</dt>
              <dd class="mt-1 font-semibold text-paper">Free, project-specific</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="lg:col-span-5">
        <figure class="relative rounded-lg border border-paper/10 bg-deep/55 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-6">
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

          <!-- Title block, as on a construction drawing: stamped in cell by cell -->
          <figcaption
            ref="captionEl"
            class="title-block mt-4 grid grid-cols-2 border border-slate-line text-[0.8125rem]"
            :class="{ 'in-view': captionInView }"
            :style="{ '--cap-base': captionBaseDelay }"
          >
            <div class="cell border-b border-r border-slate-line p-3" style="--i: 0">
              <span class="scan" aria-hidden="true" />
              <span class="label block text-stone/55">Project</span>
              <span class="value font-semibold text-paper">Yours</span>
            </div>
            <div class="cell border-b border-slate-line p-3" style="--i: 1">
              <span class="scan" aria-hidden="true" />
              <span class="label block text-stone/55">Location</span>
              <span class="value font-semibold text-paper">{{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}</span>
            </div>
            <div class="cell border-r border-slate-line p-3" style="--i: 2">
              <span class="scan" aria-hidden="true" />
              <span class="label block text-stone/55">Contractor</span>
              <span class="value font-semibold text-paper">{{ company.name }}</span>
            </div>
            <div class="cell p-3" style="--i: 3">
              <span class="scan" aria-hidden="true" />
              <span class="label block text-stone/55">License</span>
              <span class="value font-semibold text-paper">#{{ company.license.number }}</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.word { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.06em; margin-bottom: -0.06em; }
.word-in { display: inline-block; }

@media (prefers-reduced-motion: no-preference) {
  /* Page-load sequence: eyebrow, headline word by word, then copy and actions */
  .word-in {
    transform: translateY(105%);
    animation: word-up 0.9s cubic-bezier(.2, .8, .2, 1) var(--d, 0ms) forwards;
  }
  .intro-item {
    opacity: 0;
    transform: translateY(14px);
    animation: intro-in 0.8s cubic-bezier(.2, .7, .2, 1) var(--d, 0ms) forwards;
  }
}
@keyframes word-up { to { transform: none; } }
@keyframes intro-in { to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: no-preference) {
  /* Frame placed first, empty; cells "plotted" in one by one after. */
  .title-block { opacity: 0; }
  .title-block.in-view { animation: frame-in 0.3s ease-out var(--cap-base, 0s) forwards; }

  .cell { position: relative; overflow: hidden; }
  .cell .label,
  .cell .value {
    display: block;
    opacity: 0;
    transform: translateY(5px);
  }
  .cell .scan {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgb(184 137 87 / 0.4), transparent);
    transform: translateX(-100%);
  }

  .title-block.in-view .cell .scan {
    animation: sweep 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: calc(var(--cap-base, 0s) + var(--i) * 0.14s);
  }
  .title-block.in-view .cell .label {
    animation: cell-in 0.4s ease-out forwards;
    animation-delay: calc(var(--cap-base, 0s) + var(--i) * 0.14s + 0.18s);
  }
  .title-block.in-view .cell .value {
    animation: cell-in 0.4s ease-out forwards;
    animation-delay: calc(var(--cap-base, 0s) + var(--i) * 0.14s + 0.26s);
  }
}
@keyframes frame-in { to { opacity: 1; } }
@keyframes sweep { to { transform: translateX(100%); } }
@keyframes cell-in { to { opacity: 1; transform: none; } }

/*
 * Trust-detail row: subdivided like the dimension line above it, instead of
 * three text blocks floating in whitespace. Each item after the first gets a
 * hairline + a short bronze tick where the "measurement" continues.
 */
.spec-item {
  position: relative;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}
.spec-item:first-child { padding-top: 0; }
.spec-item + .spec-item {
  border-top: 1px solid rgb(232 229 223 / 0.12);
}
.spec-item + .spec-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: -1px;
  width: 0.625rem;
  height: 1px;
  background: #b98a4b;
}
@media (min-width: 640px) {
  .spec-item {
    padding: 0 1.25rem;
  }
  .spec-item:first-child { padding-left: 0; }
  .spec-item + .spec-item {
    border-top: 0;
    border-left: 1px solid rgb(232 229 223 / 0.12);
  }
  .spec-item + .spec-item::before {
    left: -1px;
    top: 0;
    width: 1px;
    height: 0.625rem;
  }
}
</style>
