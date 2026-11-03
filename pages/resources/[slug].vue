<script setup lang="ts">
import { getResource } from '~/data/resources'
import { getService } from '~/data/services'
import type { ResourceArticle, Service } from '~/types'

const route = useRoute()
const found = getResource(String(route.params.slug))
if (!found) throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true })
const article = found as ResourceArticle

const path = `/resources/${article.slug}`
const crumbs = [{ name: 'Resources', path: '/resources' }, { name: article.title, path }]
const related = article.relatedServices.map(getService).filter((s): s is Service => Boolean(s))

usePageSeo({ title: article.title, description: article.description, path, type: 'article' })
useJsonLd([
  organizationSchema(),
  articleSchema(article),
  breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs])
])

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <div>
    <PageHeader :crumbs="crumbs" :title="article.title" :lead="article.description">
      <p class="mt-6 text-sm text-muted">
        <time :datetime="article.publishedOn">{{ fmt(article.publishedOn) }}</time>, {{ article.readingMinutes }} min read
      </p>
    </PageHeader>

    <section class="section">
      <div class="wrap grid gap-12 lg:grid-cols-12">
        <article class="rich max-w-prose text-[1.0625rem] lg:col-span-7">
          <template v-for="(block, i) in article.body" :key="i">
            <h2 v-if="block.heading">{{ block.heading }}</h2>
            <p v-for="(p, j) in block.paragraphs ?? []" :key="`p${j}`">{{ p }}</p>
            <ul v-if="block.list?.length">
              <li v-for="li in block.list" :key="li">{{ li }}</li>
            </ul>
          </template>
          <div class="mt-10">
            <AppButton to="/free-estimate" track="estimate_cta_click" :track-label="`guide_${article.slug}`">Start your project planner</AppButton>
          </div>
        </article>
        <aside class="lg:col-span-4 lg:col-start-9">
          <div class="rounded border border-stone-300 p-6 lg:sticky lg:top-[calc(var(--header-h)+3.5rem)]">
            <h2 class="font-bold text-ink">Related services</h2>
            <ul class="mt-3 space-y-2">
              <li v-for="s in related" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4">{{ s.name }}</NuxtLink>
              </li>
            </ul>
            <p class="mt-6 border-t border-stone-300 pt-5 text-sm text-muted">
              This guide is general information, not legal or permit advice. Requirements depend on your property and jurisdiction.
            </p>
          </div>
        </aside>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
