<script setup lang="ts">
import { Phone } from 'lucide-vue-next'
import { company } from '~/data/company'
import { estimatePath } from '~/data/navigation'

/** Thumb-reachable actions on small screens. Hidden on the estimate page itself. */
const route = useRoute()
const hidden = computed(() => route.path.startsWith(estimatePath))
</script>

<template>
  <div v-if="!hidden" class="fixed inset-x-0 bottom-0 z-30 border-t border-stone-300 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
    <div class="flex gap-3">
      <AppButton
        v-if="company.phone"
        :href="`tel:${company.phone}`"
        variant="outline"
        class="flex-1"
        track="phone_click"
        track-label="mobile_bar"
      >
        <Phone :size="18" aria-hidden="true" /> Call
      </AppButton>
      <AppButton :to="estimatePath" class="flex-[2]" track="estimate_cta_click" track-label="mobile_bar">
        Get a Free Estimate
      </AppButton>
    </div>
  </div>
</template>
