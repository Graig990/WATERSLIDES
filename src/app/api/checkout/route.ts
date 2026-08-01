import { NextResponse } from 'next/server'
import { checkoutSchema, fieldErrors } from '@/lib/validation'
import { getProduct } from '@/data/products'
import { absoluteUrl, siteConfig } from '@/data/site'

export const runtime = 'nodejs'

interface ResolvedLine {
  slug: string
  name: string
  unitPrice: number
  quantity: number
  image: string
}

/** Order numbers are display-only; they carry no customer data. */
function generateOrderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6)
  const random = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `WS4K-${stamp}-${random}`
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 400 },
    )
  }

  const { lines, customer } = parsed.data

  /*
   * Prices are looked up from the catalog on the server. The client sends
   * slugs and quantities only — a price posted from the browser is never
   * trusted, or anyone could buy a 19ft flagship for a dollar.
   */
  const resolved: ResolvedLine[] = []
  for (const line of lines) {
    const product = getProduct(line.slug)
    if (!product) {
      return NextResponse.json(
        { ok: false, message: `We no longer carry one of the items in your cart.` },
        { status: 400 },
      )
    }
    if (product.price === null || product.stock === 'out-of-stock') {
      return NextResponse.json(
        { ok: false, message: `${product.shortName} is not available to order right now.` },
        { status: 409 },
      )
    }
    resolved.push({
      slug: product.slug,
      name: product.name,
      unitPrice: product.price,
      quantity: line.quantity,
      image: product.image,
    })
  }

  const subtotal = resolved.reduce((total, line) => total + line.unitPrice * line.quantity, 0)
  const orderNumber = generateOrderNumber()
  const stripeKey = process.env.STRIPE_SECRET_KEY

  // ---- Demo mode -------------------------------------------------------
  // No Stripe keys configured: complete the flow end-to-end without taking
  // a payment, so the cart → checkout → confirmation path is never broken.
  if (!stripeKey) {
    return NextResponse.json({
      ok: true,
      mode: 'demo' as const,
      orderNumber,
      subtotal,
      lines: resolved,
      redirectUrl: `/order-confirmation?order=${encodeURIComponent(orderNumber)}&demo=1`,
    })
  }

  // ---- Stripe Checkout -------------------------------------------------
  try {
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(stripeKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Never log or persist the address here — Stripe is the system of record.
      customer_email: customer.email,
      client_reference_id: orderNumber,
      line_items: resolved.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: line.unitPrice * 100,
          product_data: {
            name: line.name,
            images: [line.image],
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ['US'] },
      automatic_tax: { enabled: false },
      metadata: { orderNumber, source: siteConfig.name },
      success_url: `${absoluteUrl('/order-confirmation')}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: absoluteUrl('/checkout?canceled=1'),
    })

    if (!session.url) {
      return NextResponse.json(
        { ok: false, message: 'Stripe did not return a checkout URL. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      mode: 'stripe' as const,
      orderNumber,
      redirectUrl: session.url,
    })
  } catch (error) {
    // Log the failure reason, never the customer payload.
    console.error('[checkout] Stripe session creation failed:', (error as Error).message)
    return NextResponse.json(
      { ok: false, message: 'We could not start the payment session. Please try again.' },
      { status: 502 },
    )
  }
}
