<script setup lang="ts">
import type { ServiceScopeItem } from '~/types'

/**
 * Cross-section of a concrete slab that gets prepared and coated as the visitor
 * scrolls the steps: check -> clean -> open the surface -> repair -> base coat
 * and flakes -> topcoat. Layout and scroll tracking live in ScrollSteps.
 */
defineProps<{ steps: ServiceScopeItem[] }>()

// deterministic "random" so server and client render the same markup
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}
const r1 = seeded(11)
const aggregate = Array.from({ length: 70 }, () => ({ x: 34 + r1() * 452, y: 198 + r1() * 58, r: 1 + r1() * 2.6 }))
const r2 = seeded(29)
const flakeColors = ['#F8F6F2', '#ABA497', '#9FB0C8', '#0C1B33', '#F0907A']
const flakes = Array.from({ length: 46 }, (_, i) => ({
  x: 36 + r2() * 446,
  y: 178 + r2() * 8,
  w: 3 + r2() * 4,
  rot: Math.round(r2() * 90),
  fill: flakeColors[i % flakeColors.length],
  delay: Math.round(r2() * 700)
}))
// jagged profile after mechanical prep
const profile = 'M30 190 ' + Array.from({ length: 46 }, (_, i) => `L${40 + i * 10} ${i % 2 ? 187 : 191}`).join(' ') + ' L490 190'
</script>

<template>
  <ScrollSteps v-slot="{ shown }" :steps="steps">
    <svg viewBox="0 90 520 220" class="block h-auto max-h-[34vh] w-full sm:max-h-none" role="img" aria-label="Cross-section of a concrete floor being prepared and coated with epoxy">
      <!-- soil -->
      <defs>
        <pattern id="ep-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V10" stroke="#9FB0C8" stroke-opacity=".25" stroke-width="1.5" />
        </pattern>
        <linearGradient id="ep-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity="0" /><stop offset=".5" stop-color="#fff" stop-opacity=".7" /><stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <clipPath id="ep-top"><rect x="30" y="166" width="460" height="12" /></clipPath>
      </defs>
      <rect x="30" y="262" width="460" height="38" fill="url(#ep-hatch)" />

      <!-- slab -->
      <rect x="30" y="190" width="460" height="72" fill="#5D6370" />
      <circle v-for="(a, i) in aggregate" :key="i" :cx="a.x" :cy="a.y" :r="a.r" fill="#ABA497" fill-opacity=".35" />
      <text x="46" y="248" class="tag">CONCRETE SLAB</text>

      <!-- crack, then repair -->
      <path d="M262 190 l-6 12 l9 10 l-7 13 l6 12" fill="none" stroke="#0C1B33" stroke-width="3.5" stroke-linejoin="round" />
      <path class="stage" :class="{ on: shown(3) }" d="M262 190 l-6 12 l9 10 l-7 13 l6 12" fill="none" stroke="#ABA497" stroke-width="5" stroke-linejoin="round" />

      <!-- surface: smooth, then opened -->
      <path class="stage" :class="{ on: !shown(2) }" d="M30 190 H490" stroke="#ABA497" stroke-width="2" />
      <path class="stage" :class="{ on: shown(2) }" :d="profile" fill="none" stroke="#ABA497" stroke-width="2" />

      <!-- 0. check: moisture + magnifier -->
      <g class="stage" :class="{ on: shown(0) && !shown(1) }">
        <g class="drops" fill="#9FB0C8">
          <circle cx="360" cy="214" r="3" /><circle cx="380" cy="230" r="2.5" /><circle cx="400" cy="210" r="3" />
        </g>
        <circle cx="262" cy="200" r="34" fill="none" stroke="#F0907A" stroke-width="2.5" />
        <path d="M286 224 L310 248" stroke="#F0907A" stroke-width="5" stroke-linecap="round" />
      </g>

      <!-- oil stain and failing coating, removed in step 1 -->
      <g class="stage" :class="{ on: !shown(1) }">
        <path d="M80 190 Q100 182 130 186 T180 188 L180 190 Z" fill="#0C1B33" fill-opacity=".8" />
        <text x="104" y="176" class="tag dim">OIL</text>
        <path d="M330 190 H372 M384 190 H430" stroke="#9FB0C8" stroke-width="4" />
        <path d="M372 190 q8 -2 10 -12" fill="none" stroke="#9FB0C8" stroke-width="4" stroke-linecap="round" />
        <text x="356" y="170" class="tag dim">OLD COATING</text>
      </g>

      <!-- 2. grinder pass -->
      <g class="stage" :class="{ on: shown(2) && !shown(3) }">
        <g class="grinder">
          <rect x="-20" y="168" width="40" height="18" rx="3" fill="#F8F6F2" />
          <path d="M0 168 V136 H18" fill="none" stroke="#F8F6F2" stroke-width="3" />
        </g>
      </g>

      <!-- 4. base coat and flakes -->
      <g class="stage" :class="{ on: shown(4) }">
        <rect class="coat" x="30" y="176" width="460" height="14" fill="#3B5683" />
        <rect
          v-for="(f, i) in flakes"
          :key="i"
          class="flake"
          :x="f.x"
          :y="f.y"
          :width="f.w"
          :height="f.w * 0.5"
          :fill="f.fill"
          :transform="`rotate(${f.rot} ${f.x} ${f.y})`"
          :style="{ transitionDelay: `${f.delay}ms` }"
        />
      </g>

      <!-- 5. topcoat + shine -->
      <g class="stage" :class="{ on: shown(5) }">
        <rect x="30" y="170" width="460" height="6" fill="#EDE8E0" fill-opacity=".35" />
        <g clip-path="url(#ep-top)"><rect class="shine" x="-120" y="166" width="120" height="12" fill="url(#ep-shine)" /></g>
        <g transform="translate(470 120)">
          <circle r="15" fill="#C63D2C" />
          <path d="M-7 0 l5 5 9 -10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>

      <!-- layer labels -->
      <g class="labels">
        <text x="490" y="160" text-anchor="end" class="tag accent stage" :class="{ on: shown(5) }">TOPCOAT</text>
        <text x="30" y="160" class="tag accent stage" :class="{ on: shown(4) && !shown(5) }">BASE COAT + FLAKES</text>
      </g>
    </svg>
  </ScrollSteps>
