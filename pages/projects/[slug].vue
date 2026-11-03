<script setup lang="ts">
import { getProject, categoryName } from '~/data/projects'
import { getService } from '~/data/services'
import { estimatePath } from '~/data/navigation'
import type { Project, Service } from '~/types'

const route = useRoute()
const found = getProject(String(route.params.slug))
if (!found) throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
const project = found as Project

const services = project.services.map(getService).filter((s): s is Service => Boolean(s))
const path = `/projects/${project.slug}`
const crumbs = [{ name: 'Our Projects', path: '/projects' }, { name: project.title, path }]
const title = `${project.title}${project.location ? ` in ${project.location}` : ''}`

usePageSeo({ title, description: project.summary, path, image: project.cover.src })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description: project.summary }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs])
])
</script>

<template>
  <div>
    <PageHeader :crumbs="crumbs" :kicker="categoryName(project.category)" :title="project.title" :lead="project.summary">
      <dl class="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
        <div v-if="project.propertyType"><dt class="text-muted">Property</dt><dd class="font-semibold text-ink">{{ project.propertyType }}</dd></div>
        <div v-if="project.location"><dt class="text-muted">Location</dt><dd class="font-semibold text-ink">{{ project.location }}</dd></div>
        <div v-if="services.length"><dt class="text-muted">Services</dt><dd class="font-semibold text-ink">{{ services.map((s) => s.shortName).join(', ') }}</dd></div>
      </dl>
    </PageHeader>

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="space-y-12 lg:col-span-8">
          <MediaFrame :image="project.cover" aspect="aspect-[16/10]" sizes="xs:100vw lg:66vw" priority />

          <div v-if="project.beforeAfter?.length">
            <h2 class="text-h3">Before and after</h2>
            <div class="mt-6 space-y-8">
              <BeforeAfter v-for="(pair, i) in project.beforeAfter" :id="`${project.slug}-${i}`" :key="i" :pair="pair" />
            </div>
          </div>

          <div v-if="project.description?.length">
            <h2 class="text-h3">Work summary</h2>
            <div class="mt-4"><RichParagraphs :paragraphs="project.description" /></div>
          </div>

          <div v-if="project.challenges?.length">
            <h2 class="text-h3">Challenges and solutions</h2>
            <dl class="mt-4 space-y-5">
              <div v-for="c in project.challenges" :key="c.challenge" class="border-l-2 border-bronze pl-5">
                <dt class="font-semibold text-ink">{{ c.challenge }}</dt>
                <dd class="mt-1 text-muted">{{ c.solution }}</dd>
              </div>
            </dl>
          </div>

          <div v-if="project.gallery.length">
            <h2 class="text-h3">Photos</h2>
            <div class="mt-6"><ProjectGallery :images="project.gallery" /></div>
          </div>
        </div>

        <aside class="space-y-8 lg:col-span-4">
          <div v-if="project.materials?.length" class="rounded border border-stone-300 p-6">
            <h2 class="font-bold text-ink">Materials and techniques</h2>
            <ul class="mt-3 space-y-2 text-[0.9375rem]">
              <li v-for="m in project.materials" :key="m">{{ m }}</li>
            </ul>
          </div>
          <div v-if="services.length" class="rounded border border-stone-300 p-6">
            <h2 class="font-bold text-ink">Related services</h2>
            <ul class="mt-3 space-y-2">
              <li v-for="s in services" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="rounded bg-ink p-6 text-stone">
            <p class="font-bold text-paper">Planning something similar?</p>
            <AppButton :to="services[0] ? `${estimatePath}?service=${services[0].slug}` : estimatePath" class="mt-4" block track="estimate_cta_click" track-label="project_detail">
              Request a similar project
            </AppButton>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
