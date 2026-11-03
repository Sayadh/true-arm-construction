<script setup lang="ts">
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import type { ImageAsset } from '~/types'

/** Responsive photo grid with an accessible lightbox (Esc, arrows, focus return). */
const props = defineProps<{ images: ImageAsset[] }>()
const dialog = ref<HTMLDialogElement | null>(null)
const index = ref(0)
let opener: HTMLElement | null = null

function open(i: number, e: Event) {
  opener = e.currentTarget as HTMLElement
  index.value = i
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function onClose() {
  opener?.focus()
}
function step(d: number) {
  const n = props.images.length
  index.value = (index.value + d + n) % n
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
const current = computed(() => props.images[index.value])
</script>

<template>
  <div>
    <ul class="grid grid-cols-2 gap-3 md:grid-cols-3">
      <li v-for="(img, i) in images" :key="img.src" :class="i === 0 ? 'col-span-2 row-span-2' : ''">
        <button type="button" class="group block w-full overflow-hidden rounded" :aria-label="`Open photo ${i + 1} of ${images.length}: ${img.alt}`" @click="open(i, $event)">
          <NuxtImg
            format="webp"
            :src="img.src"
            :alt="img.alt"
            :width="img.width"
            :height="img.height"
            sizes="xs:50vw md:33vw"
            loading="lazy"
            class="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>
      </li>
    </ul>

    <dialog
      ref="dialog"
      class="m-auto h-full max-h-none w-full max-w-none bg-deep/95 p-0 text-paper backdrop:bg-deep/80"
      aria-label="Photo viewer"
      @close="onClose"
      @keydown="onKey"
      @click.self="close"
    >
      <div v-if="current" class="flex h-full flex-col">
        <div class="flex items-center justify-between p-4">
          <p class="text-sm text-stone/80">{{ index + 1 }} / {{ images.length }}</p>
          <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-paper/10" aria-label="Close photo viewer" @click="close">
            <X :size="24" aria-hidden="true" />
          </button>
        </div>
        <div class="relative flex flex-1 items-center justify-center px-4 pb-4">
          <NuxtImg format="webp" :src="current.src" :alt="current.alt" sizes="xs:100vw" class="max-h-[80vh] w-auto max-w-full rounded object-contain" />
          <button v-if="images.length > 1" type="button" class="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-deep/70 hover:bg-deep" aria-label="Previous photo" @click="step(-1)">
            <ChevronLeft :size="26" aria-hidden="true" />
          </button>
          <button v-if="images.length > 1" type="button" class="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-deep/70 hover:bg-deep" aria-label="Next photo" @click="step(1)">
            <ChevronRight :size="26" aria-hidden="true" />
          </button>
        </div>
        <p class="px-4 pb-6 text-center text-sm text-stone/80">{{ current.alt }}</p>
      </div>
    </dialog>
  </div>
</template>
