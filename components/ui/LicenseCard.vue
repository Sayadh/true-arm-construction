<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { company } from '~/data/company'
</script>

<template>
  <div class="relative rounded border border-ink/20 bg-white p-6 sm:p-8">
    <!-- drawing-frame corners -->
    <span class="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-bronze" aria-hidden="true" />
    <span class="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-bronze" aria-hidden="true" />
    <div class="flex items-start gap-4">
      <AppIcon name="FileBadge" :size="36" class="shrink-0 text-bronze-dark" />
      <div>
        <p class="text-sm font-semibold text-muted">{{ company.license.authority }}</p>
        <p class="mt-1 text-h3 text-ink">License #{{ company.license.number }}</p>
      </div>
    </div>
    <dl class="mt-6 grid gap-4 border-t border-stone-300 pt-6 text-[0.9375rem] sm:grid-cols-2">
      <div>
        <dt class="text-muted">Classification</dt>
        <dd class="font-semibold text-ink">Class {{ company.license.classification }}, {{ company.license.classificationName }}</dd>
      </div>
      <div>
        <dt class="text-muted">Status</dt>
        <dd class="font-semibold text-ink">
          <template v-if="company.license.statusConfirmed">Active as of {{ company.license.statusCheckedOn }}</template>
          <template v-else>Check current status on CSLB</template>
        </dd>
      </div>
    </dl>
    <a
      :href="company.license.verifyUrl"
      target="_blank"
      rel="noopener"
      class="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink underline decoration-bronze decoration-2 underline-offset-4 hover:decoration-ink"
    >
      Verify this license on cslb.ca.gov <ExternalLink :size="16" aria-hidden="true" /><span class="sr-only">(opens in a new tab)</span>
    </a>
  </div>
</template>
