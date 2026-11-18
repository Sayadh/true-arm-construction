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
    Decorative illustration (used until a real hero photo is supplied), painting-first:
    1. the house elevation draws on (foundation -> frame -> roof -> openings),
    2. a paint roller makes vertical passes, revealing the wall color strip by strip
       (main body, then the wing in an accent color), windows stay glass,
    3. the roof is brushed on, the door gets its color (panels, brass knob, porch light),
       and the color swatches + caption settle in.
    Starts only when scrolled into view. Reduced motion: the finished, painted state, no roller.
    Pass/roller timings are generated so each strip grows exactly under the roller.
  -->
  <svg
    ref="svgEl"
    viewBox="0 96 480 400"
    class="elevation h-auto w-full"
    :class="{ 'in-view': inView }"
    role="img"
    aria-label="Illustration of a house being painted with a paint roller"
  >
    <defs>
      <clipPath id="hero-paint-main"><path d="M75 420 V228 H325 V420 Z" /></clipPath>
      <clipPath id="hero-paint-gable"><path d="M75 228 L200 132 L325 228 Z" /></clipPath>
      <clipPath id="hero-paint-wing"><path d="M325 420 V318 H432 V420 Z" /></clipPath>
    </defs>

    <!-- paint: one strip per roller pass -->
    <g class="paint">
      <g clip-path="url(#hero-paint-main)" fill="#EBDDC3">
        <rect class="pass" style="--d: 1.55s" x="73.25" y="176" width="66" height="244" />
        <rect class="pass" style="--d: 2.06s" x="135.75" y="128" width="66" height="292" />
        <rect class="pass" style="--d: 2.57s" x="198.25" y="128" width="66" height="292" />
        <rect class="pass" style="--d: 3.08s" x="260.75" y="176" width="66" height="244" />
      </g>
      <!-- gable: same roller passes, its own color -->
      <g clip-path="url(#hero-paint-gable)" fill="#D9AE62">
        <rect class="pass" style="--d: 1.55s" x="73.25" y="176" width="66" height="244" />
        <rect class="pass" style="--d: 2.06s" x="135.75" y="128" width="66" height="292" />
        <rect class="pass" style="--d: 2.57s" x="198.25" y="128" width="66" height="292" />
        <rect class="pass" style="--d: 3.08s" x="260.75" y="176" width="66" height="244" />
      </g>
      <g clip-path="url(#hero-paint-wing)" fill="#7FA38C">
        <rect class="pass" style="--d: 3.59s" x="323.0" y="306" width="58" height="114" />
        <rect class="pass" style="--d: 4.10s" x="377.0" y="306" width="58" height="114" />
      </g>
    </g>

    <!-- glass stays unpainted; the door gets the accent at the end -->
    <g fill="#0C1B33">
      <rect x="108" y="262" width="58" height="70" />
      <rect x="234" y="262" width="58" height="70" />
      <rect x="100" y="352" width="92" height="56" />
      <rect x="236" y="342" width="48" height="78" />
      <rect x="352" y="344" width="54" height="40" />
      <circle cx="200" cy="190" r="14" />
    </g>
    <!-- roof: brushed on left to right after the walls -->
    <g class="roof" fill="#B4513A">
      <path d="M50 244 L200 112 L350 244 L325 228 L200 132 L75 228 Z" />
      <path d="M314 322 L444 299 L444 309 L325 327 Z" />
    </g>

    <!-- front door: color, raised panels, brass knob, porch light -->
    <g class="door">
      <rect x="236" y="342" width="48" height="78" fill="#1F6461" />
      <g fill="none" stroke="#F7F5F0" stroke-opacity=".38" stroke-width="1">
        <rect x="243" y="350" width="34" height="26" rx="1" />
        <rect x="243" y="383" width="34" height="30" rx="1" />
      </g>
      <circle cx="277" cy="380" r="2.6" fill="#E2B04A" />
      <circle class="glow" cx="297" cy="350" r="9" fill="#E2B04A" fill-opacity=".22" />
      <circle cx="297" cy="350" r="3.2" fill="#E2B04A" />
    </g>

    <g fill="none" stroke="#EDE8E0" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
      <!-- ground -->
      <path class="ln seq-0" pathLength="1" d="M20 420 H460" stroke-opacity=".55" />
      <!-- main volume -->
      <path class="ln seq-1" pathLength="1" d="M75 420 V228 H325 V420" />
      <!-- gable roof -->
      <path class="ln seq-2" pathLength="1" d="M50 244 L200 112 L350 244" />
      <path class="ln seq-2" pathLength="1" d="M75 228 L200 132 L325 228" stroke-opacity=".35" />
      <!-- wing -->
      <path class="ln seq-3" pathLength="1" d="M325 420 V318 H432 V420" />
      <path class="ln seq-3" pathLength="1" d="M314 322 L444 299" />
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
      <!-- wing cladding lines + window -->
      <path class="ln seq-6b" pathLength="1" d="M325 336 H432 M325 352 H432 M325 368 H432 M325 384 H432 M325 400 H432" stroke-opacity=".3" />
      <rect class="ln seq-6" pathLength="1" x="352" y="344" width="54" height="40" />
    </g>

    <!-- color swatches, like chips from a fan deck -->
    <g class="swatches" font-family="inherit" font-size="10" font-weight="700">
      <g class="chip" style="--c: 0">
        <rect x="75.0" y="436" width="54" height="22" rx="3" fill="#EBDDC3" />
        <text x="83.0" y="451" fill="#13294B">Walls</text>
      </g>
      <g class="chip" style="--c: 1">
        <rect x="134.6" y="436" width="54" height="22" rx="3" fill="#D9AE62" />
        <text x="142.6" y="451" fill="#13294B">Gable</text>
      </g>
      <g class="chip" style="--c: 2">
        <rect x="194.2" y="436" width="54" height="22" rx="3" fill="#B4513A" />
        <text x="202.2" y="451" fill="#F7F5F0">Roof</text>
      </g>
      <g class="chip" style="--c: 3">
        <rect x="253.8" y="436" width="54" height="22" rx="3" fill="#7FA38C" />
        <text x="261.8" y="451" fill="#13294B">Annex</text>
      </g>
      <g class="chip" style="--c: 4">
        <rect x="313.4" y="436" width="54" height="22" rx="3" fill="#1F6461" />
        <text x="321.4" y="451" fill="#F7F5F0">Door</text>
      </g>
      <g class="chip" style="--c: 5">
        <rect x="373.0" y="436" width="54" height="22" rx="3" fill="#EDE8E0" />
        <text x="381.0" y="451" fill="#13294B">Trim</text>
      </g>
    </g>
    <text x="253" y="486" text-anchor="middle" class="lbl" fill="#F0907A" font-family="inherit" font-size="12" font-weight="600">Prepared, painted, clean lines</text>

    <!-- the roller: origin = the wet edge of the paint (decorative, hidden when motion is reduced) -->
    <g class="roller" aria-hidden="true">
      <path d="M31 -3 H38 V-24 H0 V-36" fill="none" stroke="#EDE8E0" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />
      <rect x="-4.5" y="-64" width="9" height="30" rx="4.5" fill="#C63D2C" />
      <rect class="nap" x="-32" y="-9" width="64" height="13" rx="6.5" />
      <path d="M-24 -6 V1 M-12 -6 V1 M0 -6 V1 M12 -6 V1 M24 -6 V1" stroke="#13294B" stroke-opacity=".18" stroke-width="1" />
    </g>
  </svg>
