import { NextResponse } from 'next/server'
import { contactSchema, fieldErrors } from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        errors: fieldErrors(parsed.error),
      },
      { status: 400 },
    )
  }

  // Honeypot: a filled `website` field means a bot. Answer 200 so the bot
  // gets no signal, but do nothing with the submission.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: 'Thanks — we will be in touch.' })
  }

  /*
   * TODO: deliver the message (transactional email, helpdesk, CRM).
   * Message contents are intentionally not logged — they contain personal
   * information customers did not consent to have written into server logs.
   */

  return NextResponse.json({
    ok: true,
    message: 'Thanks — your message is with us and we reply within one business day.',
  })
}
