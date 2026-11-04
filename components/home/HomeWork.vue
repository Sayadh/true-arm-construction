<script setup lang="ts">
import { featuredWork, workMedia } from '~/data/work'

const items = featuredWork(5)
</script>

<template>
  <!-- Real photos and videos only: hidden until work media is imported. -->
  <section v-if="items.length" class="section" aria-labelledby="work-home-heading">
    <div class="wrap">
      <div v-reveal class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <h2 id="work-home-heading" class="text-h2">Our recent work</h2>
          <p class="mt-4 text-lead text-muted">Photos and videos from our own projects in the Sacramento area.</p>
        </div>
        <AppButton to="/projects" variant="outline">See all {{ workMedia.length }} photos &amp; videos</AppButton>
      </div>
      <div v-reveal="{ delay: 100 }" class="mt-10"><WorkGallery :items="items" show-service /></div>
    </div>
  </section>
</template>
