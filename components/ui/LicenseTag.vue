<script setup lang="ts">
import { company } from '~/data/company'

withDefaults(defineProps<{ tone?: 'light' | 'dark'; showVerify?: boolean }>(), { tone: 'light', showVerify: true })
</script>

<template>
  <div
    class="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
    :class="tone === 'dark' ? 'text-stone/80' : 'text-muted'"
  >
    <span class="inline-flex items-center gap-2 font-semibold" :class="tone === 'dark' ? 'text-paper' : 'text-ink'">
      <AppIcon name="ShieldCheck" :size="18" class="text-bronze" />
      CA License #{{ company.license.number }}
    </span>
    <span>Class {{ company.license.classification }}, {{ company.license.classificationName }}</span>
    <a
      v-if="showVerify"
      :href="company.license.verifyUrl"
      target="_blank"
      rel="noopener"
      class="font-semibold underline decoration-bronze underline-offset-4 hover:decoration-current"
      :class="tone === 'dark' ? 'text-paper' : 'text-ink'"
    >Verify on CSLB<span class="sr-only"> (opens in a new tab)</span></a>
  </div>
</template>
