<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: is404.value ? 'Page not found | True Arm Construction' : 'Something went wrong | True Arm Construction',
  meta: [{ name: 'robots', content: 'noindex' }]
})

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Free estimate', to: '/free-estimate' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <NuxtLayout>
    <section class="relative overflow-hidden bg-stone-50">
      <div class="graph-paper absolute inset-0" aria-hidden="true" />
      <div class="wrap relative py-24 sm:py-32">
        <p class="text-sm font-semibold text-bronze-dark">Error {{ error.statusCode }}</p>
        <h1 class="mt-3 max-w-2xl text-h1">
          {{ is404 ? 'This page is not on the plans.' : 'Something went wrong on our side.' }}
        </h1>
        <p class="mt-5 max-w-prose text-lead text-muted">
          {{ is404 ? 'The page may have moved, or the address may be mistyped. Try one of these instead.' : 'Please try again in a moment, or go back to the home page.' }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton @click="clearError({ redirect: '/' })">Go to the home page</AppButton>
        </div>
        <ul v-if="is404" class="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="l.to" class="font-semibold text-ink underline decoration-bronze underline-offset-4" @click="clearError()">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </NuxtLayout>
</template>
