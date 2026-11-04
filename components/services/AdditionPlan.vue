<script setup lang="ts">
/**
 * Interactive before/after floor plan for the Room Additions page.
 * Switches to "after" by itself the first time it scrolls into view (unless the
 * visitor already clicked), and lets them try different uses for the new room.
 * It is an illustration only: no sizes or prices are implied.
 */
const uses = ['Bedroom', 'Family room', 'Home office', 'Primary suite'] as const
const use = ref<(typeof uses)[number]>('Bedroom')
const after = ref(false)
const touched = ref(false)
const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let timer: ReturnType<typeof setTimeout> | undefined

function show(v: boolean) {
  touched.value = true
  after.value = v
}
function pick(u: (typeof uses)[number]) {
  use.value = u
  show(true)
}

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(
    ([e]) => {
      if (!e?.isIntersecting) return
      observer?.disconnect()
      timer = setTimeout(() => {
        if (!touched.value) after.value = true
      }, 900)
    },
    { threshold: 0.5 }
  )
  observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(timer)
})
</script>

<template>
  <div ref="root" class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
    <div class="lg:col-span-5">
      <p class="kicker">Before and after</p>
      <h2 id="plan-heading" class="mt-3 text-h2">Where the new space goes</h2>
      <p class="mt-4 text-muted">
        An addition extends the house you already have. The new room ties into an existing wall, so the floor plan grows without
        losing what already works. Choose how you would use the space:
      </p>
      <div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Use of the new room">
        <button
          v-for="u in uses"
          :key="u"
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="use === u && after ? 'border-bronze bg-bronze text-white' : 'border-stone-300 bg-white text-ink hover:border-bronze'"
          :aria-pressed="use === u && after"
          @click="pick(u)"
        >{{ u }}</button>
      </div>
      <p class="mt-6 text-xs text-muted">Illustration only. Size, layout, and placement depend on your lot, setbacks, and local requirements.</p>
    </div>

    <div class="lg:col-span-7">
      <div class="rounded border border-stone-300 bg-white p-4 shadow-sm sm:p-6">
        <div class="inline-flex rounded-full bg-stone-50 p-1" role="group" aria-label="Floor plan view">
          <button
            v-for="v in [false, true]"
            :key="String(v)"
            type="button"
            class="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
            :class="after === v ? 'bg-ink text-paper shadow' : 'text-muted hover:text-ink'"
            :aria-pressed="after === v"
            @click="show(v)"
          >{{ v ? 'After' : 'Before' }}</button>
        </div>

        <svg viewBox="0 0 520 300" class="plan mt-4 block h-auto w-full" :class="{ after }" role="img" :aria-label="after ? `Floor plan with a new ${use.toLowerCase()} added to the side of the house` : 'Floor plan of the existing house'">
          <!-- existing rooms -->
          <g fill="#F0EDE7" stroke="none">
            <rect x="40" y="40" width="280" height="220" />
          </g>
          <g fill="none" stroke="#13294B" stroke-width="5" stroke-linecap="square">
            <path d="M320 128 V40 H40 V260 H320 V192" />
            <path d="M180 40 V112 M180 152 V260" stroke-width="3" />
            <path d="M180 150 H250 M282 150 H320" stroke-width="3" />
          </g>
          <!-- wall segment that the addition opens up -->
          <path class="old-wall" d="M320 126 V194" stroke="#13294B" stroke-width="5" />
          <g class="room-label">
            <text x="110" y="154" text-anchor="middle">Living</text>
            <text x="250" y="100" text-anchor="middle">Kitchen</text>
            <text x="250" y="210" text-anchor="middle">Bed / bath</text>
          </g>

          <!-- new addition -->
          <g class="new">
            <rect x="322" y="70" width="156" height="180" fill="#C63D2C" fill-opacity=".07" />
            <path class="draw" pathLength="1" d="M320 72 H478 V248 H320" fill="none" stroke="#C63D2C" stroke-width="5" stroke-linecap="square" />
            <!-- window marks -->
            <path d="M372 72 H426 M372 248 H426" stroke="#fff" stroke-width="3" />
            <path d="M372 69 H426 M372 75 H426 M372 245 H426 M372 251 H426" stroke="#C63D2C" stroke-width="1.2" />
            <!-- primary suite: bath + closet inside the addition -->
            <g class="suite" :class="{ on: use === 'Primary suite' }" fill="none" stroke="#A2301F" stroke-width="2.5">
              <path d="M420 160 V248 M420 160 H478" />
              <text x="449" y="208" text-anchor="middle" class="small">Bath</text>
            </g>
            <text :x="use === 'Primary suite' ? 370 : 400" y="166" text-anchor="middle" class="new-label">{{ use === 'Primary suite' ? 'Suite' : use }}</text>
            <!-- dimension line -->
            <g stroke="#C63D2C" stroke-width="1" fill="none">
              <path d="M322 52 H478 M322 46 V58 M478 46 V58" />
            </g>
            <text x="400" y="40" text-anchor="middle" class="tag">NEW</text>
            <!-- doorway arc into the addition -->
            <path d="M320 128 A 34 34 0 0 1 354 162" fill="none" stroke="#C63D2C" stroke-width="1.2" stroke-dasharray="3 3" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.room-label text { font-size: 13px; font-weight: 600; fill: #5D6370; }
.new-label { font-size: 15px; font-weight: 700; fill: #A2301F; }
.small { font-size: 11px; font-weight: 600; fill: #A2301F; stroke: none; }
.tag { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; fill: #C63D2C; }

.new { opacity: 0; transition: opacity 0.5s ease; }
.after .new { opacity: 1; }
.draw { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.1s ease; }
.after .draw { stroke-dashoffset: 0; }
.old-wall { transition: opacity 0.4s ease 0.5s; }
.after .old-wall { opacity: 0; }
.suite { opacity: 0; transition: opacity 0.4s ease; }
.suite.on { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .new, .draw, .old-wall, .suite { transition: none; }
}
</style>
