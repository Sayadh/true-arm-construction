<script setup lang="ts">
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-vue-next'
import { company } from '~/data/company'

const route = useRoute()
const { track } = useAnalytics()
const { state, message, isConfigured, submit } = useFormSubmit()
const started = ref(false)
const startedAt = ref(0)
onMounted(() => (startedAt.value = Date.now()))

const form = reactive({ name: '', email: '', phone: '', message: '', consent: false, _gotcha: '' })
const errors = reactive<Record<string, string>>({})

function onFocus() {
  if (!started.value) {
    started.value = true
    track('contact_form_start')
  }
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!required(form.name)) errors.name = 'Enter your name.'
  if (!required(form.email) && !required(form.phone)) errors.email = 'Enter an email address or a phone number so we can reply.'
  if (required(form.email) && !isEmail(form.email)) errors.email = 'Enter a valid email address.'
  if (required(form.phone) && !isUsPhone(form.phone)) errors.phone = 'Enter a 10-digit US phone number.'
  if (!required(form.message)) errors.message = 'Enter a message.'
  if (!form.consent) errors.consent = 'Please confirm we may contact you.'
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  if (!validate()) {
    await nextTick()
    document.querySelector<HTMLElement>('[data-contact] [aria-invalid="true"]')?.focus()
    return
  }
  const r = await submit(
    {
      _subject: 'Website contact message',
      form: 'contact',
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      message: form.message.trim(),
      consent_to_contact: form.consent,
      page: route.fullPath
    },
    { honeypot: form._gotcha, startedAt: startedAt.value }
  )
  if (r.ok) track('contact_form_submit')
}
</script>

<template>
  <div data-contact>
    <div v-if="state === 'success'" role="status" class="rounded border border-stone-300 bg-white p-8">
      <CircleCheck :size="36" class="text-bronze-dark" aria-hidden="true" />
      <p class="mt-4 text-h3 text-ink">Message sent</p>
      <p class="mt-2 text-muted">Thank you. We will reply using the contact details you provided.</p>
    </div>
    <form v-else novalidate class="space-y-5 rounded border border-stone-300 bg-white p-6 sm:p-8" @submit.prevent="onSubmit" @focusin="onFocus">
      <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>Leave this field empty <input v-model="form._gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
      </div>
      <div>
        <label for="c-name" class="field-label">Name</label>
        <input id="c-name" v-model="form.name" class="field" autocomplete="name" maxlength="120" :aria-invalid="errors.name ? 'true' : undefined" :aria-describedby="errors.name ? 'c-err-name' : undefined">
        <p v-if="errors.name" id="c-err-name" class="field-error">{{ errors.name }}</p>
      </div>
      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="c-email" class="field-label">Email</label>
          <input id="c-email" v-model="form.email" class="field" type="email" autocomplete="email" maxlength="160" :aria-invalid="errors.email ? 'true' : undefined" :aria-describedby="errors.email ? 'c-err-email' : undefined">
          <p v-if="errors.email" id="c-err-email" class="field-error">{{ errors.email }}</p>
        </div>
        <div>
          <label for="c-phone" class="field-label">Phone <span class="font-normal text-muted">(optional)</span></label>
          <input id="c-phone" v-model="form.phone" class="field" type="tel" autocomplete="tel" maxlength="20" :aria-invalid="errors.phone ? 'true' : undefined" :aria-describedby="errors.phone ? 'c-err-phone' : undefined">
          <p v-if="errors.phone" id="c-err-phone" class="field-error">{{ errors.phone }}</p>
        </div>
      </div>
      <div>
        <label for="c-msg" class="field-label">Message</label>
        <textarea id="c-msg" v-model="form.message" class="field min-h-[140px]" rows="5" maxlength="3000" :aria-invalid="errors.message ? 'true' : undefined" :aria-describedby="errors.message ? 'c-err-msg' : undefined" />
        <p v-if="errors.message" id="c-err-msg" class="field-error">{{ errors.message }}</p>
      </div>
      <div>
        <label class="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
          <input v-model="form.consent" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-[#13294B]" :aria-invalid="errors.consent ? 'true' : undefined">
          <span>I agree that {{ company.name }} may contact me about my message. See the <NuxtLink to="/privacy-policy" class="font-semibold underline decoration-bronze underline-offset-4">Privacy Policy</NuxtLink>.</span>
        </label>
        <p v-if="errors.consent" class="field-error">{{ errors.consent }}</p>
      </div>
      <p v-if="!isConfigured" class="flex gap-3 rounded border border-amber-700/40 bg-amber-50 p-4 text-sm text-amber-950">
        <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" />
        Online messages are not connected yet, so this form cannot send.
      </p>
      <div aria-live="assertive">
        <p v-if="state === 'error' || state === 'not-configured'" role="alert" class="flex gap-3 rounded border border-red-800/30 bg-red-50 p-4 text-sm text-red-900">
          <CircleAlert :size="18" class="mt-0.5 shrink-0" aria-hidden="true" /> {{ message }}
        </p>
      </div>
      <AppButton type="submit" :loading="state === 'submitting'">
        <LoaderCircle v-if="state === 'submitting'" :size="18" class="animate-spin" aria-hidden="true" />
        {{ state === 'submitting' ? 'Sending…' : 'Send message' }}
      </AppButton>
    </form>
  </div>
</template>
