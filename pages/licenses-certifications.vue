<script setup lang="ts">
import { ExternalLink, FileText } from 'lucide-vue-next'
import { company } from '~/data/company'
import { publishedCredentials } from '~/data/credentials'

const title = 'Licenses & Certifications | True Arm Construction'
const description = `True Arm Construction holds California contractor license #${company.license.number}, Class ${company.license.classification} General Building Contractor. Verify it on the CSLB website.`
const path = '/licenses-certifications'
usePageSeo({ title, description, path, absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Licenses & Certifications', path }])
])

const fmt = (d?: string) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '')
</script>

<template>
  <div>
    <PageHeader
      :crumbs="[{ name: 'Licenses & Certifications', path }]"
      title="Licenses and certifications"
      lead="Hiring a licensed contractor protects you. Here is the information you need to check our credentials yourself."
    />

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <h2 class="text-h2">California contractor license</h2>
          <div class="rich mt-6">
            <p>
              In California, contractors are licensed by the Contractors State License Board (CSLB). True Arm Construction holds
              license #{{ company.license.number }} in Class {{ company.license.classification }}, {{ company.license.classificationName }}.
            </p>
            <p>
              A Class B license allows a contractor to take on projects that involve two or more unrelated building trades, which is typical
              for remodels and room additions. Some specialty work, depending on scope, may require a specialty-licensed contractor.
            </p>
            <p>
              The CSLB website shows each license’s current status, business details, bond information, and workers’ compensation
              status. We encourage you to check it for any contractor you consider hiring.
            </p>
          </div>
        </div>
        <div class="lg:col-span-5 lg:col-start-8">
          <LicenseCard />
        </div>
      </div>
    </section>

    <section class="section bg-stone-50" aria-labelledby="certs-heading">
      <div class="wrap">
        <h2 id="certs-heading" class="text-h2">Additional certifications</h2>
        <div v-if="publishedCredentials.length" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="c in publishedCredentials" :key="c.id" class="flex flex-col rounded border border-stone-300 bg-white">
            <MediaFrame v-if="c.image" :image="c.image" aspect="aspect-[4/3]" :rounded="false" />
            <div class="flex flex-1 flex-col p-6">
              <p class="text-sm font-semibold text-bronze-dark">{{ c.issuer }}</p>
              <h3 class="mt-1 text-lg font-bold text-ink">{{ c.name }}</h3>
              <p class="mt-2 text-[0.9375rem] text-muted">{{ c.description }}</p>
              <dl class="mt-4 space-y-1 text-sm">
                <div v-if="c.credentialNumber" class="flex gap-2"><dt class="text-muted">Number:</dt><dd class="font-semibold">{{ c.credentialNumber }}</dd></div>
                <div v-if="c.issuedOn" class="flex gap-2"><dt class="text-muted">Issued:</dt><dd class="font-semibold">{{ fmt(c.issuedOn) }}</dd></div>
                <div v-if="c.expiresOn" class="flex gap-2"><dt class="text-muted">Expires:</dt><dd class="font-semibold">{{ fmt(c.expiresOn) }}</dd></div>
                <div class="flex gap-2"><dt class="text-muted">Status:</dt><dd class="font-semibold">{{ c.status === 'confirmed' ? 'Verified' : 'Verification pending' }}</dd></div>
              </dl>
              <div class="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-semibold">
                <a v-if="c.pdf" :href="c.pdf" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 underline decoration-bronze underline-offset-4"><FileText :size="16" aria-hidden="true" />View certificate (PDF)</a>
                <a v-if="c.verifyUrl" :href="c.verifyUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 underline decoration-bronze underline-offset-4"><ExternalLink :size="16" aria-hidden="true" />Verify with issuer</a>
              </div>
            </div>
          </article>
        </div>
        <p v-else class="mt-6 max-w-prose text-muted">
          Additional certificates and professional credentials will be listed here, with issuer details, once they have been verified.
        </p>
      </div>
    </section>

    <section class="section" aria-labelledby="check-heading">
      <div class="wrap max-w-3xl">
        <h2 id="check-heading" class="text-h2">How to check a contractor’s license</h2>
        <ol class="mt-8 space-y-5">
          <li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">1</span><span class="pt-1">Go to the CSLB license lookup at <a href="https://www.cslb.ca.gov/" target="_blank" rel="noopener" class="font-semibold underline decoration-bronze underline-offset-4">cslb.ca.gov</a>.</span></li>
          <li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">2</span><span class="pt-1">Search by license number, business name, or personnel name.</span></li>
          <li class="flex gap-4"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">3</span><span class="pt-1">Check the license status, classifications, bond, and workers’ compensation information.</span></li>
        </ol>
      </div>
    </section>

    <CtaBand title="Ready to discuss your project?" />
  </div>
</template>
