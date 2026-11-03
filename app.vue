<script setup lang="ts">
import { company } from '~/data/company'

const config = useRuntimeConfig().public

useHead({
  titleTemplate: (t) => t || company.name,
  meta: config.googleSiteVerification
    ? [{ name: 'google-site-verification', content: String(config.googleSiteVerification) }]
    : []
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
