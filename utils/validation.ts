/** Pure validation helpers shared by the planner and contact form. */

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
}

/** US phone: 10 digits, optional leading 1 */
export function isUsPhone(v: string): boolean {
  const d = v.replace(/\D/g, '')
  return d.length === 10 || (d.length === 11 && d.startsWith('1'))
}

/** US ZIP or ZIP+4 */
export function isZip(v: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(v.trim())
}

/**
 * Sacramento-region ZIPs (956xx–958xx) — used only for a soft notice, never to block.
 */
export function isSacramentoRegionZip(v: string): boolean {
  return /^95[6-8]\d{2}/.test(v.trim())
}

export function required(v: string | undefined | null): boolean {
  return Boolean(v && v.trim().length > 0)
}
