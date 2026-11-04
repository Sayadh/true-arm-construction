import { llmsTxt } from '../utils/llms'

/** Prerendered into /llms.txt — index for AI assistants (https://llmstxt.org). */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return llmsTxt(base)
})
