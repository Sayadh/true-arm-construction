<script setup lang="ts">
const steps = [
  { title: 'Tell us about your project', text: 'Share what you want to build or change, using the project planner or a direct message.' },
  { title: 'Discuss scope and requirements', text: 'We talk through goals, the property, and practical considerations such as permits.' },
  { title: 'Receive an estimate', text: 'You get a free estimate based on your specific scope, with the assumptions explained.' },
  { title: 'Plan the work', text: 'Materials, sequence, and scheduling are settled before work begins.' },
  { title: 'Construction and completion', text: 'The work is carried out, and we finish with a walkthrough together.' }
]
</script>

<template>
  <section class="section on-dark bg-ink text-stone" aria-labelledby="process-heading">
    <div class="wrap">
      <div class="max-w-2xl">
        <h2 id="process-heading" class="text-h2 text-paper">How we work</h2>
        <p class="mt-4 text-lead text-stone/75">A clear sequence from first conversation to final walkthrough.</p>
      </div>
      <ol class="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
        <li v-for="(s, i) in steps" :key="s.title" class="relative">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bronze text-sm font-bold text-bronze-light">{{ i + 1 }}</span>
            <span v-if="i < steps.length - 1" class="dim-line hidden flex-1 text-stone/25 md:block" aria-hidden="true" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-paper">{{ s.title }}</h3>
          <p class="mt-2 text-[0.9375rem] text-stone/70">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
