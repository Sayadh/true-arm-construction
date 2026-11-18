<script setup lang="ts">
import { CircleAlert, CircleCheck, LoaderCircle, MessageSquareText } from 'lucide-vue-next'
import { company, formatPhone } from '~/data/company'
import { paintingHub } from '~/data/painting'

/**
 * Short painting estimate form (the lead form of the painting hub).
 * Deliberately one screen: project type, size, timing, home age, contact. Photos are requested by text
 * (Formspree file uploads would need a paid plan), so the success state points to the text line.
 */
const props = withDefaults(defineProps<{ idPrefix?: string }>(), { idPrefix: 'pq' })

const route = useRoute()
const { track } = useAnalytics()
const { state, message, isConfigured, submit } = useFormSubmit()
const q = paintingHub.quote
const started = ref(false)
const startedAt = ref(0)

const form = reactive({
  types: [] as string[],
  size: '',
  timing: '',
  pre1978: '',
  name: '',
  phone: '',
  email: '',
  zip: '',
  notes: '',
  consent: false,
  _gotcha: ''
})
const errors = reactive<Record<string, string>>({})

onMounted(() => {
  startedAt.value = Date.now()
  // Preselect from ?service= after hydration (the static HTML has no query string)
  const preset = route.query.service
  if (typeof preset === 'string' && q.projectTypes.some((t) => t.value === preset) && !form.types.includes(preset)) form.types.push(preset)
})

