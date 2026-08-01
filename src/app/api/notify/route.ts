import { NextResponse } from 'next/server'
import { notifySchema } from '@/lib/validation'
import { getProduct } from '@/data/products'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = notifySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' },
      { status: 400 },
    )
  }

  const product = getProduct(parsed.data.productSlug)
  if (!product) {
    return NextResponse.json({ ok: false, message: 'Unknown product.' }, { status: 404 })
  }

  /*
   * TODO: persist the back-in-stock request (email platform or database).
   * The email address is intentionally not written to the server log.
   */

  return NextResponse.json({
    ok: true,
    message: `Done — we will email you the moment the ${product.shortName} is back.`,
  })
}
