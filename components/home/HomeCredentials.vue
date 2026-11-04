<script setup lang="ts">
import { publishedCredentials } from '~/data/credentials'
</script>

<template>
  <section class="section bg-stone-50" aria-labelledby="cred-heading">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
      <div v-reveal class="lg:col-span-5">
        <h2 id="cred-heading" class="text-h2">Licensed and certified</h2>
        <p class="mt-5 text-lead text-muted">
          A Class B General Building Contractor license covers projects that involve two or more building trades, such as remodels and room additions.
          We publish our license number so you can check it yourself.
          <template v-if="publishedCredentials.some((c) => c.id === 'epa-lead-safe')">
            We are also an EPA Lead-Safe Certified Firm, required for work that disturbs paint in homes built before 1978.
          </template>
        </p>
        <div class="mt-8">
          <AppButton to="/licenses-certifications" variant="outline">Licenses &amp; certifications</AppButton>
        </div>
      </div>
      <div v-reveal="{ delay: 150 }" class="space-y-4 lg:col-span-6 lg:col-start-7">
        <LicenseCard />
        <CredentialBadge v-for="c in publishedCredentials" :key="c.id" :credential="c" />
      </div>
    </div>
  </section>
</template>
