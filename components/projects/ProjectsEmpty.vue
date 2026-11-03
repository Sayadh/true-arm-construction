<script setup lang="ts">
import { Instagram } from 'lucide-vue-next'
import { company } from '~/data/company'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
    <div class="grid grid-cols-3 gap-3 lg:col-span-7">
      <MediaFrame v-for="n in 3" :key="n" icon="Camera" label="Project photo" aspect="aspect-[3/4]" :class="n === 2 ? 'translate-y-6' : ''" />
    </div>
    <div class="lg:col-span-5">
      <p class="text-h3 text-ink">Project photos are being prepared</p>
      <p class="mt-3 text-muted">
        We are organizing photos of completed work for this portfolio. Each project will appear here with details about the scope and services involved.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <AppButton v-if="company.social.instagram" :href="company.social.instagram" variant="outline">
          <Instagram :size="18" aria-hidden="true" /> See recent work on Instagram
        </AppButton>
        <AppButton v-if="!compact" to="/free-estimate" track="estimate_cta_click" track-label="projects_empty">Discuss your project</AppButton>
      </div>
    </div>
  </div>
</template>
