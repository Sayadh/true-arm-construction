import type { Credential } from '../types'

/**
 * Certificates and credentials beyond the CSLB license.
 * The client will supply these later. Do NOT add placeholders here:
 * an entry with `published: false` never renders.
 *
 * Image/PDF files go in /public/images/certificates/.
 *
 * Example:
 * {
 *   id: 'osha-30',
 *   name: 'OSHA 30-Hour Construction',
 *   issuer: 'Issuing organization',
 *   description: 'What this credential covers, in plain language.',
 *   status: 'confirmed',
 *   issuedOn: '2025-03-01',
 *   expiresOn: undefined,
 *   image: { src: '/images/certificates/osha-30.jpg', alt: 'OSHA 30 certificate' },
 *   pdf: '/images/certificates/osha-30.pdf',
 *   published: true
 * }
 */
export const credentials: Credential[] = []

export const publishedCredentials = credentials.filter((c) => c.published)
