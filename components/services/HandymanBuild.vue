<script setup lang="ts">
import type { ServiceScopeItem } from '~/types'

/**
 * A room with a handful of small problems that get listed, photographed, estimated,
 * fixed in one visit and checked off as the visitor scrolls the steps.
 * Layout and scroll tracking live in ScrollSteps; this file is only the drawing.
 */
defineProps<{ steps: ServiceScopeItem[] }>()

const marks = [
  { n: 1, x: 120, y: 168 },
  { n: 2, x: 270, y: 112 },
  { n: 3, x: 240, y: 196 },
  { n: 4, x: 324, y: 84 },
  { n: 5, x: 482, y: 236 },
  { n: 6, x: 196, y: 256 }
]
// viewfinder hops across the items during "Add photos"
const shots = marks.map((m, i) => ({ ...m, delay: i * 0.45 }))
</script>

<template>
  <ScrollSteps v-slot="{ shown }" :steps="steps">
    <svg viewBox="0 0 520 330" class="block h-auto max-h-[34vh] w-full sm:max-h-none" role="img" aria-label="Illustration of a room with small repairs being listed, fixed, and checked off">
      <defs>
        <pattern id="hm-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V10" stroke="#9FB0C8" stroke-opacity=".22" stroke-width="1.5" />
        </pattern>
        <radialGradient id="hm-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#F0907A" stop-opacity=".55" /><stop offset="1" stop-color="#F0907A" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- room shell -->
      <g fill="none" stroke="#EDE8E0" stroke-opacity=".5" stroke-width="1.6">
        <path d="M20 40 H500 M20 280 H500" />
        <rect x="360" y="98" width="110" height="88" /><path d="M415 98 V186 M360 142 H470" stroke-opacity=".4" /><path d="M354 192 H476" stroke-width="3" />
      </g>
      <rect x="20" y="280" width="480" height="24" fill="url(#hm-hatch)" />

      <!-- 4. ceiling stain: the "bigger problem" -->
      <g>
        <ellipse cx="430" cy="50" rx="26" ry="8" fill="#B49A7A" fill-opacity=".35" />
        <g class="stage pop" :class="{ on: shown(4) && !shown(5) }">
          <ellipse cx="430" cy="52" rx="40" ry="18" fill="none" stroke="#F0B37A" stroke-width="2" stroke-dasharray="5 4" />
          <circle cx="470" cy="70" r="11" fill="#F0B37A" /><text x="470" y="75" text-anchor="middle" class="bang">!</text>
          <rect x="350" y="80" width="112" height="22" rx="11" fill="#F8F6F2" />
          <text x="406" y="95" text-anchor="middle" class="note">Options first</text>
        </g>
      </g>

      <!-- door: hangs crooked until fixed -->
      <g class="fix door" :class="{ ok: shown(3) }">
        <rect x="40" y="140" width="72" height="140" fill="#13294B" stroke="#EDE8E0" stroke-width="1.6" />
        <circle cx="102" cy="212" r="3" fill="#EDE8E0" />
      </g>
      <path d="M38 138 H114 V280" fill="none" stroke="#EDE8E0" stroke-opacity=".5" stroke-width="1.6" />

      <!-- shelf: tilted until fixed -->
      <g class="fix shelf" :class="{ ok: shown(3) }">
        <path d="M150 120 H262" stroke="#F8F6F2" stroke-width="4" stroke-linecap="round" />
        <g fill="#9FB0C8" fill-opacity=".75"><rect x="160" y="90" width="9" height="30" /><rect x="171" y="96" width="8" height="24" /><rect x="181" y="86" width="10" height="34" /></g>
        <rect x="222" y="102" width="26" height="18" rx="2" fill="#F0907A" fill-opacity=".6" />
      </g>

      <!-- drywall hole, then patch -->
      <path d="M206 192 l8 -6 l7 5 l6 -3 l3 9 l-5 8 l-9 2 l-8 -4 z" fill="#0C1B33" stroke="#9FB0C8" stroke-opacity=".5" />
      <rect class="patch" :class="{ ok: shown(3) }" x="198" y="180" width="38" height="34" fill="#0C1B33" stroke="#9FB0C8" stroke-opacity=".25" stroke-dasharray="3 3" />

      <!-- light: dark until fixed -->
      <path d="M300 40 V64" stroke="#EDE8E0" stroke-opacity=".6" stroke-width="1.6" />
      <path d="M286 64 H314 L308 74 H292 Z" fill="none" stroke="#EDE8E0" stroke-width="1.6" />
      <g class="glow" :class="{ ok: shown(3) }">
        <ellipse cx="300" cy="84" rx="46" ry="20" fill="url(#hm-glow)" />
        <circle cx="300" cy="76" r="5" fill="#F7C9A8" />
      </g>

      <!-- cabinet: one door sags until fixed -->
      <rect x="360" y="216" width="110" height="64" fill="#13294B" stroke="#EDE8E0" stroke-width="1.6" />
      <path d="M415 216 V280" stroke="#EDE8E0" stroke-width="1.6" />
      <g class="fix cab" :class="{ ok: shown(3) }">
        <rect x="418" y="220" width="48" height="56" fill="#1E3A66" stroke="#EDE8E0" stroke-width="1.2" />
        <circle cx="424" cy="248" r="2.5" fill="#EDE8E0" />
      </g>

      <!-- baseboard: one loose piece -->
      <path d="M20 274 H130 M210 274 H360" stroke="#EDE8E0" stroke-opacity=".55" stroke-width="2" />
      <g class="fix trim" :class="{ ok: shown(3) }">
        <rect x="132" y="272" width="76" height="8" fill="#EDE8E0" fill-opacity=".55" />
      </g>

      <!-- 3. toolbox -->
      <g class="stage slide" :class="{ on: shown(3) }">
        <g transform="translate(250 254)">
          <rect width="56" height="26" rx="4" fill="#C63D2C" /><rect y="8" width="56" height="3" fill="#A2301F" />
          <path d="M18 0 V-8 H38 V0" fill="none" stroke="#C63D2C" stroke-width="4" stroke-linejoin="round" />
        </g>
      </g>

      <!-- 1. viewfinder hopping over each item -->
      <g class="stage" :class="{ on: shown(1) && !shown(2) }">
        <g v-for="s in shots" :key="s.n" class="shot" :style="{ animationDelay: `${s.delay}s` }" :transform="`translate(${s.x - 10} ${s.y + 6})`">
          <path d="M-18 -10 V-18 H-10 M10 -18 H18 V-10 M18 10 V18 H10 M-10 18 H-18 V10" fill="none" stroke="#F8F6F2" stroke-width="2.4" />
        </g>
      </g>

      <!-- numbered markers, then check marks -->
      <g v-for="(m, i) in marks" :key="m.n" :transform="`translate(${m.x} ${m.y})`">
        <g class="stage mark" :class="{ on: shown(0) && !shown(5) }" :style="{ transitionDelay: `${i * 90}ms` }">
          <circle r="13" fill="#C63D2C" fill-opacity=".2" class="pulse" />
          <circle r="9" fill="#C63D2C" />
          <text y="3.5" text-anchor="middle" class="num">{{ m.n }}</text>
        </g>
        <g class="stage mark" :class="{ on: shown(5) }" :style="{ transitionDelay: `${i * 90}ms` }">
          <circle r="9" fill="#2F8F5B" />
          <path d="M-4 0 l3 3 5 -6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
      <!-- 2. estimate card -->
      <g class="stage pop" :class="{ on: shown(2) && !shown(3) }">
        <rect x="170" y="70" width="180" height="150" rx="6" fill="#F8F6F2" />
        <text x="188" y="98" class="card-title">ESTIMATE</text>
        <g stroke="#D6D0C6" stroke-width="3">
          <path d="M188 118 H300 M188 136 H320 M188 154 H290 M188 172 H312 M188 190 H280" />
        </g>
        <g fill="#C63D2C"><circle cx="318" cy="194" r="14" /></g>
        <path d="M311 194 l5 5 9 -10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>

    </svg>
  </ScrollSteps>
