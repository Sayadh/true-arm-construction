<script setup lang="ts">
/**
 * Hand-drawn line icons for the service finder cards.
 * - Lines draw themselves in when `drawn` turns true (the grid scrolling into view).
 * - Each icon has its own small motion while its card is hovered or open:
 *   water drop, the addition sliding out, planks settling, the roller painting,
 *   pickets rising, the wrench turning, and the checklist ticking.
 * Main lines use currentColor; accents use --accent (set by the parent tile).
 */
const props = withDefaults(defineProps<{ name: string; drawn?: boolean; active?: boolean }>(), { drawn: true, active: false })
</script>

<template>
  <svg viewBox="0 0 32 32" class="nav-icon h-7 w-7" :class="[`i-${props.name}`, { drawn, active }]" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Kitchen / bath: tub, faucet, drop and bubbles -->
    <template v-if="name === 'Bath'">
      <path class="ln" pathLength="1" d="M4 16 H28 V19 a6 6 0 0 1 -6 6 H10 a6 6 0 0 1 -6 -6 Z" />
      <path class="ln" pathLength="1" d="M9 25 L8 28 M23 25 L24 28" />
      <path class="ln" pathLength="1" d="M7 16 V7 a3 3 0 0 1 6 0" />
      <path class="drop acc" d="M13 9.5 c0 0 -1.4 1.7 -1.4 2.6 a1.4 1.4 0 0 0 2.8 0 c0 -0.9 -1.4 -2.6 -1.4 -2.6 Z" fill="var(--accent)" stroke="none" />
      <circle class="bub b1 acc" cx="18" cy="13" r="1.1" />
      <circle class="bub b2 acc" cx="22" cy="12" r="0.8" />
      <circle class="bub b3 acc" cx="20.5" cy="9.5" r="0.6" />
    </template>

    <!-- Add a room: house + addition sliding out + plus -->
    <template v-else-if="name === 'HousePlus'">
      <path class="ln" pathLength="1" d="M4 15 L13 7 L22 15" />
      <path class="ln" pathLength="1" d="M6.5 13 V26 H19.5 V13" />
      <path class="ln" pathLength="1" d="M11 26 V20 H15 V26" />
      <g class="wing">
        <path class="acc-stroke" d="M19.5 18 H27 V26 H19.5" stroke="var(--accent)" stroke-dasharray="2 2" />
      </g>
      <g class="plus">
        <circle cx="25" cy="9" r="4" stroke="var(--accent)" />
        <path d="M25 7 V11 M23 9 H27" stroke="var(--accent)" />
      </g>
    </template>

    <!-- Floors: planks settling into place -->
    <template v-else-if="name === 'Layers'">
      <path class="ln" pathLength="1" d="M3 22 L16 28 L29 22" />
      <path class="ln plank p2" pathLength="1" d="M3 17 L16 23 L29 17" />
      <path class="ln plank p1" pathLength="1" d="M16 6 L29 12 L16 18 L3 12 Z" />
      <path class="seam acc-stroke" d="M9.5 9 L22.5 15" stroke="var(--accent)" />
    </template>

    <!-- Paint: roller rolling up and down the wall, cover soaking up color -->
    <template v-else-if="name === 'PaintRoller'">
      <path class="ln" pathLength="1" d="M3 29 V3" stroke-opacity=".3" />
      <path class="trail" pathLength="1" d="M6.5 27 V8" stroke="var(--accent)" stroke-width="3" />
      <g class="roller">
        <rect class="cover" x="5" y="4" width="19" height="7" rx="2" fill="var(--accent)" stroke="none" />
        <rect class="ln" pathLength="1" x="5" y="4" width="19" height="7" rx="2" />
        <path class="ln" pathLength="1" d="M24 7.5 H27.5 V15 H15 V19" />
        <rect class="ln" pathLength="1" x="13" y="19" width="4" height="9" rx="1.5" />
      </g>
    </template>

    <!-- Fences / gazebo: pickets rising -->
    <template v-else-if="name === 'Fence'">
      <path class="ln" pathLength="1" d="M3 12 H29 M3 21 H29" />
      <path v-for="(x, i) in [6, 12, 18, 24]" :key="x" class="ln picket" :style="{ '--k': i }" pathLength="1" :d="`M${x - 2} 28 V9 L${x} 6 L${x + 2} 9 V28`" />
      <path class="ground acc-stroke" d="M2 28 H30" stroke="var(--accent)" />
    </template>

    <!-- Repairs: wrench turning a bolt -->
    <template v-else-if="name === 'Wrench'">
      <path class="bolt acc-stroke" d="M22 24 l2.6 -1.5 l2.6 1.5 v3 l-2.6 1.5 l-2.6 -1.5 Z" stroke="var(--accent)" />
      <g class="wrench">
        <path class="ln" pathLength="1" d="M19.5 6.3 a6 6 0 0 0 -7.9 7.9 L4.4 21.4 a2.2 2.2 0 0 0 3.1 3.1 l7.2 -7.2 a6 6 0 0 0 7.9 -7.9 l-3.6 3.6 l-3 -0.4 l-0.4 -3 Z" />
      </g>
      <g class="spark acc-stroke" stroke="var(--accent)"><path d="M27 6 V9 M25.5 7.5 H28.5" /></g>
    </template>

    <!-- Every service: clipboard ticking -->
    <template v-else-if="name === 'ClipboardList'">
      <rect class="ln" pathLength="1" x="6" y="5" width="20" height="24" rx="2.5" />
      <rect class="ln" pathLength="1" x="11" y="3" width="10" height="4" rx="1.5" />
      <g v-for="(y, i) in [13, 18.5, 24]" :key="y">
        <path class="tick" :style="{ '--k': i }" pathLength="1" :d="`M10 ${y} l1.6 1.6 l2.8 -3`" stroke="var(--accent)" />
        <path class="ln" pathLength="1" :d="`M17 ${y} H22`" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.nav-icon { overflow: visible; }
