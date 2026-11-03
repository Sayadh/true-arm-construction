<script setup lang="ts">
import { publishedProjects } from '~/data/projects'

const featured = computed(() => {
  const f = publishedProjects.filter((p) => p.featured)
  return (f.length ? f : publishedProjects).slice(0, 3)
})
</script>

<template>
  <section class="section" aria-labelledby="projects-heading">
    <div class="wrap">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <h2 id="projects-heading" class="text-h2">Featured projects</h2>
          <p class="mt-4 text-lead text-muted">Real work from real properties, with the scope and services behind each one.</p>
        </div>
        <AppButton v-if="featured.length" to="/projects" variant="outline">View all projects</AppButton>
      </div>
      <div class="mt-12">
        <div v-if="featured.length" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in featured" :key="p.slug" :project="p" />
        </div>
        <ProjectsEmpty v-else />
      </div>
    </div>
  </section>
</template>
