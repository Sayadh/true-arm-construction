<script setup lang="ts">
import { estimatePath } from '~/data/navigation'

/**
 * "Build your list" for the Handyman Services page. The visitor taps problem spots
 * in the room; each one gets fixed in the drawing and added to a list, which can then
 * be carried into the free-estimate form (service + notes prefilled).
 * Illustration only.
 */
const items = [
  { id: 'door', label: 'Door that sticks or will not latch', short: 'Door', x: 15, y: 54 },
  { id: 'shelf', label: 'Shelving to hang or level', short: 'Shelf', x: 41, y: 28 },
  { id: 'drywall', label: 'Hole or dent in drywall', short: 'Drywall', x: 44, y: 55 },
  { id: 'light', label: 'Light fixture to replace', short: 'Light', x: 57, y: 20 },
  { id: 'cabinet', label: 'Cabinet door hinge', short: 'Cabinet', x: 85, y: 67 },
  { id: 'trim', label: 'Loose or damaged baseboard', short: 'Trim', x: 33, y: 84 }
] as const
type ItemId = (typeof items)[number]['id']

const picked = ref<ItemId[]>([])
const has = (id: ItemId) => picked.value.includes(id)
function toggle(id: ItemId) {
  picked.value = has(id) ? picked.value.filter((p) => p !== id) : [...picked.value, id]
}
const list = computed(() => items.filter((i) => has(i.id)))