</template>

<style scoped>
.tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; fill: #ABA497; }
.tag.dim { fill: #9FB0C8; }
.tag.accent { fill: #F0907A; }

.stage { opacity: 0; transition: opacity 0.6s ease; }
.stage.on { opacity: 1; }

.drops circle { animation: rise 1.8s ease-in infinite; }
.drops circle:nth-child(2) { animation-delay: 0.5s; }
.drops circle:nth-child(3) { animation-delay: 1s; }
@keyframes rise { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-34px); opacity: 0; } }

.grinder { animation: sweep 2.6s ease-in-out infinite alternate; }
@keyframes sweep { from { transform: translateX(50px); } to { transform: translateX(470px); } }

.coat { transform-box: fill-box; transform-origin: left; transform: scaleX(0); transition: transform 1s ease; }
.on .coat { transform: scaleX(1); }
.flake { opacity: 0; translate: 0 -60px; transition: translate 0.6s cubic-bezier(0.3, 0.7, 0.4, 1), opacity 0.3s ease; }
.on .flake { opacity: 0.9; translate: 0 0; }

.shine { animation: shine 2.4s ease-in-out infinite; }
@keyframes shine { from { transform: translateX(0); } to { transform: translateX(640px); } }

@media (prefers-reduced-motion: reduce) {
  .stage, .coat, .flake { transition: none; }
  .drops circle, .grinder, .shine { animation: none; }
  .grinder { transform: translateX(260px); }
}
</style>
