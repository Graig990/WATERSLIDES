/**
 * ============================================================================
 * FORM DELIVERY
 * ============================================================================
 *
 * The site is a static export on GitHub Pages, so there is no server to
 * receive form posts. Every form — contact, newsletter, back-in-stock and
 * review submissions — needs a third-party endpoint that accepts a POST from
 * the browser.
 *
 * ⚠️  UNTIL THIS IS CONFIGURED, FORMS DO NOT SEND ANYTHING.
 * They fail honestly: each one tells the visitor to email or call instead,
 * with a prefilled mailto link, rather than showing a success message for a
 * submission that went nowhere. A form that silently swallows a customer
 * enquiry is worse than no form at all.
 *
 * TO SET IT UP
 *   1. Create a free account with a form backend. Formspree, Web3Forms,
 *      Formsubmit and Basin all work — they exist precisely for static sites
 *      and all accept a browser POST returning JSON.
 *   2. Create a form and copy the endpoint URL it gives you.
 *   3. Paste it below and redeploy.
 *   4. Submit each form once and confirm the message actually arrives.
 *
 * Note the free tiers are usually capped (Formspree is 50 submissions per
 * month at time of writing). Newsletter signups and review submissions will
 * consume that quota alongside genuine enquiries.
 * ============================================================================
 */

/** TODO: paste your form backend endpoint here. */
export const FORM_ENDPOINT = ''

export function isFormDeliveryConfigured(): boolean {
  return FORM_ENDPOINT.trim().length > 0
}

export type FormKind = 'contact' | 'newsletter' | 'notify' | 'review'

/** Human label used as the email subject line at the backend. */
export const FORM_SUBJECTS: Record<FormKind, string> = {
  contact: 'Website contact form',
  newsletter: 'Newsletter signup',
  notify: 'Back-in-stock request',
  review: 'Product review submitted for moderation',
}
