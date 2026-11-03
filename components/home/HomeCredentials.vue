<script setup lang="ts">
import { publishedCredentials } from '~/data/credentials'
</script>

<template>
  <section class="section bg-stone-50" aria-labelledby="cred-heading">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-5">
        <h2 id="cred-heading" class="text-h2">Licensed by the State of California</h2>
        <p class="mt-5 text-lead text-muted">
          A Class B General Building Contractor license covers projects that involve two or more building trades, such as remodels and room additions.
          We publish our license number so you can check it yourself.
        </p>
        <div class="mt-8">
          <AppButton to="/licenses-certifications" variant="outline">Licenses &amp; certifications</AppButton>
        </div>
      </div>
      <div class="space-y-4 lg:col-span-6 lg:col-start-7">
        <LicenseCard />
        <p v-if="publishedCredentials.length" class="text-sm text-muted">
          Plus {{ publishedCredentials.length }} additional credential{{ publishedCredentials.length > 1 ? 's' : '' }}.
          <NuxtLink to="/licenses-certifications" class="font-semibold text-ink underline decoration-bronze underline-offset-4">See all</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
