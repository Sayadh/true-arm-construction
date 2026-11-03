<script setup lang="ts">
import { serviceGroups, servicesByGroup } from '~/data/services'

const title = 'Construction & Remodeling Services in Sacramento, CA'
const description =
  'Kitchen and bathroom remodeling, room additions, flooring, tile, painting, fences and gates, and repairs in Sacramento, CA.'
const path = '/services'

const groups = serviceGroups
  .map((g) => ({ ...g, items: servicesByGroup(g.id) }))
  .filter((g) => g.items.length)

usePageSeo({ title, description, path })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path }])
])

/** Highlights the group currently in view in the sticky sub-navigation */
const sectionIds = [...groups.map((g) => g.id), 'navigator']
const active = ref('')
const { scrollToId } = useAnchorScroll()
const tabsEl = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length) {
        active.value = visible[0]!.target.id
        // keep the active tab visible on small screens (scroll the tab bar only, never the page)
        const bar = tabsEl.value
        const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active.value}"]`)
        if (bar && tab) bar.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' })
      }
    },
    // a thin band just below the sticky header + tab bar
    { rootMargin: '-30% 0px -65% 0px' }
  )
  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Services', path: '/services' }]"
      title="Construction and remodeling services"
      lead="Residential and commercial services in Sacramento, grouped by the kind of work. Not sure where your project fits? Use the service finder below."
    />

    <nav aria-label="Service groups" class="sticky top-[var(--header-offset)] z-30 border-b border-stone-300 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <ul ref="tabsEl" class="wrap flex gap-6 overflow-x-auto text-sm font-semibold text-ink [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li v-for="g in groups" :key="g.id" class="shrink-0">
          <a
            :href="`#${g.id}`"
            :data-tab="g.id"
            @click="scrollToId(g.id, $event)"
            class="relative inline-block py-4 transition-colors hover:text-bronze-dark"
            :class="active === g.id ? 'text-bronze-dark after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-bronze' : ''"
            :aria-current="active === g.id ? 'true' : undefined"
          >{{ g.name }}</a>
        </li>
        <li class="shrink-0">
          <a
            href="#navigator"
            data-tab="navigator"
            @click="scrollToId('navigator', $event)"
            class="relative inline-block py-4 text-bronze-dark hover:text-ink"
            :class="active === 'navigator' ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-bronze' : ''"
            :aria-current="active === 'navigator' ? 'true' : undefined"
          >Service finder</a>
        </li>
      </ul>
    </nav>

    <section v-for="(g, gi) in groups" :id="g.id" :key="g.id" class="scroll-mt-14 py-14 sm:py-20" :class="gi % 2 ? 'bg-stone-50' : ''">
      <div class="wrap">
        <div class="grid gap-4 border-b border-stone-300 pb-6 md:grid-cols-12 md:items-end">
          <h2 class="text-h2 md:col-span-7">{{ g.name }}</h2>
          <p class="text-muted md:col-span-5">{{ g.description }}</p>
        </div>
        <div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="s in g.items" :key="s.slug" :service="s" />
        </div>
      </div>
    </section>

    <section id="navigator" class="section scroll-mt-14 border-t border-stone-300" aria-labelledby="finder-heading">
      <div class="wrap">
        <div class="max-w-2xl">
          <h2 id="finder-heading" class="text-h2">Find the right service</h2>
          <p class="mt-4 text-lead text-muted">Choose what you are planning. If a project spans several services, start with the main one and mention the rest in your request.</p>
        </div>
        <div class="mt-10"><ProjectNavigator :show-all-link="false" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
