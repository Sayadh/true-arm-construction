<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { FaqItem } from '~/types'

/** Native <details> keeps this accessible, keyboard-friendly, and SSR-complete with no JS. */
defineProps<{ items: FaqItem[]; headingLevel?: 'h3' | 'h4' }>()
</script>

<template>
  <div class="divide-y divide-stone-300 border-y border-stone-300">
    <details v-for="item in items" :id="`faq-${item.id}`" :key="item.id" class="group">
      <summary
        class="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-semibold text-ink marker:hidden hover:text-bronze-dark [&::-webkit-details-marker]:hidden"
      >
        <component :is="headingLevel || 'h3'" class="text-[1.0625rem] font-semibold leading-snug sm:text-lg">{{ item.question }}</component>
        <span class="mt-0.5 shrink-0 text-bronze-dark transition-transform duration-200 group-open:rotate-45">
          <Plus :size="22" aria-hidden="true" />
        </span>
      </summary>
      <div class="max-w-prose pb-6 pr-10">
        <RichParagraphs :paragraphs="item.answer" />
      </div>
    </details>
  </div>
</template>
