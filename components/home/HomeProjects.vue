<script setup lang="ts">
import { Instagram } from 'lucide-vue-next'
import { publishedProjects } from '~/data/projects'
import { company } from '~/data/company'

const featured = computed(() => {
  const f = publishedProjects.filter((p) => p.featured)
  return (f.length ? f : publishedProjects).slice(0, 3)
})
</script>

<template>
  <!-- Real projects only. Until the portfolio is published, point to recent work on Instagram instead of empty frames. -->
  <section v-if="featured.length" class="section" aria-labelledby="projects-heading">
    <div class="wrap">
      <div v-reveal class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <h2 id="projects-heading" class="text-h2">Featured projects</h2>
          <p class="mt-4 text-lead text-muted">Real work from real properties, with the scope and services behind each one.</p>
        </div>
        <AppButton to="/projects" variant="outline">View all projects</AppButton>
      </div>
      <div class="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="(p, i) in featured" :key="p.slug" v-reveal="{ delay: i * 100 }" :project="p" />
      </div>
    </div>
  </section>

  <section v-else-if="company.social.instagram" class="py-14 sm:py-16" aria-labelledby="projects-heading">
    <div class="wrap">
      <div v-reveal class="flex flex-col items-start justify-between gap-6 border-y border-ink/15 py-10 md:flex-row md:items-center">
        <div class="max-w-2xl">
          <h2 id="projects-heading" class="text-h2">Recent work</h2>
          <p class="mt-3 text-lead text-muted">Our project portfolio is being prepared. In the meantime, see recent jobs on Instagram.</p>
        </div>
        <AppButton :href="company.social.instagram" variant="dark" size="lg">
          <Instagram :size="20" aria-hidden="true" /> Follow on Instagram
        </AppButton>
      </div>
    </div>
  </section>
</template>
