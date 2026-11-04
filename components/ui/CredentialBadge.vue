<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import type { Credential } from '~/types'

/** Compact credential card (logo + name + number + verify link), used beside the license card. */
defineProps<{ credential: Credential }>()
</script>

<template>
  <article class="flex items-center gap-5 rounded-lg border border-stone-300 bg-white p-5 sm:gap-6 sm:p-6">
    <NuxtImg
      v-if="credential.image"
      format="webp"
      :src="credential.image.src"
      :alt="credential.image.alt"
      :width="credential.image.width"
      :height="credential.image.height"
      sizes="xs:120px sm:144px"
      loading="lazy"
      class="h-auto w-28 shrink-0 object-contain sm:w-36"
    />
    <div class="min-w-0">
      <p class="text-xs font-semibold text-bronze-dark">{{ credential.issuer }}</p>
      <h3 class="mt-1 text-lg font-bold leading-snug text-ink">{{ credential.name }}</h3>
      <p v-if="credential.credentialNumber" class="mt-1 text-sm text-muted">
        Certification <span class="font-semibold text-ink">{{ credential.credentialNumber }}</span>
      </p>
      <a
        v-if="credential.verifyUrl"
        :href="credential.verifyUrl"
        target="_blank"
        rel="noopener"
        class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-bronze underline-offset-4"
      >
        <ExternalLink :size="15" aria-hidden="true" /> Verify with issuer
      </a>
    </div>
  </article>
</template>
