<script setup lang="ts">
import type { ServiceScopeItem } from '~/types'

/**
 * Room addition drawn in stages as the visitor scrolls the steps
 * (site review -> plans -> permits -> frame -> roof -> finish). Layout and scroll
 * tracking live in ScrollSteps; this file is only the drawing.
 */
defineProps<{ steps: ServiceScopeItem[] }>()

const studs = Array.from({ length: 10 }, (_, i) => 288 + i * 16)
const siding = [204, 218, 232, 246, 260, 274]
</script>

<template>
  <ScrollSteps v-slot="{ shown }" :steps="steps">
        <svg viewBox="0 0 520 330" class="block h-auto max-h-[34vh] w-full sm:max-h-none" role="img" aria-label="Illustration of a room addition being built next to an existing house">
          <!-- blueprint grid over the addition area (plans) -->
          <g class="stage" :class="{ on: shown(1) && !shown(4) }" stroke="#F0907A" stroke-opacity=".14" stroke-width="1">
            <path v-for="x in [280, 300, 320, 340, 360, 380, 400, 420, 440, 460]" :key="`gx${x}`" :d="`M${x} 130 V290`" />
            <path v-for="y in [130, 150, 170, 190, 210, 230, 250, 270]" :key="`gy${y}`" :d="`M272 ${y} H468`" />
          </g>

          <!-- existing house (always there) -->
          <g fill="none" stroke="#EDE8E0" stroke-opacity=".55" stroke-width="1.6" stroke-linejoin="round">
            <path d="M48 290 V150 H280 V290" />
            <path d="M34 160 L164 70 L294 160" />
            <rect x="78" y="186" width="54" height="48" />
            <path d="M105 186 V234" stroke-opacity=".5" />
            <rect x="182" y="210" width="44" height="80" />
            <circle cx="164" cy="122" r="11" stroke-opacity=".6" />
          </g>
          <text x="164" y="315" text-anchor="middle" class="label">Existing home</text>

          <!-- ground -->
          <path d="M14 290 H506" stroke="#EDE8E0" stroke-opacity=".4" stroke-width="1.4" />

          <!-- 0. site review: stakes, string line, footprint (cleared once the walls are closed in) -->
          <g class="stage" :class="{ on: shown(0) && !shown(4) }">
            <path d="M288 290 H440" stroke="#F0907A" stroke-width="2" stroke-dasharray="6 5" fill="none" />
            <g stroke="#F0907A" stroke-width="2" fill="#F0907A">
              <path d="M288 290 V270" /><path d="M288 270 l10 4 -10 4z" />
              <path d="M440 290 V270" /><path d="M440 270 l10 4 -10 4z" />
            </g>
            <g stroke="#EDE8E0" stroke-opacity=".6" stroke-width="1" fill="none">
              <path d="M288 304 H440 M288 299 V309 M440 299 V309" />
            </g>
          </g>

          <!-- 1. plans: dashed outline of the addition -->
          <g class="stage" :class="{ on: shown(1) && !shown(3) }" fill="none" stroke="#F0907A" stroke-width="1.6" stroke-dasharray="5 5">
            <path d="M288 290 V196 H440 V290" />
            <path d="M278 202 L364 154 L450 202" />
          </g>

          <!-- 2. permits: approved document -->
          <g class="stage pop" :class="{ on: shown(2) && !shown(5) }">
            <rect x="404" y="28" width="74" height="92" rx="4" fill="#F8F6F2" />
            <path d="M416 48 H466 M416 60 H466 M416 72 H452 M416 84 H460" stroke="#ABA497" stroke-width="2" />
            <circle cx="458" cy="104" r="15" fill="#C63D2C" />
            <path d="M451 104 l5 5 9 -10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </g>

          <!-- 3. foundation and framing -->
          <g class="stage" :class="{ on: shown(3) }">
            <rect x="284" y="284" width="160" height="10" fill="#ABA497" />
            <g class="studs" :class="{ faint: shown(4) }" stroke="#D9B38C" stroke-width="3">
              <path v-for="(x, i) in studs" :key="x" class="rise" :style="{ transitionDelay: `${i * 45}ms` }" :d="`M${x} 284 V198`" />
              <path class="draw" pathLength="1" d="M286 196 H442" />
              <path class="draw" pathLength="1" d="M286 238 H442" stroke-width="2" stroke-opacity=".6" />
            </g>
          </g>

          <!-- 4. roof and exterior tie-in -->
          <g class="stage" :class="{ on: shown(4) }">
            <path d="M290 288 V198 H438 V288 Z" fill="#13294B" />
            <g stroke="#EDE8E0" stroke-opacity=".16" stroke-width="1">
              <path v-for="y in siding" :key="y" :d="`M290 ${y} H438`" />
            </g>
            <path class="draw" pathLength="1" d="M280 204 L364 156 L448 204" fill="none" stroke="#EDE8E0" stroke-width="2.4" stroke-linejoin="round" />
            <path d="M290 288 V198 H438 V288" fill="none" stroke="#EDE8E0" stroke-width="1.8" />
          </g>

          <!-- 5. interior finishes: window, door, warm light -->
          <g class="stage" :class="{ on: shown(5) }">
            <rect x="314" y="214" width="66" height="50" fill="#F0907A" class="glow" />
            <rect x="314" y="214" width="66" height="50" fill="none" stroke="#EDE8E0" stroke-width="1.8" />
            <path d="M347 214 V264 M314 239 H380" stroke="#EDE8E0" stroke-width="1.2" />
            <rect x="396" y="226" width="28" height="62" fill="#0C1B33" stroke="#EDE8E0" stroke-width="1.6" />
            <circle cx="419" cy="258" r="1.8" fill="#EDE8E0" />
            <g transform="translate(364 112)">
              <circle r="15" fill="#C63D2C" />
              <path d="M-7 0 l5 5 9 -10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </g>
          <text x="364" y="315" text-anchor="middle" class="label accent stage" :class="{ on: shown(0) }">New addition</text>
        </svg>
  </ScrollSteps>
</template>

<style scoped>
.label { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; fill: #ABA497; }
.label.accent { fill: #F0907A; }

.stage { opacity: 0; transition: opacity 0.6s ease; }
.stage.on { opacity: 1; }
.stage.pop { transform-box: fill-box; transform-origin: center; transform: translateY(10px) scale(0.92); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1.2); }
.stage.pop.on { transform: none; }

.draw { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 0.9s ease 0.15s; }
.on .draw, .on.draw { stroke-dashoffset: 0; }

.rise { transform-box: fill-box; transform-origin: bottom; transform: scaleY(0); transition: transform 0.5s ease; }
.on .rise { transform: scaleY(1); }
.studs { transition: opacity 0.6s ease; }
.studs.faint { opacity: 0.18; }

.glow { opacity: 0.2; transition: opacity 1s ease 0.4s; }
.on .glow { opacity: 0.85; }

@media (prefers-reduced-motion: reduce) {
  .stage, .stage.pop, .draw, .rise, .glow, .studs { transition: none; }
}
</style>
