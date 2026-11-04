<script setup lang="ts">
/**
 * Profile picker for the Baseboard Installation page: switch between a few common
 * baseboard styles, see the board on a wall and its cross-section, and toggle shoe
 * molding. Illustration only; heights are relative, not measurements.
 */
const profiles = [
  { id: 'modern', name: 'Modern', note: 'Simple, low, square-edged. Fits modern interiors.', h: 46 },
  { id: 'colonial', name: 'Colonial', note: 'A shaped top edge that suits most homes.', h: 70 },
  { id: 'craftsman', name: 'Craftsman', note: 'A taller flat board with a cap. Looks best with higher ceilings.', h: 100 }
] as const
type ProfileId = (typeof profiles)[number]['id']

const current = ref<ProfileId>('colonial')
const shoe = ref(true)
const profile = computed(() => profiles.find((p) => p.id === current.value)!)
const FLOOR = 250
</script>

<template>
  <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <div class="lg:col-span-5">
      <p class="kicker">Profiles</p>
      <h2 id="profiles-heading" class="mt-3 text-h2">Pick a look for your trim</h2>
      <p class="mt-4 text-muted">Profile height should suit the room. Try a few common styles:</p>
      <div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Baseboard profile">
        <button
          v-for="p in profiles"
          :key="p.id"
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="current === p.id ? 'border-bronze bg-bronze text-white' : 'border-stone-300 bg-white text-ink hover:border-bronze'"
          :aria-pressed="current === p.id"
          @click="current = p.id"
        >{{ p.name }}</button>
      </div>
      <p class="mt-4 min-h-[3rem] text-[0.9375rem] text-body" aria-live="polite">{{ profile.note }}</p>
      <label class="mt-2 inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
        <input v-model="shoe" type="checkbox" class="h-4 w-4 accent-[#C63D2C]" />
        Add shoe molding
      </label>
      <p class="mt-6 text-xs text-muted">Illustration only. Material and height are chosen with you at the estimate.</p>
    </div>

    <div class="lg:col-span-7">
      <div class="grid overflow-hidden rounded border border-stone-300 bg-white shadow-sm sm:grid-cols-[1fr_auto]">
        <!-- wall view -->
        <svg viewBox="0 0 420 280" class="block h-auto w-full" role="img" :aria-label="`${profile.name} baseboard on a wall${shoe ? ' with shoe molding' : ''}`">
          <defs>
            <linearGradient id="bp-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35" /><stop offset="1" stop-color="#fff" stop-opacity="0" /></linearGradient>
            <filter id="bp-shadow" x="-5%" y="-20%" width="110%" height="160%"><feDropShadow dx="0" dy="-1" stdDeviation="1.5" flood-color="#13294B" flood-opacity=".18" /></filter>
          </defs>
          <rect width="420" height="280" fill="#D9DDE3" />
          <rect width="420" height="280" fill="url(#bp-wall)" />
          <rect x="0" :y="FLOOR" width="420" height="30" fill="#C9B79A" />
          <path d="M0 262 H420 M0 272 H420" stroke="#B3A182" stroke-width="1" />
          <rect x="300" y="150" width="22" height="34" rx="3" fill="#fff" stroke="#D6D0C6" />
          <circle cx="311" cy="161" r="2.5" fill="#D6D0C6" /><circle cx="311" cy="173" r="2.5" fill="#D6D0C6" />

          <g v-for="p in profiles" :key="p.id" class="board" :class="{ on: current === p.id }" filter="url(#bp-shadow)">
            <rect x="0" :y="FLOOR - p.h" width="420" :height="p.h" fill="#FFFFFF" />
            <path :d="`M0 ${FLOOR - p.h} H420`" stroke="#D6D0C6" stroke-width="2" />
            <template v-if="p.id === 'colonial'">
              <path :d="`M0 ${FLOOR - p.h + 8} H420 M0 ${FLOOR - p.h + 14} H420`" stroke="#E2DCD2" stroke-width="2" />
            </template>
            <template v-if="p.id === 'craftsman'">
              <rect x="0" :y="FLOOR - p.h - 8" width="420" height="10" fill="#FFFFFF" />
              <path :d="`M0 ${FLOOR - p.h - 8} H420 M0 ${FLOOR - p.h + 2} H420`" stroke="#D6D0C6" stroke-width="2" />
            </template>
            <path :d="`M0 ${FLOOR} H420`" stroke="#D6D0C6" stroke-width="1" />
          </g>

          <rect class="shoe" :class="{ on: shoe }" x="0" :y="FLOOR - 8" width="420" height="8" rx="4" fill="#FAF8F4" stroke="#D6D0C6" />
        </svg>

        <!-- cross-section -->
        <div class="flex flex-col items-center justify-center border-t border-stone-300 bg-stone-50 px-6 py-4 sm:border-l sm:border-t-0">
          <svg viewBox="0 0 90 150" class="h-40 w-auto" role="img" :aria-label="`${profile.name} profile cross-section`">
            <path d="M18 0 V150" stroke="#ABA497" stroke-width="2" stroke-dasharray="4 4" />
            <path d="M0 140 H90" stroke="#ABA497" stroke-width="2" />
            <g class="board" :class="{ on: current === 'modern' }">
              <path d="M18 140 V90 H30 V140 Z" fill="#fff" stroke="#13294B" stroke-width="2" stroke-linejoin="round" />
            </g>
            <g class="board" :class="{ on: current === 'colonial' }">
              <path d="M18 140 V68 C24 68 26 72 25 76 C24 80 30 82 32 86 V140 Z" fill="#fff" stroke="#13294B" stroke-width="2" stroke-linejoin="round" />
            </g>
            <g class="board" :class="{ on: current === 'craftsman' }">
              <path d="M18 140 V40 H24 V30 H36 V40 H31 V140 Z" fill="#fff" stroke="#13294B" stroke-width="2" stroke-linejoin="round" />
            </g>
            <path class="shoe" :class="{ on: shoe }" d="M31 140 V132 Q40 132 41 140 Z" fill="#fff" stroke="#C63D2C" stroke-width="2" />
          </svg>
          <p class="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Section</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board { opacity: 0; transform: translateY(14px); transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.3, 1); }
.board.on { opacity: 1; transform: none; }
.shoe { opacity: 0; transition: opacity 0.35s ease; }
.shoe.on { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .board, .shoe { transition: none; }
}
</style>