</template>

<style scoped>
.num { font-size: 10px; font-weight: 800; fill: #fff; }
.bang { font-size: 14px; font-weight: 800; fill: #0C1B33; }
.note { font-size: 10px; font-weight: 700; fill: #13294B; }
.card-title { font-size: 11px; font-weight: 800; letter-spacing: 0.18em; fill: #13294B; }

.stage { opacity: 0; transition: opacity 0.5s ease; }
.stage.on { opacity: 1; }
.stage.pop { transform-box: fill-box; transform-origin: center; transform: scale(0.9); transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.3, 1.2); }
.stage.pop.on { transform: none; }
.stage.slide { transform: translateX(-60px); transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.3, 1); }
.stage.slide.on { transform: none; }
.mark { transform-box: fill-box; transform-origin: center; transform: scale(0.4); transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.3, 1.4); }
.mark.on { transform: none; }
.pulse { transform-box: fill-box; transform-origin: center; animation: pulse 1.8s ease-out infinite; }
@keyframes pulse { from { transform: scale(0.8); opacity: 0.9; } to { transform: scale(1.7); opacity: 0; } }

/* broken -> fixed */
.fix { transform-box: view-box; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1); }
.door { transform-origin: 40px 140px; transform: rotate(3deg); transition-delay: 0s; }
.shelf { transform-origin: 150px 120px; transform: rotate(-7deg); transition-delay: 0.15s; }
.cab { transform-origin: 466px 220px; transform: rotate(5deg); transition-delay: 0.3s; }
.trim { transform-origin: 132px 280px; transform: rotate(-8deg); transition-delay: 0.45s; }
.fix.ok { transform: none; }
.patch { opacity: 0; transition: opacity 0.8s ease 0.6s; }
.patch.ok { opacity: 1; }
.glow { opacity: 0; transition: opacity 0.8s ease 0.75s; }
.glow.ok { opacity: 1; }

.shot { opacity: 0; animation: hop 2.7s steps(1) infinite; }
@keyframes hop { 0% { opacity: 1; } 16.6% { opacity: 0; } 100% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .stage, .stage.pop, .stage.slide, .mark, .fix, .patch, .glow { transition: none; }
  .pulse, .shot { animation: none; }
  .shot { opacity: 1; }
}
</style>
