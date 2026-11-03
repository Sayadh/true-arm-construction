/**
 * In-page anchor navigation that doesn't fight the router's scroll handling
 * (native hash jump + Vue Router scrollBehavior otherwise interrupt each other).
 * Offsets come from CSS scroll-padding-top / scroll-margin-top.
 */
export function useAnchorScroll() {
  function scrollToId(id: string, e?: Event) {
    const el = document.getElementById(id)
    if (!el) return
    e?.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(history.state, '', `#${id}`)
  }
  return { scrollToId }
}
