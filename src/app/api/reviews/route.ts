import { NextResponse } from 'next/server'
import { fieldErrors, reviewSchema } from '@/lib/validation'
import { getProduct } from '@/data/products'

export const runtime = 'nodejs'

/**
 * Accepts a customer review for moderation.
 *
 * Submissions are NOT published automatically, and that is deliberate on two
 * counts. Publishing unmoderated text on a children's product site invites
 * abuse, and under the FTC's rules on consumer reviews a merchant needs to be
 * able to stand behind what appears on its own product pages — which means a
 * human checking that the reviewer actually bought the thing.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = reviewSchema.safeParse(body)
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

  // Honeypot: a filled `website` field means a bot. Answer 200 so it gets no
  // signal, but do nothing with the submission.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: 'Thanks for your review.' })
  }

  const product = getProduct(parsed.data.productSlug)
  if (!product) {
    return NextResponse.json({ ok: false, message: 'Unknown product.' }, { status: 404 })
  }

  /*
   * TODO: send this to wherever you will moderate it — a database, a
   * helpdesk, or an email to yourself. Include the order number so you can
   * verify the purchase before publishing.
   *
   * Once verified, add the review to `src/data/reviews.ts`. It then appears
   * on the product page and, at three or more reviews for a product, starts
   * contributing to AggregateRating schema.
   *
   * The reviewer's email and review text are intentionally NOT logged here —
   * server logs are not a moderation queue.
   */

  return NextResponse.json({
    ok: true,
    message:
      'Thank you — your review has been sent for verification. We check every review against a real order before publishing it, so it may take a day or two to appear.',
  })
}
