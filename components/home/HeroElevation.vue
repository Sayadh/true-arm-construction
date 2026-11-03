<script setup lang="ts">
/**
 * The draw-on only plays once this card actually scrolls into view, not on
 * page load — on mobile in particular the hero stacks text above image, so
 * firing on mount would burn the animation before anyone sees it.
 */
const svgEl = ref<SVGSVGElement | null>(null)
const inView = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !svgEl.value) {
    inView.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        observer?.disconnect()
      }
    },
    // fire a little before the card is fully in frame so it's never caught mid-scroll
    { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
  )
  observer.observe(svgEl.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <!--
    Decorative architectural elevation drawing used until a real hero photo is supplied.
    Lines "draw" once this element scrolls into view, roughly in build order
    (foundation -> frame -> roof -> openings -> wing -> dimensions -> label).
    Disabled for reduced motion. pathLength="1" normalizes every shape's dash
    animation to the same 0-1 scale, regardless of its actual length, so the
    draw-on speed looks consistent across both long walls and short mullions.
  -->
  <svg
    ref="svgEl"
    viewBox="0 96 480 400"
    class="elevation h-auto w-full"
    :class="{ 'in-view': inView }"
    role="img"
    aria-label="Line drawing of a house elevation"
  >
    <g fill="none" stroke="#E8E5DF" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
      <!-- ground -->
      <path class="ln seq-0" pathLength="1" d="M20 420 H460" stroke-opacity=".55" />
      <!-- main volume -->
      <path class="ln seq-1" pathLength="1" d="M75 420 V228 H325 V420" />
      <!-- gable roof -->
      <path class="ln seq-2" pathLength="1" d="M58 238 L200 120 L342 238" />
      <path class="ln seq-2" pathLength="1" d="M75 228 L200 132 L325 228" stroke-opacity=".35" />
      <!-- wing -->
      <path class="ln seq-3" pathLength="1" d="M325 420 V318 H432 V420" />
      <path class="ln seq-3" pathLength="1" d="M318 320 L442 300" />
      <!-- gable window -->
      <circle class="ln seq-4" pathLength="1" cx="200" cy="190" r="14" stroke-opacity=".7" />
      <!-- upper windows -->
      <rect class="ln seq-5" pathLength="1" x="108" y="262" width="58" height="70" />
      <path class="ln seq-5b" pathLength="1" d="M137 262 V332 M108 297 H166" stroke-opacity=".45" />
      <rect class="ln seq-5" pathLength="1" x="234" y="262" width="58" height="70" />
      <path class="ln seq-5b" pathLength="1" d="M263 262 V332 M234 297 H292" stroke-opacity=".45" />
      <!-- lower: window + door -->
      <rect class="ln seq-6" pathLength="1" x="100" y="352" width="92" height="56" />
      <path class="ln seq-6b" pathLength="1" d="M146 352 V408" stroke-opacity=".45" />
      <rect class="ln seq-6" pathLength="1" x="236" y="342" width="48" height="78" />
      <path class="fd seq-7" d="M274 384 h0.1" stroke-width="3" />
      <!-- floor line -->
      <path class="ln seq-6b" pathLength="1" d="M75 345 H100 M192 345 H236 M284 345 H325" stroke-opacity=".25" stroke-dasharray="3 5" />
      <!-- wing cladding lines + window -->
      <path class="ln seq-6b" pathLength="1" d="M325 336 H432 M325 352 H432 M325 368 H432 M325 384 H432 M325 400 H432" stroke-opacity=".18" />
      <rect class="fd seq-7" x="352" y="344" width="54" height="40" fill="#142821" />
    </g>

    <!-- dimension lines -->
    <g stroke="#B98A4B" stroke-width="1" fill="none">
      <path class="ln seq-8" pathLength="1" d="M75 455 H432 M75 447 V463 M432 447 V463 M325 451 V459" />
      <path class="ln seq-8" pathLength="1" d="M462 120 V420 M454 120 H470 M454 420 H470 M456 228 H468" />
      <path class="ln seq-8" pathLength="1" d="M30 228 V420 M22 228 H38 M22 420 H38" stroke-opacity=".6" />
    </g>
    <g fill="#D9B27A" font-family="inherit" font-size="12" font-weight="600">
      <text x="196" y="478" text-anchor="middle" class="lbl">Built around your vision</text>
    </g>
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  /* Pre-draw state: held until .in-view is added by the observer. */
  .elevation .ln {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }
  .elevation .fd,
  .elevation .lbl {
    opacity: 0;
  }

  .elevation.in-view .ln {
    animation: draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .elevation.in-view .fd {
    animation: fade 0.35s ease-out forwards;
  }

  /* Build order: foundation, frame, roof, wing, openings, dimensions, label.
     Delays overlap slightly so the drawing flows rather than ticking element by element. */
  .elevation.in-view .seq-0 { animation-delay: 0s; }
  .elevation.in-view .seq-1 { animation-delay: 0.12s; }
  .elevation.in-view .seq-2 { animation-delay: 0.42s; }
  .elevation.in-view .seq-3 { animation-delay: 0.68s; }
  .elevation.in-view .seq-4 { animation-delay: 0.92s; }
  .elevation.in-view .seq-5 { animation-delay: 1.0s; }
  .elevation.in-view .seq-5b { animation-delay: 1.22s; animation-duration: 0.5s; }
  .elevation.in-view .seq-6 { animation-delay: 1.32s; }
  .elevation.in-view .seq-6b { animation-delay: 1.56s; animation-duration: 0.5s; }
  .elevation.in-view .seq-7 { animation-delay: 1.78s; }
  .elevation.in-view .seq-8 { animation-delay: 1.95s; animation-duration: 0.6s; }
  .elevation.in-view .lbl { animation: fade 0.6s ease-out 2.45s forwards; }
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fade { to { opacity: 1; } }
</style>