const link = computed(() => {
  const notes = list.value.length ? `My handyman list:\n${list.value.map((i) => `- ${i.label}`).join('\n')}` : ''
  const q = new URLSearchParams({ service: 'handyman-services' })
  if (notes) q.set('notes', notes)
  return `${estimatePath}?${q.toString()}`
})
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
    <div class="lg:col-span-7">
      <p class="kicker">Build your list</p>
      <h2 id="list-heading" class="mt-3 text-h2">Tap what needs fixing</h2>
      <p class="mt-4 max-w-xl text-muted">Pick the spots in the room. Each one gets fixed in the drawing and goes on your list, ready to send for an estimate.</p>

      <div class="relative mt-8 overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
        <svg viewBox="0 0 600 380" class="block h-auto w-full" role="img" aria-label="A room with small repairs to choose from">
          <rect width="600" height="380" fill="#F0EDE7" />
          <rect y="322" width="600" height="58" fill="#E2D6C3" />
          <path d="M0 340 H600 M0 360 H600" stroke="#D2C4AD" />

          <!-- window -->
          <rect x="430" y="70" width="130" height="110" fill="#DCE6F0" stroke="#13294B" stroke-width="2.5" />
          <path d="M495 70 V180 M430 125 H560" stroke="#13294B" stroke-width="1.5" />
          <path d="M422 186 H568" stroke="#13294B" stroke-width="4" stroke-linecap="round" />

          <!-- door -->
          <path d="M48 140 H142 V322" fill="none" stroke="#13294B" stroke-width="2.5" />
          <g class="fix" :class="{ ok: has('door') }" style="transform-origin: 50px 142px; --r: 3deg">
            <rect x="50" y="142" width="90" height="180" fill="#FFFFFF" stroke="#13294B" stroke-width="2.5" />
            <rect x="62" y="156" width="66" height="70" fill="none" stroke="#D6D0C6" stroke-width="2" />
            <rect x="62" y="238" width="66" height="70" fill="none" stroke="#D6D0C6" stroke-width="2" />
            <circle cx="128" cy="232" r="4.5" fill="#13294B" />
          </g>

          <!-- shelf -->
          <g class="fix" :class="{ ok: has('shelf') }" style="transform-origin: 200px 112px; --r: -8deg">
            <path d="M200 112 H310" stroke="#13294B" stroke-width="5" stroke-linecap="round" />
            <rect x="212" y="78" width="11" height="34" fill="#3B5683" /><rect x="225" y="84" width="10" height="28" fill="#5D6370" /><rect x="237" y="74" width="12" height="38" fill="#C63D2C" />
            <rect x="272" y="92" width="28" height="20" rx="3" fill="#ABA497" />
          </g>

          <!-- drywall hole / patch -->
          <path d="M256 200 l10 -8 l9 6 l8 -4 l4 12 l-6 10 l-12 3 l-10 -5 z" fill="#5D6370" />
          <rect class="patch" :class="{ ok: has('drywall') }" x="246" y="186" width="50" height="44" fill="#F0EDE7" stroke="#D6D0C6" stroke-dasharray="4 3" />

          <!-- light -->
          <path d="M342 0 V44" stroke="#13294B" stroke-width="2" />
          <path d="M322 44 H362 L354 60 H330 Z" fill="#FFFFFF" stroke="#13294B" stroke-width="2.5" />
          <g class="glow" :class="{ ok: has('light') }">
            <ellipse cx="342" cy="80" rx="70" ry="28" fill="#F7C9A8" fill-opacity=".5" />
            <circle cx="342" cy="64" r="6" fill="#F0907A" />
          </g>

          <!-- cabinet -->
          <rect x="430" y="232" width="130" height="90" fill="#FFFFFF" stroke="#13294B" stroke-width="2.5" />
          <path d="M495 232 V322" stroke="#13294B" stroke-width="2" />
          <rect x="436" y="238" width="53" height="78" fill="none" stroke="#D6D0C6" stroke-width="2" />
          <g class="fix" :class="{ ok: has('cabinet') }" style="transform-origin: 556px 236px; --r: 6deg">
            <rect x="498" y="236" width="58" height="82" fill="#FFFFFF" stroke="#13294B" stroke-width="2" />
            <circle cx="506" cy="276" r="3.5" fill="#13294B" />
          </g>

          <!-- baseboard -->
          <path d="M0 312 H142 M262 312 H430" stroke="#13294B" stroke-width="2" />
          <rect x="0" y="312" width="600" height="10" fill="#FFFFFF" fill-opacity=".7" />
          <g class="fix" :class="{ ok: has('trim') }" style="transform-origin: 150px 322px; --r: -10deg">
            <rect x="150" y="310" width="110" height="12" fill="#FFFFFF" stroke="#13294B" stroke-width="2" />
          </g>
        </svg>

        <!-- hotspots -->
        <button
          v-for="it in items"
          :key="it.id"
          type="button"
          class="hot absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bronze/40"
          :class="{ picked: has(it.id) }"
          :style="{ left: `${it.x}%`, top: `${it.y}%` }"
          :aria-pressed="has(it.id)"
          :aria-label="`${it.label}${has(it.id) ? ' (on your list)' : ''}`"
          @click="toggle(it.id)"
        >
          <span class="ring" aria-hidden="true" />
          <span class="dot" aria-hidden="true">
            <svg v-if="has(it.id)" viewBox="0 0 16 16" class="h-3.5 w-3.5"><path d="M3.5 8.5l3 3 6-7" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span v-else class="text-base font-bold leading-none text-white">+</span>
          </span>
        </button>
      </div>
    </div>

    <div class="lg:col-span-5 lg:pt-28">
      <div class="rounded border border-stone-300 bg-white p-6 shadow-sm sm:p-7 lg:sticky lg:top-36">
        <div class="flex items-baseline justify-between gap-4">
          <h3 class="text-h3">Your list</h3>
          <span class="text-sm font-semibold text-muted" aria-live="polite">{{ list.length }} {{ list.length === 1 ? 'item' : 'items' }}</span>
        </div>
        <p v-if="!list.length" class="mt-4 rounded border border-dashed border-stone-300 bg-stone-50 p-4 text-[0.9375rem] text-muted">
          Nothing yet. Tap the <span class="font-semibold text-bronze-dark">+</span> spots in the room.
        </p>
        <TransitionGroup v-else tag="ul" name="li" class="mt-4 divide-y divide-stone-300">
          <li v-for="it in list" :key="it.id" class="flex items-center gap-3 py-3">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2F8F5B]" aria-hidden="true">
              <svg viewBox="0 0 16 16" class="h-3.5 w-3.5"><path d="M3.5 8.5l3 3 6-7" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <span class="flex-1 text-[0.9375rem] text-body">{{ it.label }}</span>
            <button type="button" class="rounded px-2 py-1 text-xs font-semibold text-muted hover:text-bronze-dark" :aria-label="`Remove ${it.label}`" @click="toggle(it.id)">Remove</button>
          </li>
        </TransitionGroup>
        <AppButton :to="link" block class="mt-6" track="service_cta_click" :track-label="`handyman_list_${list.length}`">
          {{ list.length ? `Get an estimate for ${list.length} ${list.length === 1 ? 'item' : 'items'}` : 'Start your list in the estimate form' }}
        </AppButton>
        <p class="mt-3 text-xs text-muted">Your list goes into the notes of the estimate form. Add anything else there. Photos help us plan materials and time.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fix { transform-box: view-box; transform: rotate(var(--r)); transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.3, 1.2); }
.fix.ok { transform: none; }
.patch { opacity: 0; transition: opacity 0.6s ease 0.2s; }
.patch.ok { opacity: 1; }
.glow { opacity: 0; transition: opacity 0.6s ease; }
.glow.ok { opacity: 1; }

.hot .dot { position: relative; display: flex; height: 1.75rem; width: 1.75rem; align-items: center; justify-content: center; border-radius: 9999px; background: #C63D2C; box-shadow: 0 2px 6px rgb(12 27 51 / 0.3); transition: background 0.3s ease, transform 0.2s ease; }
.hot:hover .dot { transform: scale(1.1); }
.hot.picked .dot { background: #2F8F5B; }
.hot .ring { position: absolute; inset: 0.375rem; border-radius: 9999px; background: #C63D2C; opacity: 0.35; animation: ping 1.8s ease-out infinite; }
.hot.picked .ring { animation: none; opacity: 0; }
@keyframes ping { from { transform: scale(0.8); opacity: 0.5; } to { transform: scale(1.8); opacity: 0; } }

.li-enter-active, .li-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.li-enter-from, .li-leave-to { opacity: 0; transform: translateX(-10px); }

@media (prefers-reduced-motion: reduce) {
  .fix, .patch, .glow, .li-enter-active, .li-leave-active { transition: none; }
  .hot .ring { animation: none; }
}
</style>