.nav-icon * { transform-box: fill-box; }

/* draw-in when the grid appears */
.ln { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 0.9s cubic-bezier(0.6, 0, 0.2, 1) 0.15s; }
.drawn .ln { stroke-dashoffset: 0; }

/* shared trigger: the card (.group) is hovered or the icon is marked active */
/* ---- Bath ---- */
.drop { opacity: 0; transform-origin: center; }
.group:hover .drop, .active .drop { animation: drop 1.4s ease-in infinite; }
@keyframes drop { 0% { opacity: 0; transform: translateY(-2px) scale(0.6); } 20% { opacity: 1; transform: translateY(0) scale(1); } 80% { opacity: 1; transform: translateY(5px); } 100% { opacity: 0; transform: translateY(6px); } }
.bub { stroke: var(--accent); stroke-width: 1.2; opacity: 0; }
.group:hover .bub, .active .bub { animation: bub 1.8s ease-out infinite; }
.b2 { animation-delay: 0.4s !important; }
.b3 { animation-delay: 0.8s !important; }
@keyframes bub { 0% { opacity: 0; transform: translateY(3px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-5px); } }

/* ---- House plus ---- */
.wing { transform-origin: left center; transform: scaleX(0.15); opacity: 0.4; transition: transform 0.55s cubic-bezier(0.3, 1.4, 0.5, 1), opacity 0.3s ease; }
.group:hover .wing, .active .wing { transform: scaleX(1); opacity: 1; }
.plus { transform-origin: center; transition: transform 0.6s cubic-bezier(0.3, 1.5, 0.5, 1); }
.group:hover .plus, .active .plus { transform: rotate(90deg) scale(1.1); }

/* ---- Layers ---- */
.plank { transition: transform 0.5s cubic-bezier(0.3, 1.5, 0.5, 1), stroke-dashoffset 0.9s cubic-bezier(0.6, 0, 0.2, 1) 0.15s; }
.group:hover .p1, .active .p1 { transform: translateY(-3px); }
.group:hover .p2, .active .p2 { transform: translateY(-1.5px); transition-delay: 0.06s; }
.seam { stroke-dasharray: 2 2; opacity: 0.8; }
.group:hover .seam, .active .seam { animation: seam 1.2s linear infinite; }
@keyframes seam { to { stroke-dashoffset: -8; } }

/* ---- Roller ---- */
.cover { opacity: 0.18; transition: opacity 0.4s ease; }
.group:hover .cover, .active .cover { opacity: 0.55; }
.trail { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0.45; }
.group:hover .roller, .active .roller { animation: roll 1.8s ease-in-out infinite; }
.group:hover .trail, .active .trail { animation: trail 1.8s ease-in-out infinite; }
@keyframes roll { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(9px); } }
@keyframes trail { 0% { stroke-dashoffset: 1; } 50% { stroke-dashoffset: 0.25; } 100% { stroke-dashoffset: 0; opacity: 0; } }

/* ---- Fence ---- */
.picket { transform-origin: bottom; transition: transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1), stroke-dashoffset 0.9s cubic-bezier(0.6, 0, 0.2, 1) 0.15s; transition-delay: calc(var(--k) * 60ms); }
.group:hover .picket, .active .picket { transform: scaleY(1.12); }

/* ---- Wrench ---- */
.wrench { transform-origin: 26% 82%; }
.group:hover .wrench, .active .wrench { animation: turn 1.3s cubic-bezier(0.5, 0, 0.3, 1) infinite; }
@keyframes turn { 0%, 100% { transform: rotate(0); } 45% { transform: rotate(-24deg); } 60% { transform: rotate(-20deg); } }
.bolt { transform-origin: center; }
.group:hover .bolt, .active .bolt { animation: bolt 1.3s cubic-bezier(0.5, 0, 0.3, 1) infinite; }
@keyframes bolt { 0%, 100% { transform: rotate(0); } 45%, 60% { transform: rotate(-30deg); } }
.spark { opacity: 0; transform-origin: center; }
.group:hover .spark, .active .spark { animation: spark 1.3s ease-out infinite; }
@keyframes spark { 0%, 40% { opacity: 0; transform: scale(0.4) rotate(0); } 55% { opacity: 1; transform: scale(1.1) rotate(45deg); } 100% { opacity: 0; transform: scale(0.8) rotate(90deg); } }

/* ---- Clipboard ---- */
.tick { stroke-dasharray: 1; stroke-dashoffset: 1; stroke-width: 1.9; }
.drawn .tick { stroke-dashoffset: 0; transition: stroke-dashoffset 0.4s ease; transition-delay: calc(0.9s + var(--k) * 0.25s); }
.group:hover .tick, .active .tick { animation: tick 2.4s ease infinite; animation-delay: calc(var(--k) * 0.25s); }
@keyframes tick { 0% { stroke-dashoffset: 1; } 30%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .nav-icon *, .nav-icon .ln, .nav-icon .tick { animation: none !important; transition: none !important; stroke-dashoffset: 0 !important; }
  .drop, .bub, .spark { opacity: 0 !important; }
}
</style>
