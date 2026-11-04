<script setup lang="ts">
import { ArrowLeft, ArrowRight, Check, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-vue-next'
import { plannerQuestions, plannerServiceOptions, timelineOptions } from '~/data/planner'
import { company, formatPhone } from '~/data/company'
import { getService } from '~/data/services'

const route = useRoute()
const { track } = useAnalytics()
const { state, message, isConfigured, submit } = useFormSubmit()

const steps = ['Service', 'Property', 'Details', 'Timeline', 'Contact'] as const
const step = ref(0)
const started = ref(false)
const startedAt = ref(0)
const stepHeading = ref<HTMLElement | null>(null)

const form = reactive({
  service: '',
  propertyType: '' as '' | 'Residential' | 'Commercial',
  zip: '',
  description: '',
  details: {} as Record<string, string>,
  timeline: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
  consent: false,
  _gotcha: ''
})
const errors = reactive<Record<string, string>>({})

onMounted(() => {
  startedAt.value = Date.now()
  const q = String(route.query.service || '')
  if (plannerServiceOptions.some((o) => o.slug === q)) form.service = q
  // optional prefilled notes, e.g. the handyman "Build your list" block
  const notes = route.query.notes
  if (typeof notes === 'string' && notes.trim()) form.notes = notes.trim().slice(0, 2000)
})

const questions = computed(() => plannerQuestions[form.service] ?? [])
const serviceLabel = computed(() => plannerServiceOptions.find((o) => o.slug === form.service)?.label ?? '')
const zipOutside = computed(() => isZip(form.zip) && !isSacramentoRegionZip(form.zip))

function markStarted() {
  if (!started.value) {
    started.value = true
    track('planner_start')
  }
}

watch(() => form.service, (v, old) => {
  if (v) markStarted()
  if (old && v !== old) form.details = {}
})

function clearErrors() {
  Object.keys(errors).forEach((k) => delete errors[k])
}

function validate(i: number): boolean {
  clearErrors()
  if (i === 0 && !form.service) errors.service = 'Choose the service that best matches your project.'
  if (i === 1) {
    if (!form.propertyType) errors.propertyType = 'Choose residential or commercial.'
    if (!required(form.zip)) errors.zip = 'Enter the ZIP code of the property.'
    else if (!isZip(form.zip)) errors.zip = 'Enter a 5-digit ZIP code, for example 95814.'
    if (!required(form.description)) errors.description = 'Add a short description of the project.'
    else if (form.description.trim().length < 10) errors.description = 'Add a few more words so we understand the project.'
  }
  if (i === 3 && !form.timeline) errors.timeline = 'Choose a timeline, or select “Not sure yet”.'
  if (i === 4) {
    if (!required(form.name)) errors.name = 'Enter your name.'
    if (!required(form.phone) && !required(form.email)) {
      errors.phone = 'Enter a phone number or an email address so we can reply.'
    }
    if (required(form.phone) && !isUsPhone(form.phone)) errors.phone = 'Enter a 10-digit US phone number.'
    if (required(form.email) && !isEmail(form.email)) errors.email = 'Enter a valid email address, for example name@example.com.'
    if (!form.consent) errors.consent = 'Please confirm we may contact you about this request.'
  }
  return Object.keys(errors).length === 0
}

async function focusFirstError() {
  await nextTick()
  const el = document.querySelector<HTMLElement>('[data-planner] [aria-invalid="true"]')
  el?.focus()
}

async function goTo(i: number) {
  step.value = i
  track('planner_step', { step: i + 1 })
  await nextTick()
  stepHeading.value?.focus()
}

function next() {
  if (!validate(step.value)) return focusFirstError()
  markStarted()
  goTo(step.value + 1)
}
function back() {
  clearErrors()
  if (step.value > 0) goTo(step.value - 1)
}

async function onSubmit() {
  if (step.value < steps.length - 1) return next()
  if (!validate(4)) return focusFirstError()

  const detailLines = questions.value
    .filter((q) => form.details[q.id])
    .map((q) => {
      const raw = form.details[q.id]!
      const label = q.options?.find((o) => o.value === raw)?.label ?? raw
      return `${q.label}: ${label}`
    })
    .join('\n')

  const result = await submit(
    {
      _subject: `Estimate request: ${serviceLabel.value}`,
      form: 'project-planner',
      service: serviceLabel.value,
      property_type: form.propertyType,
      zip: form.zip.trim(),
      description: form.description.trim(),
      project_details: detailLines || undefined,
      timeline: timelineOptions.find((t) => t.value === form.timeline)?.label,
      name: form.name.trim(),
      phone: form.phone.trim() || undefined,
      email: form.email.trim() || undefined,
      notes: form.notes.trim() || undefined,
      consent_to_contact: form.consent,
      page: route.fullPath
    },
    { honeypot: form._gotcha, startedAt: startedAt.value }
  )

  if (result.ok) {
    track('planner_submit', { service: form.service, property_type: form.propertyType, timeline: form.timeline })
    await nextTick()
    document.getElementById('planner-status')?.focus()
  }
}

const recommendedService = computed(() => getService(form.service))
</script>

<template>
  <div data-planner class="rounded border border-stone-300 bg-white">
    <!-- Success -->
    <div v-if="state === 'success'" id="planner-status" tabindex="-1" class="p-8 outline-none sm:p-12" role="status">
      <CircleCheck :size="44" class="text-bronze-dark" aria-hidden="true" />
      <h2 class="mt-5 text-h2">Request sent</h2>
      <p class="mt-4 max-w-prose text-lead text-muted">
        Thank you, {{ form.name.split(' ')[0] }}. Your {{ serviceLabel.toLowerCase() }} request has been delivered.
        We will review the details and contact you using the information you provided.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <AppButton v-if="recommendedService" :to="`/services/${recommendedService.slug}`" variant="outline">Read about {{ recommendedService.shortName.toLowerCase() }}</AppButton>
        <AppButton to="/" variant="quiet">Back to home</AppButton>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="onSubmit">
      <!-- Progress -->
      <div class="border-b border-stone-300 px-5 py-5 sm:px-8">
        <p class="sr-only" aria-live="polite">Step {{ step + 1 }} of {{ steps.length }}: {{ steps[step] }}</p>
        <ol class="flex items-center gap-2" aria-hidden="true">
          <li v-for="(s, i) in steps" :key="s" class="flex flex-1 items-center gap-2">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
              :class="i < step ? 'bg-bronze text-white' : i === step ? 'bg-ink text-paper' : 'border border-stone-300 text-muted'"
            >
              <Check v-if="i < step" :size="14" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="hidden text-sm font-semibold md:inline" :class="i === step ? 'text-ink' : 'text-muted'">{{ s }}</span>
            <span v-if="i < steps.length - 1" class="h-px flex-1" :class="i < step ? 'bg-bronze' : 'bg-stone-300'" />
          </li>
        </ol>
      </div>

      <div class="px-5 py-8 sm:px-8 sm:py-10">
        <!-- Honeypot (hidden from people and assistive tech) -->
        <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>Leave this field empty <input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
        </div>

        <!-- Step 1 -->
        <fieldset v-if="step === 0">
          <legend ref="stepHeading" tabindex="-1" class="text-h3 text-ink outline-none">What kind of project is it?</legend>
          <p class="mt-2 text-muted">Pick the closest match. You can describe everything else in the next step.</p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="radiogroup" :aria-invalid="errors.service ? 'true' : undefined" :aria-describedby="errors.service ? 'err-service' : undefined">
            <label
              v-for="o in plannerServiceOptions"
              :key="o.slug"
              class="relative flex min-h-[56px] cursor-pointer items-center gap-3 rounded border px-4 py-3 font-semibold text-ink transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bronze"
              :class="form.service === o.slug ? 'border-ink bg-ink/[0.03] ring-1 ring-ink' : 'border-stone-300 hover:border-ink/50'"
            >
              <input v-model="form.service" type="radio" name="service" :value="o.slug" class="h-4 w-4 accent-[#13294B]">
              {{ o.label }}
            </label>
          </div>
          <p v-if="errors.service" id="err-service" class="field-error">{{ errors.service }}</p>
        </fieldset>

        <!-- Step 2 -->
        <div v-else-if="step === 1" class="space-y-7">
          <h2 ref="stepHeading" tabindex="-1" class="text-h3 outline-none">About the property</h2>
          <fieldset>
            <legend class="field-label">Property type</legend>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="t in (['Residential', 'Commercial'] as const)"
                :key="t"
                class="flex min-h-[48px] cursor-pointer items-center gap-3 rounded border px-5 font-semibold text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bronze"
                :class="form.propertyType === t ? 'border-ink ring-1 ring-ink' : 'border-stone-300'"
              >
                <input v-model="form.propertyType" type="radio" name="propertyType" :value="t" class="h-4 w-4 accent-[#13294B]" :aria-invalid="errors.propertyType ? 'true' : undefined">
                {{ t }}
              </label>
            </div>
            <p v-if="errors.propertyType" class="field-error">{{ errors.propertyType }}</p>
          </fieldset>
          <div class="max-w-xs">
            <label for="pl-zip" class="field-label">Property ZIP code</label>
            <input id="pl-zip" v-model="form.zip" class="field" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="10" :aria-invalid="errors.zip ? 'true' : undefined" :aria-describedby="errors.zip ? 'err-zip' : 'hint-zip'">
            <p v-if="errors.zip" id="err-zip" class="field-error">{{ errors.zip }}</p>
            <p v-else-if="zipOutside" id="hint-zip" class="field-hint">This ZIP looks outside the Sacramento area. You can still send the request and we will let you know if we can help.</p>
            <p v-else id="hint-zip" class="field-hint">Used only to confirm the project is in our service area.</p>
          </div>
          <div>
            <label for="pl-desc" class="field-label">Brief project description</label>
            <textarea id="pl-desc" v-model="form.description" class="field min-h-[120px]" rows="4" maxlength="2000" placeholder="For example: replace the tub with a walk-in shower and update the vanity." :aria-invalid="errors.description ? 'true' : undefined" :aria-describedby="errors.description ? 'err-desc' : undefined" />
            <p v-if="errors.description" id="err-desc" class="field-error">{{ errors.description }}</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-else-if="step === 2" class="space-y-7">
          <div>
            <h2 ref="stepHeading" tabindex="-1" class="text-h3 outline-none">{{ serviceLabel }} details</h2>
            <p class="mt-2 text-muted">All optional. Answer what you know and skip the rest.</p>
          </div>
          <template v-if="questions.length">
            <template v-for="q in questions" :key="q.id">
              <fieldset v-if="q.type === 'choice'">
                <legend class="field-label">{{ q.label }}</legend>
                <div class="flex flex-wrap gap-2.5">
                  <label
                    v-for="o in q.options"
                    :key="o.value"
                    class="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded border px-4 text-[0.9375rem] font-semibold text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bronze"
                    :class="form.details[q.id] === o.value ? 'border-ink ring-1 ring-ink' : 'border-stone-300'"
                  >
                    <input v-model="form.details[q.id]" type="radio" :name="q.id" :value="o.value" class="h-4 w-4 accent-[#13294B]">
                    {{ o.label }}
                  </label>
                </div>
              </fieldset>
              <div v-else class="max-w-md">
                <label :for="`pl-${q.id}`" class="field-label">{{ q.label }}</label>
                <input :id="`pl-${q.id}`" v-model="form.details[q.id]" class="field" type="text" maxlength="200" :placeholder="q.placeholder">
                <p v-if="q.hint" class="field-hint">{{ q.hint }}</p>
              </div>
            </template>
          </template>
          <p v-else class="rounded bg-stone-50 p-5 text-muted">
            No extra questions for this service. You can add anything else in the notes on the last step.
          </p>
        </div>

        <!-- Step 4 -->
        <fieldset v-else-if="step === 3">
          <legend ref="stepHeading" tabindex="-1" class="text-h3 text-ink outline-none">When would you like to start?</legend>
          <p class="mt-2 text-muted">This helps us plan the conversation. Scheduling is confirmed after your estimate.</p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <label
              v-for="t in timelineOptions"
              :key="t.value"
              class="flex min-h-[56px] cursor-pointer items-center gap-3 rounded border px-4 font-semibold text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-bronze"
              :class="form.timeline === t.value ? 'border-ink ring-1 ring-ink' : 'border-stone-300'"
            >
              <input v-model="form.timeline" type="radio" name="timeline" :value="t.value" class="h-4 w-4 accent-[#13294B]" :aria-invalid="errors.timeline ? 'true' : undefined">
              {{ t.label }}
            </label>
          </div>
          <p v-if="errors.timeline" class="field-error">{{ errors.timeline }}</p>
        </fieldset>

        <!-- Step 5 -->
        <div v-else class="space-y-6">
          <h2 ref="stepHeading" tabindex="-1" class="text-h3 outline-none">How can we reach you?</h2>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label for="pl-name" class="field-label">Full name</label>
              <input id="pl-name" v-model="form.name" class="field" type="text" autocomplete="name" maxlength="120" :aria-invalid="errors.name ? 'true' : undefined" :aria-describedby="errors.name ? 'err-name' : undefined">
              <p v-if="errors.name" id="err-name" class="field-error">{{ errors.name }}</p>
            </div>
            <div>
              <label for="pl-phone" class="field-label">Phone</label>
              <input id="pl-phone" v-model="form.phone" class="field" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" :aria-invalid="errors.phone ? 'true' : undefined" :aria-describedby="errors.phone ? 'err-phone' : 'hint-contact'">
              <p v-if="errors.phone" id="err-phone" class="field-error">{{ errors.phone }}</p>
            </div>
            <div>
              <label for="pl-email" class="field-label">Email</label>
              <input id="pl-email" v-model="form.email" class="field" type="email" autocomplete="email" maxlength="160" :aria-invalid="errors.email ? 'true' : undefined" :aria-describedby="errors.email ? 'err-email' : 'hint-contact'">
              <p v-if="errors.email" id="err-email" class="field-error">{{ errors.email }}</p>
            </div>
            <p id="hint-contact" class="field-hint -mt-3 sm:col-span-2">Phone or email is enough. Add both if you like.</p>
            <div class="sm:col-span-2">
              <label for="pl-notes" class="field-label">Additional notes <span class="font-normal text-muted">(optional)</span></label>
              <textarea id="pl-notes" v-model="form.notes" class="field min-h-[96px]" rows="3" maxlength="2000" />
            </div>
          </div>
          <div>
            <label class="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
              <input v-model="form.consent" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-[#13294B]" :aria-invalid="errors.consent ? 'true' : undefined" :aria-describedby="errors.consent ? 'err-consent' : undefined">
              <span>I agree that {{ company.name }} may contact me about this estimate request. See the <NuxtLink to="/privacy-policy" class="font-semibold underline decoration-bronze underline-offset-4">Privacy Policy</NuxtLink>.</span>
            </label>
            <p v-if="errors.consent" id="err-consent" class="field-error">{{ errors.consent }}</p>
          </div>

          <p v-if="!isConfigured" class="flex gap-3 rounded border border-amber-700/40 bg-amber-50 p-4 text-sm text-amber-950">
            <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
            <span>Online requests are not connected yet, so this form cannot send. <template v-if="company.phone">Please call {{ formatPhone(company.phone) }}.</template><template v-else-if="company.email">Please email {{ company.email }}.</template><template v-else-if="company.social.instagram">Please message us on <a :href="company.social.instagram" target="_blank" rel="noopener" class="font-semibold underline">Instagram</a>.</template></span>
          </p>
        </div>

        <!-- Status -->
        <div aria-live="assertive" class="mt-6">
          <p v-if="state === 'error' || state === 'not-configured'" class="flex gap-3 rounded border border-red-800/30 bg-red-50 p-4 text-sm text-red-900" role="alert">
            <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" /> {{ message }}
          </p>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between gap-4 border-t border-stone-300 px-5 py-5 sm:px-8">
        <AppButton v-if="step > 0" variant="outline" @click="back">
          <ArrowLeft :size="18" aria-hidden="true" /> Back
        </AppButton>
        <span v-else />
        <AppButton v-if="step < steps.length - 1" type="submit">
          Next <ArrowRight :size="18" aria-hidden="true" />
        </AppButton>
        <AppButton v-else type="submit" :loading="state === 'submitting'">
          <LoaderCircle v-if="state === 'submitting'" :size="18" class="animate-spin" aria-hidden="true" />
          {{ state === 'submitting' ? 'Sending…' : 'Send estimate request' }}
        </AppButton>
      </div>
    </form>
  </div>
</template>
