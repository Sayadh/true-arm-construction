<script setup lang="ts">
import { company } from '~/data/company'
import { estimatePath } from '~/data/navigation'

/**
 * The title block "stamps in" after the house elevation finishes drawing
 * (or quickly, if a real hero photo is shown instead) rather than appearing
 * with the rest of the hero — it reads as the drawing being signed off.
 * Gated behind IntersectionObserver so it never fires off-screen on mobile.
 */
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
</style>
