<script setup lang="ts">
import type { ServiceScopeItem } from '~/types'

/**
 * Wall elevation at an inside corner where the baseboard is redone as the visitor
 * scrolls the steps: measure -> remove old trim -> cope the corner -> install ->
 * shoe molding -> fill, caulk, and paint. Layout and scroll tracking live in ScrollSteps.
 */
defineProps<{ steps: ServiceScopeItem[] }>()

const nails = [70, 140, 210, 280]
const nailsRight = [370, 430]
</script>

<template>
  <ScrollSteps v-slot="{ shown }" :steps="steps">
    <svg viewBox="0 0 520 330" class="block h-auto max-h-[34vh] w-full sm:max-h-none" role="img" aria-label="Illustration of baseboard being installed along a wall and an inside corner">
      <!-- walls -->
      <path d="M330 40 L490 24 V272 L330 262 Z" fill="#0C1B33" fill-opacity=".5" />
      <g fill="none" stroke="#EDE8E0" stroke-opacity=".5" stroke-width="1.6">
        <path d="M30 40 H330 V262 H30" /><path d="M330 40 L490 24 V272" /><path d="M330 262 L490 272" />
        <rect x="90" y="196" width="18" height="28" rx="2" stroke-opacity=".4" />
      </g>
      <!-- floor -->
      <g stroke="#EDE8E0" stroke-opacity=".16" stroke-width="1"><path d="M30 280 H330 L490 292 M30 298 H330 L490 312" fill="none" /></g>

      <!-- 0. measure -->
      <g class="stage" :class="{ on: shown(0) && !shown(3) }">
        <g stroke="#C63D2C" stroke-width="1.6" fill="none"><path d="M30 316 H330 M30 309 V323 M330 309 V323" /></g>
        <g stroke="#F0907A" stroke-width="1.4" stroke-dasharray="4 4" fill="none"><path d="M14 214 V262 M8 214 H20" /></g>
        <text x="180" y="312" text-anchor="middle" class="tag accent">MEASURE</text>
      </g>

      <!-- old trim, removed in step 1 -->
      <g class="old" :class="{ gone: shown(1) }">
        <rect x="30" y="246" width="296" height="16" fill="#8A8F98" />
        <path d="M30 250 H326" stroke="#5D6370" stroke-width="1" />
        <path d="M336 262 L490 271 V256 L336 247 Z" fill="#7C838E" />
        <text x="44" y="240" class="tag dim">OLD TRIM</text>
      </g>

      <!-- 3. new boards slide in -->
      <g class="stage" :class="{ on: shown(3), painted: shown(5) }">
        <g class="slide-l">
          <rect class="board" x="30" y="214" width="300" height="48" />
          <path d="M30 222 H330 M30 227 H330" stroke="#8C7B60" stroke-opacity=".5" stroke-width="1" />
        </g>
        <g class="slide-r">
          <path class="board shade" d="M330 214 L490 205 V272 L330 262 Z" />
          <path d="M330 222 L490 213.5 M330 227 L490 218.8" stroke="#8C7B60" stroke-opacity=".5" stroke-width="1" />
        </g>
        <!-- nails, filled in step 5 -->
        <g class="nails" :class="{ filled: shown(5) }" fill="#5D4A36">
          <circle v-for="n in nails" :key="n" :cx="n" cy="238" r="2" />
          <circle v-for="n in nailsRight" :key="`r${n}`" :cx="n" :cy="236 - (n - 330) * 0.05" r="2" />
        </g>
      </g>

      <!-- 4. shoe molding -->
      <g class="stage" :class="{ on: shown(4), painted: shown(5) }">
        <rect class="board shoe" x="30" y="255" width="300" height="7" rx="3.5" />
        <path class="board shoe" d="M330 255 L490 264.5 V272 L330 262 Z" />
      </g>

      <!-- 5. caulk line + done -->
      <g class="stage" :class="{ on: shown(5) }">
        <path d="M30 214 H330 L490 205" fill="none" stroke="#FFFFFF" stroke-width="2" />
        <g transform="translate(470 60)">
          <circle r="15" fill="#C63D2C" />
          <path d="M-7 0 l5 5 9 -10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>

      <!-- 2. coped corner close-up -->
      <g class="stage pop" :class="{ on: shown(2) && !shown(4) }">
        <path d="M330 238 L258 140" stroke="#F0907A" stroke-width="1.4" />
        <circle cx="330" cy="238" r="8" fill="none" stroke="#C63D2C" stroke-width="2" />
        <g transform="translate(210 100)">
          <circle r="64" fill="#0C1B33" stroke="#C63D2C" stroke-width="2.5" />
          <clipPath id="bb-cc"><circle r="62" /></clipPath>
          <g clip-path="url(#bb-cc)">
            <path d="M-70 -22 H2 V70 H-70 Z" fill="#E9E5DE" />
            <path d="M5 -20 C14 -20 16 -13 12 -8 C8 -2 14 3 19 3 V70 H70 V-20 Z" fill="#D6D0C6" />
            <path d="M5 -20 C14 -20 16 -13 12 -8 C8 -2 14 3 19 3 V70" fill="none" stroke="#C63D2C" stroke-width="2.5" />
          </g>
          <text y="84" text-anchor="middle" class="tag accent">COPED JOINT</text>
        </g>
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
.stage.pop { transform-box: fill-box; transform-origin: center; transform: scale(0.9); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1.2); }
.stage.pop.on { transform: none; }

.old { transition: opacity 0.6s ease, transform 0.6s ease; }
.old.gone { opacity: 0; transform: translateY(-14px); }

.board { fill: #D9C7A8; transition: fill 0.9s ease; }
.board.shade { fill: #C4B293; }
.board.shoe { fill: #CDBB9C; }
.painted .board { fill: #F8F6F2; }
.painted .board.shade { fill: #DCD6CC; }
.painted .board.shoe { fill: #E9E5DE; }

.slide-l, .slide-r { transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.3, 1); }
.stage:not(.on) .slide-l { transform: translateX(-40px); }
.stage:not(.on) .slide-r { transform: translateX(40px); }

.nails circle { transition: opacity 0.5s ease 0.4s; }
.nails.filled circle { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .stage, .stage.pop, .old, .board, .slide-l, .slide-r, .nails circle { transition: none; }
}
</style>
