<script setup lang="ts">
import { Phone } from 'lucide-vue-next'
import { company } from '~/data/company'
import { estimatePath } from '~/data/navigation'

/**
 * Thumb-reachable actions on small screens. Hidden on the estimate page itself,
 * and also while a page's own primary estimate CTA (marked with
 * [data-primary-cta]) is still on screen -- e.g. the homepage hero already has
 * its own "Get a Free Estimate" button, so this bar would just duplicate it
 * until the visitor scrolls past it. Pages with no marked CTA show the bar
 * right away, same as before.
 */
const route = useRoute()
const hidden = computed(() => route.path.startsWith(estimatePath))

const onScreenCtaCount = ref(0)
const pageHasOwnCta = ref(false)
let observer: IntersectionObserver | null = null

function observePageCtas() {
  observer?.disconnect()
  onScreenCtaCount.value = 0
  const targets = document.querySelectorAll<HTMLElement>('[data-primary-cta]')
  pageHasOwnCta.value = targets.length > 0
  if (!targets.length) return
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      onScreenCtaCount.value += entry.isIntersecting ? 1 : -1
    }
  })
  targets.forEach((el) => observer!.observe(el))
}

onMounted(() => {
  observePageCtas()
})
// Page content swaps inside the same persistent layout, so re-scan on every navigation.
watch(
  () => route.fullPath,
  () => nextTick(observePageCtas)
)
onBeforeUnmount(() => observer?.disconnect())

const showBar = computed(() => !hidden.value && !(pageHasOwnCta.value && onScreenCtaCount.value > 0))
</script>

<template>
  <div v-if="showBar" class="fixed inset-x-0 bottom-0 z-30 border-t border-stone-300 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden">
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
