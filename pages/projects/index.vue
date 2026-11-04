<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { projectCategories, publishedProjects } from '~/data/projects'
import { workMedia, servicesWithWork, featuredWork } from '~/data/work'
import { getService } from '~/data/services'

const title = 'Project Photos & Videos | Sacramento'
const description =
  'Photos and videos of our remodeling, flooring, tile, painting, and fence work in Sacramento, CA. True Arm Construction, licensed Class B contractor.'
const path = '/projects'
// While no real projects are published, keep this page out of search results.
usePageSeo({ title, description, path, noindex: publishedProjects.length === 0 && workMedia.length === 0 })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Our Projects', path }])
])

const route = useRoute()
const router = useRouter()
const active = ref<string>(String(route.query.category || 'all'))
const query = ref('')

// Only show categories that actually have projects
const categories = computed(() => projectCategories.filter((c) => publishedProjects.some((p) => p.category === c.id)))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return publishedProjects.filter((p) => {
    const inCat = active.value === 'all' || p.category === active.value
    const inQuery = !q || [p.title, p.summary, p.location ?? ''].some((t) => t.toLowerCase().includes(q))
    return inCat && inQuery
  })
})

// Work gallery (photos and videos by service)
const workServices = computed(() => servicesWithWork().map((slug) => getService(slug)!).filter(Boolean))
const workFilter = ref<string>(String(route.query.service || 'all'))
const workItems = computed(() => (workFilter.value === 'all' ? featuredWork() : workMedia.filter((m) => m.service === workFilter.value)))
function setWorkFilter(id: string) {
  workFilter.value = id
  router.replace({ query: id === 'all' ? {} : { service: id } })
}

function setCategory(id: string) {
  active.value = id
  router.replace({ query: id === 'all' ? {} : { category: id } })
}
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Our Projects', path: '/projects' }]"
      title="Our projects"
      lead="Completed work from properties in the Sacramento area, with the services involved in each project."
    />

    <section class="section pt-10">
      <div class="wrap">
        <template v-if="publishedProjects.length">
          <div class="flex flex-col gap-4 border-b border-stone-300 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by category" class="flex flex-wrap gap-2">
              <button
                v-for="c in [{ id: 'all', name: 'All projects' }, ...categories]"
                :key="c.id"
                type="button"
                class="min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors"
                :class="active === c.id ? 'border-ink bg-ink text-paper' : 'border-stone-300 text-ink hover:border-ink'"
                :aria-pressed="active === c.id"
                @click="setCategory(c.id)"
              >{{ c.name }}</button>
            </div>
            <div class="relative w-full lg:w-72">
              <label for="project-search" class="sr-only">Search projects</label>
              <Search :size="18" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input id="project-search" v-model="query" type="search" class="field pl-10" placeholder="Search projects">
            </div>
          </div>
          <p class="mt-6 text-sm text-muted" aria-live="polite">{{ filtered.length }} project{{ filtered.length === 1 ? '' : 's' }}</p>
          <div v-if="filtered.length" class="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" heading-level="h2" />
          </div>
          <div v-else class="mt-8 rounded border border-dashed border-stone-400 p-10 text-center">
            <p class="font-semibold text-ink">No projects match these filters.</p>
            <button type="button" class="mt-3 font-semibold text-bronze-dark underline underline-offset-4" @click="query = ''; setCategory('all')">Show all projects</button>
          </div>
        </template>
        <ProjectsEmpty v-else-if="!workMedia.length" />
      </div>
    </section>

    <section v-if="workMedia.length" class="section" :class="publishedProjects.length ? 'bg-stone-50' : 'pt-0'" aria-labelledby="work-gallery-heading">
      <div class="wrap">
        <h2 id="work-gallery-heading" class="text-h2">Photos and videos of our work</h2>
        <div v-if="workServices.length > 1" role="group" aria-label="Filter by service" class="mt-8 flex flex-wrap gap-2">
          <button
            v-for="c in [{ slug: 'all', shortName: 'All work' }, ...workServices]"
            :key="c.slug"
            type="button"
            class="min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors"
            :class="workFilter === c.slug ? 'border-ink bg-ink text-paper' : 'border-stone-300 text-ink hover:border-ink'"
            :aria-pressed="workFilter === c.slug"
            @click="setWorkFilter(c.slug)"
          >{{ c.shortName }}</button>
        </div>
        <div class="mt-8"><WorkGallery :key="workFilter" :items="workItems" :initial="13" :show-service="workFilter === 'all'" /></div>
      </div>
    </section>

    <CtaBand title="Have a similar project in mind?" />
  </div>
</template>
