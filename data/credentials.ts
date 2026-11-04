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
export const credentials: Credential[] = [
  {
    id: 'epa-lead-safe',
    name: 'EPA Lead-Safe Certified Firm',
    issuer: 'U.S. Environmental Protection Agency (EPA)',
    credentialNumber: 'NAT-F312370-1',
    description:
      'Certified under the EPA Renovation, Repair and Painting (RRP) Rule. Firms that disturb painted surfaces in homes, child-care facilities, and preschools built before 1978 must be certified and follow lead-safe work practices.',
    // Set to 'confirmed' once the number has been checked in EPA's firm locator (verifyUrl).
    status: 'pending-verification',
    issuedOn: undefined, // TODO(client): issue date from the EPA certificate
    expiresOn: undefined, // TODO(client): expiration date from the EPA certificate
    verifyUrl: 'https://cdxapps.epa.gov/ocspp-oppt-lead/firm-location-search',
    image: { src: '/images/certificates/epa-lead-safe-certified-firm.png', alt: 'EPA Lead-Safe Certified Firm logo, certification NAT-F312370-1', width: 800, height: 589 },
    published: true
  }
]

export const publishedCredentials = credentials.filter((c) => c.published)
