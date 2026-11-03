/**
 * Minimal inline-link parser for trusted, repository-authored content.
 * Supports [label](url). Everything else is HTML-escaped.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function inlineLinks(text: string): string {
  let out = ''
  let last = 0
  for (const m of text.matchAll(LINK)) {
    out += escapeHtml(text.slice(last, m.index))
    const [, label, href] = m
    const external = /^https?:\/\//.test(href!)
    out += external
      ? `<a href="${escapeHtml(href!)}" target="_blank" rel="noopener">${escapeHtml(label!)}</a>`
      : `<a href="${escapeHtml(href!)}">${escapeHtml(label!)}</a>`
    last = (m.index ?? 0) + m[0].length
  }
  return out + escapeHtml(text.slice(last))
}

export function stripInlineLinks(text: string): string {
  return text.replace(LINK, '$1')
}
