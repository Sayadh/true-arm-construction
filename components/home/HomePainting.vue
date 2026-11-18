<script setup lang="ts">
import { ArrowUpRight, BadgeCheck } from 'lucide-vue-next'
import { paintingHub } from '~/data/painting'
import { getService } from '~/data/services'
import { workMedia, coverImage } from '~/data/work'
import { publishedCredentials } from '~/data/credentials'

/**
 * Painting spotlight, directly under the hero: painting is the lead service line (client decision, 2026-11).
 * Photos are real True Arm jobs only (picked by work media id); a missing id is simply skipped.
 */
const services = paintingHub.services.map((slug) => getService(slug)).filter((s) => !!s && s.enabled)

const photoIds = [
  'exterior-painting-board-and-batten-siding-painted',
  'interior-painting-staircase-walls-trim',
  'kitchen-remodeling-painted-kitchen-cabinets'
]
const photos = photoIds
  .map((id) => workMedia.find((m) => m.id === id))
  .filter((m) => !!m)
  .map((m) => ({ id: m!.id, image: coverImage(m!), caption: m!.caption }))

const epa = publishedCredentials.find((c) => c.id === 'epa-lead-safe')
</script>

<template>
  <section class="section" aria-labelledby="home-painting-heading">
    <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div v-reveal class="lg:col-span-5">
        <h2 id="home-painting-heading" class="text-h2">Painting, inside and out</h2>
        <p class="mt-4 text-lead text-muted">
          Walls, ceilings, trim, siding, cabinets, and fences. Every job starts with preparation and protection, and
          ends with a walkthrough of the finished work.
        </p>

        <ul class="mt-8 divide-y divide-stone-300 border-y border-stone-300">
          <li v-for="s in services" :key="s!.slug">
            <NuxtLink :to="`/services/${s!.slug}`" class="group flex items-center gap-4 py-3.5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                <AppIcon :name="s!.icon" :size="20" />
              </span>
              <span class="flex-1 text-[1.0625rem] font-semibold text-ink group-hover:text-bronze-dark">{{ s!.name }}</span>
              <ArrowUpRight :size="18" class="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze-dark" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink v-if="epa" to="/licenses-certifications" class="mt-6 flex items-start gap-3 rounded-md bg-stone-50 p-4 text-[0.9375rem] hover:bg-stone">
          <BadgeCheck :size="22" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />
          <span><strong class="text-ink">EPA Lead-Safe Certified Firm.</strong> Homes built before 1978 are prepared and painted with lead-safe work practices.</span>
        </NuxtLink>

        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton :to="`${paintingHub.path}#quote`" track="estimate_cta_click" track-label="home_painting">Get a Free Painting Estimate</AppButton>
          <AppButton :to="paintingHub.path" variant="outline">Painting services</AppButton>
        </div>
      </div>

      <div v-if="photos.length" class="lg:col-span-7">
        <div class="grid grid-cols-2 gap-3 sm:gap-4">
          <figure v-for="(p, i) in photos" :key="p.id" v-reveal class="relative overflow-hidden rounded" :class="i === 0 ? 'row-span-2' : ''">
            <MediaFrame :image="p.image" :aspect="i === 0 ? 'aspect-[3/5] h-full' : 'aspect-[4/3.6]'" :rounded="false" sizes="xs:50vw lg:30vw" />
            <figcaption v-if="p.caption" class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-3 pb-3 pt-10 text-[0.8125rem] font-semibold leading-snug text-paper sm:px-4">
              {{ p.caption }}
            </figcaption>
          </figure>
        </div>
        <p class="mt-3 text-sm text-muted">Photos from our own painting jobs in the Sacramento area.</p>
      </div>
    </div>
  </section>
</template>
