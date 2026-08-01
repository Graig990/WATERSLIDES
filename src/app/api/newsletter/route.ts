import { NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = newsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' },
      { status: 400 },
    )
  }

  /*
   * TODO: connect your email platform (Klaviyo, Mailchimp, Resend, …) here.
   * Deliberately not implemented against a specific provider — and the address
   * is deliberately not logged, because a server log is not a mailing list and
   * writing subscriber emails into one is a data-protection problem waiting to
   * happen. Until this is wired up the endpoint validates and accepts.
   */

  return NextResponse.json({
    ok: true,
    message: 'You are on the list — your $50 code is on its way.',
  })
}