</template>

<style scoped>
.roller { opacity: 0; }
.nap { fill: #EBDDC3; }

@media (prefers-reduced-motion: no-preference) {
  /* Pre-draw state: held until .in-view is added by the observer. */
  .elevation .ln { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .elevation .fd,
  .elevation .lbl,
  .elevation .door { opacity: 0; }
  .elevation .roof { transform-box: fill-box; transform-origin: 0 50%; transform: scaleX(0); }
  .elevation .pass { transform-box: fill-box; transform-origin: 50% 0; transform: scaleY(0); }
  .elevation .chip { opacity: 0; transform: translateY(8px); }

  .elevation.in-view .ln { animation: draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .elevation.in-view .fd { animation: fade 0.35s ease-out forwards; }

  /* Line drawing in build order; delays overlap so it flows. */
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

  /* Painting: each strip grows at the roller's speed (linear, same 0.42s as a roller pass). */
  .elevation.in-view .pass { animation: paint 0.42s linear var(--d) forwards; }
  .elevation.in-view .roller {
    animation: roll 3.06s linear 1.55s both;
  }
  .elevation.in-view .nap { animation: nap-color 3.06s step-end 1.55s both; }
  .elevation.in-view .roof { animation: brush 0.7s cubic-bezier(0.65, 0, 0.35, 1) 4.5s forwards; }
  .elevation.in-view .door { animation: fade 0.5s ease-out 5.05s forwards; }
  .elevation.in-view .glow { animation: glow 2.8s ease-in-out 5.6s infinite; }
  .elevation.in-view .chip {
    animation: chip-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    animation-delay: calc(5.2s + var(--c) * 0.08s);
  }
  .elevation.in-view .lbl { animation: fade 0.6s ease-out 5.75s forwards; }
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fade { to { opacity: 1; } }
@keyframes paint { to { transform: scaleY(1); } }
@keyframes chip-in { to { opacity: 1; transform: none; } }
@keyframes brush { to { transform: scaleX(1); } }
@keyframes glow { 0%, 100% { fill-opacity: 0.22; } 50% { fill-opacity: 0.45; } }
/* The roller carries the wall color, then the accent for the wing passes. */
@keyframes nap-color { 0% { fill: #EBDDC3; } 65% { fill: #7FA38C; } }
@keyframes roll {
  0.00% { transform: translate(106.25px, 152px); opacity: 0; }
  1.96% { transform: translate(106.25px, 176px); opacity: 1; }
  13.73% { transform: translate(106.25px, 420px); opacity: 1; }
  16.67% { transform: translate(168.75px, 128px); opacity: 1; }
  30.39% { transform: translate(168.75px, 420px); opacity: 1; }
  33.33% { transform: translate(231.25px, 128px); opacity: 1; }
  47.06% { transform: translate(231.25px, 420px); opacity: 1; }
  50.00% { transform: translate(293.75px, 176px); opacity: 1; }
  63.73% { transform: translate(293.75px, 420px); opacity: 1; }
  66.67% { transform: translate(352px, 306px); opacity: 1; }
  80.39% { transform: translate(352px, 420px); opacity: 1; }
  83.33% { transform: translate(406px, 306px); opacity: 1; }
  97.06% { transform: translate(406px, 420px); opacity: 1; }
  100.00% { transform: translate(424px, 390px); opacity: 0; }
}</style>
