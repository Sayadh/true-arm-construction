/**
 * Form delivery abstraction for a static site.
 *
 * Providers:
 *  - "formspree": POST JSON to https://formspree.io/f/<id> (Accept: application/json)
 *  - "webhook":   POST JSON to any HTTPS endpoint you control (e.g. a future NestJS API,
 *                 Cloudflare Worker, Make/Zapier hook). Must return 2xx on success.
 *
 * The endpoint is public by nature (it is called from the browser). Never put secret
 * API keys here. Configure via NUXT_PUBLIC_FORM_PROVIDER / NUXT_PUBLIC_FORM_ENDPOINT.
 */

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured'

export interface SubmitResult {
  ok: boolean
  state: SubmitState
  message: string
}

type Payload = Record<string, string | boolean | undefined>

async function sendFormspree(endpoint: string, data: Payload): Promise<SubmitResult> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (res.ok) return { ok: true, state: 'success', message: 'Request sent.' }
  let message = 'The request could not be sent. Please try again in a moment.'
  try {
    const body = (await res.json()) as { errors?: { message: string }[] }
    if (body.errors?.length) message = body.errors.map((e) => e.message).join(' ')
  } catch {
    /* non-JSON error body */
  }
  return { ok: false, state: 'error', message }
}

async function sendWebhook(endpoint: string, data: Payload): Promise<SubmitResult> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.ok
    ? { ok: true, state: 'success', message: 'Request sent.' }
    : { ok: false, state: 'error', message: 'The request could not be sent. Please try again in a moment.' }
}

export function useFormSubmit() {
  const config = useRuntimeConfig().public
  const state = ref<SubmitState>('idle')
  const message = ref('')
  const isConfigured = computed(() => /^https:\/\//.test(String(config.formEndpoint || '')))

  async function submit(data: Payload, opts: { honeypot?: string; startedAt?: number } = {}): Promise<SubmitResult> {
    if (state.value === 'submitting') {
      return { ok: false, state: 'submitting', message: '' }
    }

    // Spam: honeypot filled → silently drop but do not report success to the UI as delivered.
    if (opts.honeypot) {
      state.value = 'error'
      message.value = 'The request could not be sent.'
      return { ok: false, state: 'error', message: message.value }
    }

    // Spam: submitted implausibly fast after the form appeared
    if (opts.startedAt && Date.now() - opts.startedAt < 2500) {
      state.value = 'error'
      message.value = 'That was quick. Please review your details and submit again.'
      return { ok: false, state: 'error', message: message.value }
    }

    if (!isConfigured.value) {
      state.value = 'not-configured'
      message.value = 'Online requests are not connected yet, so this request was not sent.'
      return { ok: false, state: 'not-configured', message: message.value }
    }

    state.value = 'submitting'
    message.value = ''
    try {
      const endpoint = String(config.formEndpoint)
      const result = config.formProvider === 'webhook'
        ? await sendWebhook(endpoint, data)
        : await sendFormspree(endpoint, data)
      state.value = result.state
      message.value = result.message
      return result
    } catch {
      state.value = 'error'
      message.value = 'We could not reach the form service. Check your connection and try again.'
      return { ok: false, state: 'error', message: message.value }
    }
  }

  function reset() {
    state.value = 'idle'
    message.value = ''
  }

  return { state, message, isConfigured, submit, reset }
}
