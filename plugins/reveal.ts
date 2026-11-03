import type { Directive } from 'vue'

/**
 * v-reveal: one restrained entrance per element as it scrolls into view.
 *
 *   v-reveal                     fade + small rise
 *   v-reveal="'wipe'"            image unveils top-to-bottom (like a drawing sheet)
 *   v-reveal="{ delay: 120 }"    stagger siblings
 *   v-reveal="{ type: 'wipe', delay: 80 }"
 *
 * Content is never hidden in the server HTML: elements already on screen at
 * hydration are left alone (no flash), only below-the-fold elements are armed.
 * Skipped entirely for prefers-reduced-motion.
 */
type RevealValue = 'up' | 'wipe' | { type?: 'up' | 'wipe'; delay?: number } | undefined

let observer: IntersectionObserver | null = null

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer!.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
  }
  return observer
}

const reveal: Directive<HTMLElement, RevealValue> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const value = binding.value
    const type = typeof value === 'string' ? value : value?.type ?? 'up'
    const delay = typeof value === 'object' && value?.delay ? value.delay : 0

    // Already visible on first paint: don't hide what the visitor is looking at.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return

    el.classList.add('reveal', `reveal-${type}`)
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
    getObserver().observe(el)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
