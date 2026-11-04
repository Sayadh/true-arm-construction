import { llmsFullTxt } from '../utils/llms'

/** Prerendered into /llms-full.txt — full plain-text content for AI assistants. */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return llmsFullTxt(base)
})
