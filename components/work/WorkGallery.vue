<script setup lang="ts">
import { ChevronLeft, ChevronRight, X, Play, Columns2 } from 'lucide-vue-next'
import type { WorkMedia } from '~/types'
import { coverImage } from '~/data/work'
import { getService } from '~/data/services'

/**
 * Adaptive gallery for work photos, videos, and before/after pairs.
 * Layout follows the count: 1 = wide, 2 = side by side, 3 = feature + two, 4 = grid, 5+ = feature + grid with "show all".
 * Lightbox: Esc, arrow keys, swipe; focus returns to the opened tile.
 */
const props = withDefaults(defineProps<{ items: WorkMedia[]; initial?: number; showService?: boolean }>(), { initial: 9, showService: false })

const expanded = ref(false)
const n = computed(() => props.items.length)
// For 5+ items the first tile spans 2×2 in a 4-column grid, so complete rows need 1 + 4k tiles (5, 9, 13 …).
const fit = computed(() => {
  if (n.value <= 4) return n.value
  let k = Math.min(n.value, props.initial)
  while (k > 5 && (k - 1) % 4 !== 0) k--
  return k
})

const gridClass = computed(() => {
  if (n.value === 1) return 'grid-cols-1'
  if (n.value === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (n.value === 3) return 'grid-cols-2 md:grid-cols-3 md:grid-rows-2'
  if (n.value === 4) return 'grid-cols-2'
  return 'grid-cols-2 md:grid-cols-4'
})
function tileClass(i: number) {
  if (n.value === 1) return 'aspect-[16/9]'
  if (n.value === 2) return 'aspect-[4/3]'
  if (n.value === 3) return i === 0 ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto' : 'aspect-[4/3]'
  if (n.value === 4) return 'aspect-[4/3]'
  return i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
}
// One size set for every tile: a static build only pre-generates image variants it sees in the HTML,
// so tiles must not change their sizes when filtered or expanded.
const TILE_SIZES = 'xs:100vw md:50vw'

const label = (m: WorkMedia) => {
  const s = props.showService ? getService(m.service)?.name : ''
  const what = m.kind === 'video' ? 'video' : m.kind === 'beforeAfter' ? 'before and after photos' : 'photo'
  return [s, m.caption || coverImage(m).alt].filter(Boolean).join(': ') || what
}
const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// ── Lightbox
const dialog = ref<HTMLDialogElement | null>(null)
const index = ref(0)
// Content is rendered only while open, so a closed lightbox never downloads full-size media
const isOpen = ref(false)
let opener: HTMLElement | null = null
function open(i: number, e: Event) {
  opener = e.currentTarget as HTMLElement
  index.value = i
  isOpen.value = true
  dialog.value?.showModal()
}
const close = () => dialog.value?.close()
const step = (d: number) => (index.value = (index.value + d + n.value) % n.value)
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
let touchX: number | null = null
const onTouchStart = (e: TouchEvent) => (touchX = e.touches[0]?.clientX ?? null)
function onTouchEnd(e: TouchEvent) {
  if (touchX == null) return
  const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  touchX = null
}
const current = computed(() => props.items[index.value])
</script>

<template>
  <div>
    <ul class="grid gap-3" :class="gridClass">
      <li v-for="(m, i) in items" v-show="expanded || i < fit" :key="m.id" :class="tileClass(i)">
        <button
          type="button"
          class="group relative block h-full w-full overflow-hidden rounded-lg bg-stone focus-visible:outline-offset-2"
          :aria-label="`Open ${i + 1} of ${n}: ${label(m)}`"
          @click="open(i, $event)"
        >
          <NuxtImg
            format="webp"
            :src="coverImage(m).src"
            :alt="coverImage(m).alt"
            :width="coverImage(m).width"
            :height="coverImage(m).height"
            :sizes="TILE_SIZES"
            loading="lazy"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span class="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
          <span v-if="m.kind === 'video'" class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-ink shadow-lg transition-transform group-hover:scale-110">
              <Play :size="24" class="ml-1" fill="currentColor" />
            </span>
            <span class="absolute bottom-3 right-3 rounded bg-deep/80 px-2 py-0.5 text-xs font-semibold text-paper">{{ fmtDuration(m.duration) }}</span>
          </span>
          <span v-if="m.kind === 'beforeAfter'" class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded bg-deep/80 px-2 py-1 text-xs font-semibold text-paper" aria-hidden="true">
            <Columns2 :size="14" /> Before / After
          </span>
          <span v-if="showService" class="absolute bottom-3 left-3 rounded bg-paper/90 px-2 py-1 text-xs font-semibold text-ink" aria-hidden="true">
            {{ getService(m.service)?.shortName }}
          </span>
        </button>
      </li>
    </ul>

    <div v-if="n > fit" class="mt-6 text-center">
      <AppButton variant="outline" @click="expanded = !expanded">{{ expanded ? 'Show fewer' : `Show all ${n}` }}</AppButton>
    </div>

    <dialog
      ref="dialog"
      class="m-auto h-full max-h-none w-full max-w-none bg-deep/95 p-0 text-paper backdrop:bg-deep/80"
      aria-label="Work viewer"
      @close="isOpen = false; opener?.focus()"
      @keydown="onKey"
      @click.self="close"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div v-if="isOpen && current" class="flex h-full flex-col">
        <div class="flex items-center justify-between p-4">
          <p class="text-sm text-stone/80">{{ index + 1 }} / {{ n }}</p>
          <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-paper/10" aria-label="Close viewer" @click="close">
            <X :size="24" aria-hidden="true" />
          </button>
        </div>
        <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
          <img v-if="current.kind === 'photo'" :key="current.id" :src="current.image.src" :alt="current.image.alt" :width="current.image.width" :height="current.image.height" class="max-h-[78vh] w-auto max-w-full rounded object-contain">
          <video
            v-else-if="current.kind === 'video'"
            :key="current.id"
            :src="current.src"
            :poster="current.poster.src"
            class="max-h-[78vh] max-w-full rounded"
            controls
            autoplay
            muted
            playsinline
            preload="metadata"
          />
          <div v-else class="w-full max-w-4xl">
            <BeforeAfter :id="current.id" :key="current.id" plain :pair="{ before: current.before, after: current.after, caption: current.caption }" />
          </div>
          <template v-if="n > 1">
            <button type="button" class="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20 sm:inline-flex" aria-label="Previous" @click="step(-1)">
              <ChevronLeft :size="26" aria-hidden="true" />
            </button>
            <button type="button" class="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 hover:bg-paper/20 sm:inline-flex" aria-label="Next" @click="step(1)">
              <ChevronRight :size="26" aria-hidden="true" />
            </button>
          </template>
        </div>
        <p v-if="current.kind !== 'beforeAfter'" class="px-4 pb-6 text-center text-sm text-stone/80">
          <span v-if="showService" class="font-semibold text-paper">{{ getService(current.service)?.name }} · </span>{{ current.caption || coverImage(current).alt }}
        </p>
      </div>
    </dialog>
  </div>
</template>
