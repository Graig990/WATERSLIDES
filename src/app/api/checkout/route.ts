import { NextResponse } from 'next/server'
import { checkoutSchema, fieldErrors } from '@/lib/validation'
import { getProduct } from '@/data/products'
import { getPaymentMethod, isMethodConfigured } from '@/data/payments'

export const runtime = 'nodejs'

interface ResolvedLine {
  slug: string
  name: string
  unitPrice: number
  quantity: number
  image: string
}

/** Order numbers are display-only; they encode no customer data. */
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
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        errors: fieldErrors(parsed.error),
      },
      { status: 400 },
    )
  }

  const { lines, payment } = parsed.data

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
        { ok: false, message: 'We no longer carry one of the items in your cart.' },
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

  const method = getPaymentMethod(payment.method)
  if (!method) {
    return NextResponse.json(
      { ok: false, message: 'That payment method is not available.', errors: { 'payment.method': 'Choose how you want to pay' } },
      { status: 400 },
    )
  }

  const subtotal = resolved.reduce((total, line) => total + line.unitPrice * line.quantity, 0)
  const orderNumber = generateOrderNumber()

  /*
   * Every method here settles manually — no card gateway is involved, so
   * nothing is charged at this point. The order is recorded as awaiting
   * payment and the customer is handed instructions.
   *
   * TODO: persist the order (database or order-management system) and send
   * the confirmation email. Until that exists the confirmation page relies on
   * a sessionStorage snapshot written by the browser, which means a customer
   * who closes the tab loses their instructions — they can still reach you by
   * phone, but this is the first thing to wire up for real trading.
   *
   * TODO: notify yourself of the new order so you can watch for the payment.
   */

  return NextResponse.json({
    ok: true,
    mode: 'manual' as const,
    orderNumber,
    subtotal,
    lines: resolved,
    payment: {
      method: method.id,
      label: method.label,
      /*
       * Whether we can show real payment details. When the method has not
       * been configured the confirmation page promises follow-up by email
       * rather than displaying anything that looks like an account —
       * a wrong crypto address in particular loses the customer's money.
       */
      configured: isMethodConfigured(method),
      cryptoAsset: payment.cryptoAsset ?? null,
    },
    redirectUrl: `/order-confirmation?order=${encodeURIComponent(orderNumber)}`,
  })
}
