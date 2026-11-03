<script setup lang="ts">
import { company } from '~/data/company'

const title = 'Privacy Policy | True Arm Construction'
const description = 'How True Arm Construction collects, uses, and protects information submitted through this website.'
const path = '/privacy-policy'
usePageSeo({ title, description, path, absoluteTitle: true })
useJsonLd([
  organizationSchema(),
  webPageSchema({ path, title, description }),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path }])
])

/** Update this date whenever the policy text changes. */
const updated = 'November 1, 2026'
</script>

<template>
  <div>
    <PageHeader :crumbs="[{ name: 'Privacy Policy', path }]" title="Privacy policy" :lead="`Last updated ${updated}`" />

    <section class="section">
      <!--
        TEMPLATE NOTICE: Have this policy reviewed by a qualified professional before launch,
        and update it if you add analytics, advertising tags, a CRM, or other data processors.
      -->
      <div class="wrap">
        <div class="rich max-w-prose">
          <p>This policy explains what information {{ company.legalName || company.name }} (“we”, “us”) collects through {{ company.domain }}, how we use it, and the choices you have.</p>

          <h2>Information you provide</h2>
          <p>When you use the project planner or contact form, you may give us your name, phone number, email address, property ZIP code, and details about your project. We use this information only to respond to your request, prepare an estimate, and communicate with you about your project.</p>

          <h2>How form submissions are delivered</h2>
          <p>Forms on this website are delivered through a third-party form service, which processes the submission on our behalf and forwards it to us. That service handles the data under its own privacy and security terms.</p>

          <h2>Analytics and advertising</h2>
          <p>We may use services such as Google Analytics and Google Ads to understand how visitors use the website and to measure whether our advertising works. These services may use cookies or similar technologies and collect information such as pages visited, device type, and approximate location. We do not send your name, phone number, email address, or message content to these services.</p>
          <p>You can limit this tracking through your browser settings, by using browser privacy controls, or with the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out add-on</a>.</p>

          <h2>Sharing</h2>
          <p>We do not sell your personal information. We share it only with service providers that help us operate this website and respond to you, or when required by law.</p>

          <h2>Retention</h2>
          <p>We keep inquiry information for as long as needed to respond, provide our services, and meet legal or business record-keeping requirements.</p>

          <h2>Your California privacy rights</h2>
          <p>Depending on applicable law, California residents may have rights to request access to, correction of, or deletion of their personal information. To make a request, contact us using the details on our <NuxtLink to="/contact">contact page</NuxtLink>.</p>

          <h2>Children</h2>
          <p>This website is intended for adults planning construction projects. We do not knowingly collect information from children.</p>

          <h2>Changes</h2>
          <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent through our <NuxtLink to="/contact">contact page</NuxtLink><template v-if="company.email"> or to <a :href="`mailto:${company.email}`">{{ company.email }}</a></template>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
