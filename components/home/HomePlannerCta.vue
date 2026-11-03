<script setup lang="ts">
import { estimatePath } from '~/data/navigation'

const steps = ['Choose a service', 'Property details', 'Project details', 'Preferred timeline', 'Contact information']
</script>

<template>
  <section class="section" aria-labelledby="planner-heading">
    <div class="wrap">
      <div v-reveal class="grid overflow-hidden rounded-lg border border-stone-300 bg-white shadow-[0_30px_70px_-40px_rgba(30,58,48,0.35)] lg:grid-cols-2">
        <div class="p-8 sm:p-12">
          <h2 id="planner-heading" class="text-h2">Let’s plan your next project.</h2>
          <p class="mt-5 text-lead text-muted">
            The project planner asks a few short questions so we can understand your project before we follow up.
            It takes a couple of minutes, and you can skip anything you do not know yet.
          </p>
          <div class="mt-8">
            <AppButton :to="estimatePath" size="lg" track="planner_start" track-label="home_cta">Start Your Project</AppButton>
          </div>
        </div>
        <div class="graph-paper border-t border-stone-300 bg-stone-50 p-8 sm:p-12 lg:border-l lg:border-t-0">
          <ol class="space-y-0">
            <li v-for="(s, i) in steps" :key="s" class="flex items-center gap-4 border-b border-stone-300 py-4 last:border-0">
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">{{ i + 1 }}</span>
              <span class="font-semibold text-ink">{{ s }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
