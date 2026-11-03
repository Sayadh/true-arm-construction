# Forms (Project Planner + Contact)

Both forms use `composables/useFormSubmit.ts`. No custom backend is required.

## Behavior

- Client-side validation with accessible error messages; first invalid field receives focus.
- Success state is shown **only** after the provider returns HTTP 2xx.
- If `NUXT_PUBLIC_FORM_ENDPOINT` is empty, the form clearly says online requests are not connected and nothing is reported as sent.
- Duplicate submissions are blocked while a request is in flight.
- Spam protection: hidden honeypot field (`_gotcha`, Formspree-compatible) + minimum time-to-submit check. Formspree adds its own spam filtering.
- Analytics events (`planner_submit`, `contact_form_submit`) contain **no personal data**.

## Connect Formspree (recommended)

1. Create a form at https://formspree.io and set the notification email (the company inbox).
2. Copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Set `NUXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz` and rebuild (`npm run generate`).
4. In Formspree settings, restrict submissions to the production domain.
5. Submit a test request from the live site.

Fields sent: `_subject`, `form`, `service`, `property_type`, `zip`, `description`, `project_details`, `timeline`, `name`, `phone`, `email`, `notes`, `consent_to_contact`, `page`.
Formspree uses `email` as reply-to automatically.

## Use another provider / your own API

Set `NUXT_PUBLIC_FORM_PROVIDER=webhook` and `NUXT_PUBLIC_FORM_ENDPOINT=https://…`. The site sends a JSON `POST` and treats any 2xx as success. This works for a future NestJS endpoint, a Cloudflare Worker, or Make/Zapier webhooks. Add CORS for the site's origin on that endpoint.

To add a completely different integration, add a `sendXxx()` function in `useFormSubmit.ts` and a new provider value.

## Photo uploads (enhancement point, not enabled)

File uploads are not enabled. Formspree supports uploads only on paid plans, and a reliable alternative needs storage (e.g. Supabase Storage with signed upload URLs issued by a small backend). When ready, add a file input to step 3 of `components/forms/ProjectPlanner.vue` and send `multipart/form-data` instead of JSON.
