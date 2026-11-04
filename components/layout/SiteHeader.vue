<script setup lang="ts">
import { ChevronDown, Menu, Instagram, Facebook, Phone } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { serviceGroups, servicesByGroup } from '~/data/services'
import { estimatePath } from '~/data/navigation'

const route = useRoute()
const { track } = useAnalytics()
const megaOpen = ref(false)
const drawerOpen = ref(false)
const megaRoot = ref<HTMLElement | null>(null)
const megaButton = ref<HTMLButtonElement | null>(null)

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About Us', to: '/about' },
  { label: 'Resources / FAQ', to: '/resources' },
  { label: 'Contact', to: '/contact' }
]

const groups = computed(() =>
  serviceGroups.map((g) => ({
    ...g,
    items: servicesByGroup(g.id).map((s) => ({ label: s.shortName, to: `/services/${s.slug}` })),
    extras: [] as { label: string; to: string }[]
  }))
)

watch(() => route.fullPath, () => {
  megaOpen.value = false
  drawerOpen.value = false
})

function onDocClick(e: MouseEvent) {
  if (megaOpen.value && megaRoot.value && !megaRoot.value.contains(e.target as Node)) megaOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && megaOpen.value) {
    megaOpen.value = false
    megaButton.value?.focus()
  }
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header class="sticky top-0 z-40">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-bronze focus:px-4 focus:py-2 focus:font-semibold focus:text-white">
      Skip to content
    </a>

    <!-- Utility bar (desktop) -->
    <div class="hidden bg-deep text-[0.8125rem] text-stone/75 xl:block">
      <div class="wrap flex h-9 items-center justify-between">
        <p class="flex items-center gap-5">
          <a
            v-if="company.phone"
            :href="`tel:${company.phone}`"
            class="inline-flex items-center gap-1.5 font-semibold text-paper hover:text-bronze-light"
            @click="track('phone_click', { label: 'utility_bar' })"
          >
            <Phone :size="14" aria-hidden="true" /><span class="sr-only">Call </span>{{ formatPhone(company.phone) }}
          </a>
          <span v-if="company.phone" class="h-3 w-px bg-stone/20" aria-hidden="true" />
          <span>Serving {{ company.primaryArea.city }}, {{ company.primaryArea.regionCode }}</span>
          <span class="h-3 w-px bg-stone/20" aria-hidden="true" />
          <span>CA License #{{ company.license.number }}, Class {{ company.license.classification }}</span>
        </p>
        <nav aria-label="Secondary" class="flex items-center gap-6">
          <NuxtLink to="/licenses-certifications" class="hover:text-paper">Licenses &amp; Certifications</NuxtLink>
          <NuxtLink to="/service-areas" class="hover:text-paper">Service Areas</NuxtLink>
          <a v-if="company.social.instagram" :href="company.social.instagram" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 hover:text-paper">
            <Instagram :size="15" aria-hidden="true" /> Instagram<span class="sr-only"> (opens in a new tab)</span>
          </a>
          <a v-if="company.social.facebook" :href="company.social.facebook" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 hover:text-paper">
            <Facebook :size="15" aria-hidden="true" /> Facebook<span class="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </div>

    <!-- Main bar -->
    <div class="border-b border-stone-300/80 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div class="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <NuxtLink to="/" class="shrink-0" aria-label="True Arm Construction, home">
          <Wordmark />
        </NuxtLink>

        <nav aria-label="Primary" class="hidden xl:block">
          <ul class="flex items-center gap-7 text-[0.9375rem] font-semibold text-ink">
            <li>
              <NuxtLink to="/" class="py-2 hover:text-bronze-dark" :class="isActive('/') ? 'text-bronze-dark' : ''">Home</NuxtLink>
            </li>
            <li ref="megaRoot" class="relative">
              <button
                ref="megaButton"
                type="button"
                class="inline-flex items-center gap-1 py-2 hover:text-bronze-dark"
                :class="isActive('/services') ? 'text-bronze-dark' : ''"
                :aria-expanded="megaOpen"
                aria-controls="mega-services"
                @click="megaOpen = !megaOpen"
              >
                Services
                <ChevronDown :size="16" aria-hidden="true" class="transition-transform" :class="megaOpen ? 'rotate-180' : ''" />
              </button>
            </li>
            <li v-for="l in mainLinks.slice(1)" :key="l.to">
              <NuxtLink :to="l.to" class="py-2 hover:text-bronze-dark" :class="isActive(l.to) ? 'text-bronze-dark' : ''">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          <AppButton :to="estimatePath" class="hidden sm:inline-flex" track="estimate_cta_click" track-label="header">
            Get a Free Estimate
          </AppButton>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded text-ink hover:bg-stone xl:hidden"
            aria-label="Open menu"
            :aria-expanded="drawerOpen"
            aria-controls="mobile-nav"
            @click="drawerOpen = true"
          >
            <Menu :size="24" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Mega menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-show="megaOpen"
          id="mega-services"
          class="absolute inset-x-0 top-full hidden border-b border-stone-300 bg-paper shadow-[0_24px_48px_-24px_rgb(16_23_25/0.25)] xl:block"
          @click.stop
        >
          <div class="wrap grid grid-cols-12 gap-8 py-10">
            <div class="col-span-9 grid grid-cols-4 gap-8">
              <div v-for="g in groups" :key="g.id">
                <p class="text-sm font-bold text-ink">{{ g.name }}</p>
                <p class="mt-1 min-h-[2.6em] text-[0.8125rem] leading-snug text-muted">{{ g.description }}</p>
                <ul class="mt-4 space-y-2.5 border-t border-stone-300 pt-4">
                  <li v-for="s in [...g.items, ...g.extras]" :key="s.to">
                    <NuxtLink :to="s.to" class="text-[0.9375rem] font-medium text-body hover:text-bronze-dark">{{ s.label }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-3 rounded bg-ink p-6 text-stone">
              <p class="text-lg font-bold text-paper">Not sure which service fits?</p>
              <p class="mt-2 text-sm text-stone/75">Answer one or two questions and we will point you to the right page.</p>
              <div class="mt-5 flex flex-col gap-3">
                <AppButton to="/services#navigator" size="md">Find my service</AppButton>
                <NuxtLink to="/services" class="text-sm font-semibold text-paper underline decoration-bronze underline-offset-4">View all services</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <MobileNav v-model:open="drawerOpen" :groups="groups" :links="mainLinks" />
  </header>
</template>
