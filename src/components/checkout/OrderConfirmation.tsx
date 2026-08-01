'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Mail, PackageCheck, Truck } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { useHydrated } from '@/hooks/useHydrated'
import { formatPrice } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { PaymentInstructions, type OrderPayment } from './PaymentInstructions'

interface OrderSnapshot {
  orderNumber: string
  email: string
  firstName: string
  shippingMethod: string
  state: string
  subtotal: number
  payment: OrderPayment | null
  lines: { slug: string; name: string; image: string; price: number; quantity: number }[]
}

interface ConfirmationData {
  order: OrderSnapshot | null
  orderNumber: string
}

/*
 * Read once and cache. Both sources — the query string and the sessionStorage
 * snapshot the checkout wrote — are fixed for the lifetime of this page view,
 * so this is computed during render behind the hydration gate rather than
 * assigned through an effect.
 */
let cached: ConfirmationData | null = null

function readConfirmation(): ConfirmationData {
  if (cached) return cached

  const params = new URLSearchParams(window.location.search)

  let order: OrderSnapshot | null = null
  const stored = sessionStorage.getItem('ws4k-last-order')
  if (stored) {
    try {
      order = JSON.parse(stored) as OrderSnapshot
    } catch {
      // A corrupted snapshot is not worth failing the page over.
    }
  }

  cached = {
    order,
    orderNumber: params.get('order') ?? order?.orderNumber ?? '',
  }
  return cached
}

export function OrderConfirmation() {
  const hydrated = useHydrated()

  // The checkout clears the cart itself once the order is accepted, so there
  // is nothing to reconcile here.
  const data = hydrated ? readConfirmation() : null

  if (!data) {
    return <p className="py-16 text-center text-ink/60">Confirming your order…</p>
  }

  const { order, orderNumber } = data

  if (!orderNumber && !order) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/40 p-10 text-center">
        <h1 className="text-3xl">No recent order found</h1>
        <p className="mx-auto mt-3 max-w-lg text-ink/75">
          We could not find an order in this browser session. If you have just paid, your
          confirmation email is the record — check your inbox. Otherwise, give us a call and we will
          look it up.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop">Back to the shop</ButtonLink>
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="font-bold text-splash-blue-ink underline underline-offset-4"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-3xl border-2 border-lime-pop/40 bg-lime-pop/10 p-8 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto mb-4 h-16 w-16 text-lime-ink" />
        <h1 className="text-3xl sm:text-4xl">
          {order?.firstName ? `Thanks, ${order.firstName}!` : 'Order placed!'}
        </h1>
        <p className="mt-3 text-lg text-ink/80">
          Order number{' '}
          <span className="font-extrabold text-deep-blue">{orderNumber || order?.orderNumber}</span>
        </p>
        {order?.email ? (
          <p className="mt-2 text-ink/70">A confirmation is on its way to {order.email}.</p>
        ) : null}
      </div>

      {order?.payment ? (
        <PaymentInstructions
          payment={order.payment}
          orderNumber={orderNumber || order.orderNumber}
          amount={order.subtotal}
        />
      ) : null}

      {order && order.lines.length > 0 ? (
        <div className="mt-8 rounded-3xl border-2 border-sky-tint bg-white p-6">
          <h2 className="text-xl">What you ordered</h2>
          <ul className="mt-4 divide-y divide-sky-tint">
            {order.lines.map((line) => (
              <li key={line.slug} className="flex items-center gap-3 py-3">
                <Link
                  href={`/shop/${line.slug}`}
                  className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-sky-tint"
                >
                  <Image
                    src={line.image}
                    alt={`${line.name} — commercial inflatable water slide`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/shop/${line.slug}`} className="font-bold hover:text-splash-blue-ink">
                    {line.name}
                  </Link>
                  <p className="text-sm text-ink/60">Qty {line.quantity}</p>
                </div>
                <p className="font-extrabold text-hot-coral">
                  {formatPrice(line.price * line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t-2 border-sky-tint pt-4 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-bold">{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="font-bold text-lime-ink">Free</dd>
            </div>
            <div className="flex justify-between text-lg">
              <dt className="font-extrabold">Total</dt>
              <dd className="font-extrabold">{formatPrice(order.subtotal)}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      <div className="mt-8 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6">
        <h2 className="text-xl">What happens next</h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-3">
            <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
            <span>
              <strong className="block">Send your payment</strong>
              Use the instructions above and quote your order number. Nothing has been charged — we only ship once payment clears.
            </span>
          </li>
          <li className="flex gap-3">
            <PackageCheck
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink"
            />
            <span>
              <strong className="block">We confirm and pack — 1 to 3 business days after payment</strong>
              Your blower, stakes, storage bag and patch kit ship in the same carton.
            </span>
          </li>
          <li className="flex gap-3">
            <Truck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
            <span>
              <strong className="block">Tracking and delivery — 3 to 10 business days</strong>
              Tracking is emailed the moment it leaves us. Larger units ship by freight and the
              carrier will call to arrange a window, which is why we asked for your phone number.
            </span>
          </li>
        </ol>

        <p className="mt-6 text-sm text-ink/70">
          Questions about this order? Call{' '}
          <a href={`tel:${siteConfig.phoneE164}`} className="font-bold text-splash-blue-ink underline">
            {siteConfig.phone}
          </a>{' '}
          ({siteConfig.hours}) or email{' '}
          <a href={`mailto:${siteConfig.supportEmail}`} className="font-bold text-splash-blue-ink underline">
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href="/blog/inflatable-water-slide-safety-checklist" variant="secondary">
          Read the setup &amp; safety checklist
        </ButtonLink>
        <ButtonLink href="/shop" variant="ghost">
          Keep shopping
        </ButtonLink>
      </div>
    </div>
  )
}
