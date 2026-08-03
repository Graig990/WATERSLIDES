import { getProduct } from '@/data/products'
import { getPaymentMethod, isMethodConfigured } from '@/data/payments'
import { checkoutSchema, fieldErrors } from '@/lib/validation'

export interface OrderLine {
  slug: string
  name: string
  unitPrice: number
  quantity: number
  image: string
}

export interface PlacedOrder {
  orderNumber: string
  subtotal: number
  lines: OrderLine[]
  payment: {
    method: string
    label: string
    configured: boolean
    cryptoAsset: string | null
  }
  redirectUrl: string
}

export type PlaceOrderResult =
  | { ok: true; order: PlacedOrder }
  | { ok: false; message: string; errors?: Record<string, string> }

/** Display-only; encodes no customer data. */
function generateOrderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6)
  const random = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `WS4K-${stamp}-${random}`
}

/**
 * Creates an order in the browser.
 *
 * This ran server-side at /api/checkout until the site moved to static
 * hosting, which has no server. The validation and price lookup are
 * unchanged — the difference is where they execute.
 *
 * ⚠️  SECURITY NOTE — read before enabling card payments.
 * Prices are still resolved from the catalog by slug rather than taken from
 * the submitted form, so the UI cannot be tricked by editing a hidden field.
 * But this is all client-side now, so a determined visitor could alter the
 * total before it is displayed.
 *
 * That is tolerable *only* because payment is manual: you see the order and
 * the amount actually received before anything ships, so a mismatch is
 * caught in the normal course of fulfilling it. If you ever add an automatic
 * payment gateway, the amount MUST be computed on a server you control —
 * move this back behind an API route on a host that can run one.
 */
export function placeOrder(input: {
  customer: unknown
  lines: { slug: string; quantity: number }[]
  payment: { method: string; cryptoAsset?: string }
}): PlaceOrderResult {
  const parsed = checkoutSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Please check the highlighted fields.',
      errors: fieldErrors(parsed.error),
    }
  }

  const { lines, payment } = parsed.data

  const resolved: OrderLine[] = []
  for (const line of lines) {
    const product = getProduct(line.slug)
    if (!product) {
      return { ok: false, message: 'We no longer carry one of the items in your cart.' }
    }
    if (product.price === null || product.stock === 'out-of-stock') {
      return { ok: false, message: `${product.shortName} is not available to order right now.` }
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
    return {
      ok: false,
      message: 'That payment method is not available.',
      errors: { 'payment.method': 'Choose how you want to pay' },
    }
  }

  const subtotal = resolved.reduce((total, line) => total + line.unitPrice * line.quantity, 0)
  const orderNumber = generateOrderNumber()

  return {
    ok: true,
    order: {
      orderNumber,
      subtotal,
      lines: resolved,
      payment: {
        method: method.id,
        label: method.label,
        configured: isMethodConfigured(method),
        cryptoAsset: payment.cryptoAsset ?? null,
      },
      redirectUrl: `/order-confirmation/?order=${encodeURIComponent(orderNumber)}`,
    },
  }
}
