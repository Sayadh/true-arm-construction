<script setup lang="ts">
/**
 * Before/after comparison for the Epoxy Flooring page: drag the divider to wipe
 * from bare concrete to a coated floor, and try a few finishes and colors.
 * The divider sweeps across by itself the first time the block scrolls into view
 * (unless the visitor already touched it). Illustration only.
 */
const colors = [
  { id: 'graphite', name: 'Graphite', base: '#3E444E', flakes: ['#F8F6F2', '#ABA497', '#0C1B33', '#7C838E'] },
  { id: 'gray', name: 'Stone gray', base: '#8A8F98', flakes: ['#F8F6F2', '#3E444E', '#C9C2B6', '#5D6370'] },
  { id: 'tan', name: 'Desert tan', base: '#B49A7A', flakes: ['#F8F6F2', '#5D4A36', '#E9DCC8', '#7C6650'] },
  { id: 'slate', name: 'Slate blue', base: '#3B5683', flakes: ['#F8F6F2', '#9FB0C8', '#0C1B33', '#C63D2C'] }
] as const
type ColorId = (typeof colors)[number]['id']

const finish = ref<'flake' | 'solid'>('flake')
const colorId = ref<ColorId>('graphite')
const color = computed(() => colors.find((c) => c.id === colorId.value)!)
const pos = ref(18)
const touched = ref(false)


const root = ref<HTMLElement | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
let observer: IntersectionObserver | null = null
let raf = 0

function sweep() {
  const from = pos.value
  const to = 64
  const start = performance.now()
  const step = (t: number) => {
    if (touched.value) return
    const k = Math.min(1, (t - start) / 1400)
    const ease = 1 - Math.pow(1 - k, 3)
    pos.value = from + (to - from) * ease
    if (k < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (!root.value) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver(
    ([e]) => {
      if (!e?.isIntersecting) return
      observer?.disconnect()
      if (reduce) pos.value = 64
      else setTimeout(() => !touched.value && sweep(), 400)
    },
    { threshold: 0.5 }
  )
  observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})

function touch() {
  touched.value = true
  cancelAnimationFrame(raf)
}
let dragging = false
function fromPointer(ev: PointerEvent) {
  const box = svgEl.value?.getBoundingClientRect()
  if (!box) return
  pos.value = Math.min(100, Math.max(0, ((ev.clientX - box.left) / box.width) * 100))
}
function down(ev: PointerEvent) {
  touch()
  dragging = true
  ;(ev.currentTarget as Element).setPointerCapture?.(ev.pointerId)
  fromPointer(ev)
}
function move(ev: PointerEvent) {
  if (dragging) fromPointer(ev)
}
function up() {
  dragging = false
}
const x = computed(() => (pos.value / 100) * 600)
</script>

<template>
  <div ref="root" class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <div class="lg:col-span-5">
      <p class="kicker">Before and after</p>
      <h2 id="finish-heading" class="mt-3 text-h2">From bare concrete to a finished floor</h2>
      <p class="mt-4 text-muted">Drag across the floor to compare. Then try a finish and a color.</p>

      <p class="mt-6 text-sm font-semibold text-ink">Finish</p>
      <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Finish">
        <button
          v-for="f in (['flake', 'solid'] as const)"
          :key="f"
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="finish === f ? 'border-ink bg-ink text-paper' : 'border-stone-300 bg-white text-ink hover:border-ink'"
          :aria-pressed="finish === f"
          @click="finish = f; touch(); pos = Math.max(pos, 64)"
        >{{ f === 'flake' ? 'Flake' : 'Solid color' }}</button>
      </div>

      <p class="mt-5 text-sm font-semibold text-ink">Color</p>
      <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Color">
        <button
          v-for="c in colors"
          :key="c.id"
          type="button"
          class="flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors"
          :class="colorId === c.id ? 'border-bronze bg-white text-ink ring-2 ring-bronze/30' : 'border-stone-300 bg-white text-ink hover:border-bronze'"
          :aria-pressed="colorId === c.id"
          @click="colorId = c.id; touch(); pos = Math.max(pos, 64)"
        >
          <span class="h-4 w-4 rounded-full border border-black/10" :style="{ background: c.base }" aria-hidden="true" />{{ c.name }}
        </button>
      </div>
      <p class="mt-6 text-xs text-muted">Illustration only. Colors on screen are approximate, and the coating system is chosen for your space during the estimate.</p>
    </div>

    <div class="lg:col-span-7">
      <div class="overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
        <svg
          ref="svgEl"
          viewBox="0 0 600 380"
          class="block h-auto w-full cursor-ew-resize touch-pan-y select-none"
          role="img"
          :aria-label="`Floor comparison: bare concrete on the left, ${finish === 'flake' ? 'flake' : 'solid'} ${color.name.toLowerCase()} epoxy on the right`"
          @pointerdown="down"
          @pointermove="move"
          @pointerup="up"
          @pointercancel="up"
        >
          <defs>
            <clipPath id="ef-clip"><rect :x="x" y="0" :width="600 - x" height="380" /></clipPath>
            <linearGradient id="ef-gloss" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#fff" stop-opacity=".18" /><stop offset=".45" stop-color="#fff" stop-opacity="0" /><stop offset=".7" stop-color="#fff" stop-opacity=".08" /><stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- bare concrete -->
          <rect width="600" height="380" fill="#8E9199" />
          <g fill="#5D6370" fill-opacity=".45">
            <ellipse cx="150" cy="120" rx="70" ry="36" /><ellipse cx="420" cy="270" rx="60" ry="28" /><ellipse cx="300" cy="80" rx="26" ry="14" />
          </g>
          <path d="M60 300 l50 -14 l30 10 l60 -22 l40 8 l70 -30 l50 4" fill="none" stroke="#4A4F58" stroke-width="2.5" />
          <path d="M0 190 H600 M300 0 V380" stroke="#6E737C" stroke-width="2" />

          <!-- coated floor (right of the divider) -->
          <g clip-path="url(#ef-clip)">
            <rect width="600" height="380" :fill="color.base" class="base" />
            <EpoxyFlakes v-show="finish === 'flake'" :colors="color.flakes" />
            <path d="M0 190 H600 M300 0 V380" stroke="#000" stroke-opacity=".12" stroke-width="2" />
            <rect width="600" height="380" fill="url(#ef-gloss)" />
          </g>

          <!-- labels -->
          <g class="lbl">
            <rect x="14" y="14" width="128" height="26" rx="13" fill="#0C1B33" fill-opacity=".75" />
            <text x="78" y="31" text-anchor="middle">BARE CONCRETE</text>
            <rect x="486" y="14" width="100" height="26" rx="13" fill="#0C1B33" fill-opacity=".75" />
            <text x="536" y="31" text-anchor="middle">EPOXY</text>
          </g>

          <!-- divider -->
          <g :transform="`translate(${x} 0)`">
            <path d="M0 0 V380" stroke="#F8F6F2" stroke-width="3" />
            <circle cy="190" r="20" fill="#F8F6F2" stroke="#C63D2C" stroke-width="3" />
            <path d="M-6 183 l-6 7 6 7 M6 183 l6 7 -6 7" fill="none" stroke="#13294B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <label class="flex items-center gap-3 border-t border-stone-300 px-4 py-3 text-xs font-semibold text-muted">
          <span class="shrink-0">Compare</span>
          <input v-model.number="pos" type="range" min="0" max="100" step="1" class="w-full accent-[#C63D2C]" aria-label="Move the divider between bare concrete and the epoxy floor" @input="touch" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lbl text { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; fill: #F8F6F2; }
.base { transition: fill 0.5s ease; }
</style>
