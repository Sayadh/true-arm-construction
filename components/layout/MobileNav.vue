<script setup lang="ts">
import { X, ChevronDown, Instagram, Facebook, Phone } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { estimatePath } from '~/data/navigation'
import type { NavLink } from '~/types'

interface Group { id: string; name: string; items: NavLink[]; extras: NavLink[] }

const props = defineProps<{ open: boolean; groups: Group[]; links: NavLink[] }>()
const emit = defineEmits<{ 'update:open': [boolean] }>()
const panel = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let lastFocused: HTMLElement | null = null

function close() { emit('update:open', false) }

function trap(e: KeyboardEvent) {
  if (!props.open || !panel.value) return
  if (e.key === 'Escape') { close(); return }
  if (e.key !== 'Tab') return
  const f = panel.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary')
  if (!f.length) return
  const first = f[0]!
  const last = f[f.length - 1]!
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}

watch(() => props.open, async (v) => {
  if (import.meta.server) return
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) {
    lastFocused = document.activeElement as HTMLElement
    await nextTick()
    closeBtn.value?.focus()
  } else {
    lastFocused?.focus?.()
  }
})

onMounted(() => document.addEventListener('keydown', trap))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', trap)
  document.documentElement.style.overflow = ''
})

const secondary: NavLink[] = [
  { label: 'Licenses & Certifications', to: '/licenses-certifications' },
  { label: 'Service Areas', to: '/service-areas' },
  { label: 'FAQ', to: '/faq' }
]
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-150" leave-to-class="opacity-0">
      <div v-if="open" class="fixed inset-0 z-50 bg-deep/60 xl:hidden" aria-hidden="true" @click="close" />
    </Transition>
    <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full" leave-active-class="transition-transform duration-200 ease-in" leave-to-class="translate-x-full">
      <div
        v-if="open"
        id="mobile-nav"
        ref="panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[26rem] flex-col bg-paper xl:hidden"
      >
        <div class="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-stone-300 px-4 sm:px-6">
          <Wordmark />
          <button ref="closeBtn" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-stone" aria-label="Close menu" @click="close">
            <X :size="24" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" class="flex-1 overflow-y-auto px-4 pb-8 pt-2 sm:px-6">
          <ul class="divide-y divide-stone-300 text-lg font-semibold text-ink">
            <li><NuxtLink to="/" class="block py-4">Home</NuxtLink></li>
            <li>
              <details class="group">
                <summary class="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                  Services
                  <ChevronDown :size="20" aria-hidden="true" class="chev transition-transform" />
                </summary>
                <div class="space-y-1 pb-4">
                  <NuxtLink to="/services" class="block py-2 text-base text-bronze-dark">All services</NuxtLink>
                  <details v-for="g in groups" :key="g.id" class="group/sub rounded bg-stone-50">
                    <summary class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-base [&::-webkit-details-marker]:hidden">
                      {{ g.name }}
                      <ChevronDown :size="18" aria-hidden="true" class="chev transition-transform" />
                    </summary>
                    <ul class="px-4 pb-3">
                      <li v-for="s in [...g.items, ...g.extras]" :key="s.to">
                        <NuxtLink :to="s.to" class="block py-2 text-base font-medium text-body">{{ s.label }}</NuxtLink>
                      </li>
                    </ul>
                  </details>
                </div>
              </details>
            </li>
            <li v-for="l in links.slice(1)" :key="l.to"><NuxtLink :to="l.to" class="block py-4">{{ l.label }}</NuxtLink></li>
            <li v-for="l in secondary" :key="l.to"><NuxtLink :to="l.to" class="block py-4 text-base font-medium text-body">{{ l.label }}</NuxtLink></li>
          </ul>

          <div class="mt-6 space-y-3">
            <AppButton :to="estimatePath" block size="lg" track="estimate_cta_click" track-label="mobile_menu">Get a Free Estimate</AppButton>
            <AppButton v-if="company.phone" :href="`tel:${company.phone}`" variant="outline" block size="lg" track="phone_click">
              <Phone :size="18" aria-hidden="true" /> {{ formatPhone(company.phone) }}
            </AppButton>
          </div>
          <div class="mt-8 space-y-3 text-sm text-muted">
            <LicenseTag />
            <div class="flex flex-wrap gap-x-6 gap-y-2">
              <a v-if="company.social.instagram" :href="company.social.instagram" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-semibold text-ink">
                <Instagram :size="16" aria-hidden="true" /> Instagram<span class="sr-only"> (opens in a new tab)</span>
              </a>
              <a v-if="company.social.facebook" :href="company.social.facebook" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-semibold text-ink">
                <Facebook :size="16" aria-hidden="true" /> Facebook<span class="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