const id = (name: string) => `${props.idPrefix}-${name}`
const labelOf = (list: { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label

function toggleType(v: string) {
  const i = form.types.indexOf(v)
  if (i === -1) form.types.push(v)
  else form.types.splice(i, 1)
  if (form.types.length) delete errors.types
}

function onFocus() {
  if (!started.value) {
    started.value = true
    track('painting_quote_start')
  }
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.types.length) errors.types = 'Choose at least one type of painting.'
  if (!required(form.name)) errors.name = 'Enter your name.'
  if (!required(form.phone)) errors.phone = 'Enter a phone number so we can reach you.'
  else if (!isUsPhone(form.phone)) errors.phone = 'Enter a 10-digit US phone number.'
  if (required(form.email) && !isEmail(form.email)) errors.email = 'Enter a valid email address.'
  if (!required(form.zip)) errors.zip = 'Enter the ZIP code of the property.'
  else if (!isZip(form.zip)) errors.zip = 'Enter a 5-digit ZIP code.'
  if (!form.consent) errors.consent = 'Please confirm we may contact you.'
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  if (!validate()) {
    await nextTick()
    document.querySelector<HTMLElement>(`[data-painting-quote="${props.idPrefix}"] [aria-invalid="true"]`)?.focus()
    return
  }
  const types = form.types.map((t) => labelOf(q.projectTypes, t)).join(', ')
  const r = await submit(
    {
      _subject: `Painting estimate request: ${types}`,
      form: 'painting-quote',
      painting_type: types,
      size: labelOf(q.sizes, form.size) || 'Not given',
      timing: labelOf(q.timings, form.timing) || 'Not given',
      built_before_1978: form.pre1978 || 'Not given',
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      zip: form.zip.trim(),
      notes: form.notes.trim() || undefined,
      consent_to_contact: form.consent,
      page: route.fullPath
    },
    { honeypot: form._gotcha, startedAt: startedAt.value }
  )
  if (r.ok) track('painting_quote_submit', { painting_type: form.types.join(',') })
}

const chip = (on: boolean) =>
  [
    'inline-flex min-h-[44px] items-center rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors',
    on ? 'border-ink bg-ink text-paper' : 'border-stone-300 bg-white text-ink hover:border-ink'
  ].join(' ')
</script>

<template>
  <div :data-painting-quote="idPrefix">
    <div v-if="state === 'success'" role="status" class="rounded-lg border border-stone-300 bg-white p-8">
      <CircleCheck :size="36" class="text-bronze-dark" aria-hidden="true" />
      <p class="mt-4 text-h3 text-ink">Request sent</p>
      <p class="mt-2 text-muted">Thank you. We will contact you to schedule a walkthrough or ask a few questions.</p>
      <p v-if="company.textPhone" class="mt-5 flex items-start gap-3 rounded-md bg-stone-50 p-4 text-[0.9375rem]">
        <MessageSquareText :size="20" class="mt-0.5 shrink-0 text-bronze-dark" aria-hidden="true" />
        <span>
          Have photos of the rooms or walls? Text them to
          <a :href="`sms:${company.textPhone}`" class="font-semibold text-ink underline decoration-bronze underline-offset-4" @click="track('sms_click', { location: 'painting_quote_success' })">{{ formatPhone(company.textPhone) }}</a>
          with your name. It helps us prepare the estimate.
        </span>
      </p>
    </div>

    <form v-else novalidate class="space-y-6 rounded-lg border border-stone-300 bg-white p-5 shadow-[0_24px_60px_-40px_rgba(19,41,75,0.45)] sm:p-8" @submit.prevent="onSubmit" @focusin="onFocus">
      <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>Leave this field empty <input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
      </div>

      <fieldset>
        <legend class="field-label">What needs painting? <span class="font-normal text-muted">(choose all that apply)</span></legend>
        <div class="mt-2 flex flex-wrap gap-2" :aria-invalid="errors.types ? 'true' : undefined" :aria-describedby="errors.types ? id('err-types') : undefined" tabindex="-1">
          <button v-for="t in q.projectTypes" :key="t.value" type="button" :class="chip(form.types.includes(t.value))" :aria-pressed="form.types.includes(t.value)" @click="toggleType(t.value)">
            {{ t.label }}
          </button>
        </div>
        <p v-if="errors.types" :id="id('err-types')" class="field-error">{{ errors.types }}</p>
      </fieldset>

      <div class="grid gap-6 sm:grid-cols-2">
        <fieldset>
          <legend class="field-label">How big is the job?</legend>
          <div class="mt-2 flex flex-wrap gap-2">
            <button v-for="o in q.sizes" :key="o.value" type="button" :class="chip(form.size === o.value)" :aria-pressed="form.size === o.value" @click="form.size = form.size === o.value ? '' : o.value">
              {{ o.label }}
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend class="field-label">When would you like to start?</legend>
          <div class="mt-2 flex flex-wrap gap-2">
            <button v-for="o in q.timings" :key="o.value" type="button" :class="chip(form.timing === o.value)" :aria-pressed="form.timing === o.value" @click="form.timing = form.timing === o.value ? '' : o.value">
              {{ o.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <fieldset>
        <legend class="field-label">Was the building built before 1978?</legend>
        <p class="field-hint !mt-0">Older paint may contain lead, which changes how the work is done.</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <button v-for="o in ['Yes', 'No', 'Not sure']" :key="o" type="button" :class="chip(form.pre1978 === o)" :aria-pressed="form.pre1978 === o" @click="form.pre1978 = form.pre1978 === o ? '' : o">
            {{ o }}
          </button>
        </div>
      </fieldset>

      <div class="grid gap-5 border-t border-stone-300 pt-6 sm:grid-cols-2">
        <div>
          <label :for="id('name')" class="field-label">Name</label>
          <input :id="id('name')" v-model="form.name" class="field" autocomplete="name" maxlength="120" :aria-invalid="errors.name ? 'true' : undefined" :aria-describedby="errors.name ? id('err-name') : undefined">
          <p v-if="errors.name" :id="id('err-name')" class="field-error">{{ errors.name }}</p>
        </div>
        <div>
          <label :for="id('phone')" class="field-label">Phone</label>
          <input :id="id('phone')" v-model="form.phone" class="field" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" :aria-invalid="errors.phone ? 'true' : undefined" :aria-describedby="errors.phone ? id('err-phone') : undefined">
          <p v-if="errors.phone" :id="id('err-phone')" class="field-error">{{ errors.phone }}</p>
        </div>
        <div>
          <label :for="id('email')" class="field-label">Email <span class="font-normal text-muted">(optional)</span></label>
          <input :id="id('email')" v-model="form.email" class="field" type="email" autocomplete="email" maxlength="160" :aria-invalid="errors.email ? 'true' : undefined" :aria-describedby="errors.email ? id('err-email') : undefined">
          <p v-if="errors.email" :id="id('err-email')" class="field-error">{{ errors.email }}</p>
        </div>
        <div>
          <label :for="id('zip')" class="field-label">Property ZIP code</label>
          <input :id="id('zip')" v-model="form.zip" class="field" inputmode="numeric" autocomplete="postal-code" maxlength="10" :aria-invalid="errors.zip ? 'true' : undefined" :aria-describedby="errors.zip ? id('err-zip') : undefined">
          <p v-if="errors.zip" :id="id('err-zip')" class="field-error">{{ errors.zip }}</p>
        </div>
      </div>
      <div>
        <label :for="id('notes')" class="field-label">Anything else? <span class="font-normal text-muted">(optional)</span></label>
        <textarea :id="id('notes')" v-model="form.notes" class="field min-h-[96px]" rows="3" maxlength="2000" placeholder="Rooms, colors, repairs you have noticed, access notes…" />
      </div>

      <div>
        <label class="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
          <input v-model="form.consent" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-[#13294B]" :aria-invalid="errors.consent ? 'true' : undefined">
          <span>I agree that {{ company.name }} may contact me about this request. See the <NuxtLink to="/privacy-policy" class="font-semibold underline decoration-bronze underline-offset-4">Privacy Policy</NuxtLink>.</span>
        </label>
        <p v-if="errors.consent" class="field-error">{{ errors.consent }}</p>
      </div>

      <p v-if="!isConfigured" class="flex gap-3 rounded border border-amber-700/40 bg-amber-50 p-4 text-sm text-amber-950">
        <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
        Online requests are not connected yet, so this form cannot send.
      </p>
      <div aria-live="assertive">
        <p v-if="state === 'error' || state === 'not-configured'" role="alert" class="flex gap-3 rounded border border-red-800/30 bg-red-50 p-4 text-sm text-red-900">
          <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" /> {{ message }}
        </p>
      </div>
      <AppButton type="submit" size="lg" class="w-full sm:w-auto" :loading="state === 'submitting'">
        <LoaderCircle v-if="state === 'submitting'" :size="18" class="animate-spin" aria-hidden="true" />
        {{ state === 'submitting' ? 'Sending…' : 'Get my free estimate' }}
      </AppButton>
    </form>
  </div>
</template>
