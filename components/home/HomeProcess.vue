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
  <section class="section on-dark relative isolate overflow-hidden bg-ink text-stone" aria-labelledby="process-heading">
    <!-- Plans on a desk, faded into the forest: the "drawing" this process starts from (licensed stock) -->
    <NuxtImg
      format="webp"
      src="/images/stock/process-plans.jpg"
      alt=""
      aria-hidden="true"
      sizes="xs:100vw lg:60vw"
      loading="lazy"
      class="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover opacity-25 lg:w-3/5"
    />
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" aria-hidden="true" />
    <div class="graph-paper-dark absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

    <div class="wrap">
      <div v-reveal class="max-w-2xl">
        <h2 id="process-heading" class="text-h2 text-paper">How we work</h2>
        <p class="mt-4 text-lead text-stone/75">A clear sequence from first conversation to final walkthrough.</p>
      </div>
      <ol class="mt-16 grid gap-y-12 md:grid-cols-5 md:gap-x-6">
        <li v-for="(s, i) in steps" :key="s.title" v-reveal="{ delay: i * 110 }" class="relative pl-16 md:pl-0">
          <div class="absolute left-0 top-0 md:static md:flex md:items-end md:gap-3">
            <span class="block font-display text-5xl font-extrabold leading-none text-bronze-light [font-stretch:72%] md:text-6xl">{{ String(i + 1).padStart(2, '0') }}</span>
            <span v-if="i < steps.length - 1" class="dim-line mb-3 hidden flex-1 text-stone/25 md:block" aria-hidden="true" />
          </div>
          <h3 class="text-lg font-bold text-paper md:mt-6">{{ s.title }}</h3>
          <p class="mt-2 text-[0.9375rem] text-stone/70">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
