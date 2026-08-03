import { FORM_ENDPOINT, FORM_SUBJECTS, isFormDeliveryConfigured, type FormKind } from '@/data/forms'
import { siteConfig } from '@/data/site'

export type SubmitResult =
  | { status: 'sent'; message: string }
  /** No backend configured — the caller must show the email fallback. */
  | { status: 'unconfigured'; mailto: string; message: string }
  | { status: 'error'; message: string }

function buildMailto(kind: FormKind, payload: Record<string, unknown>): string {
  const to = kind === 'contact' ? siteConfig.email : siteConfig.supportEmail
  const subject = FORM_SUBJECTS[kind]
  const body = Object.entries(payload)
    .filter(([key, value]) => key !== 'website' && value !== '' && value != null)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join('\n')

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Posts a form to the configured third-party backend.
 *
 * On a static host there is no server of ours in the loop, so when no backend
 * is configured this returns `unconfigured` and the caller shows a mailto
 * fallback. It never reports success for a submission that was not delivered.
 */
export async function submitForm(
  kind: FormKind,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  if (!isFormDeliveryConfigured()) {
    return {
      status: 'unconfigured',
      mailto: buildMailto(kind, payload),
      message: 'Online submission is not set up yet — please email us instead.',
    }
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        _subject: FORM_SUBJECTS[kind],
        formType: kind,
      }),
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: 'That did not go through. Please try again, or email us directly.',
      }
    }

    return { status: 'sent', message: 'Thanks — that reached us.' }
  } catch {
    return {
      status: 'error',
      message: 'Network error. Please try again, or email us directly.',
    }
  }
}
