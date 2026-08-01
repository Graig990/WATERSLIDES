'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { LogoIcon } from '@/components/ui/Logo'
import { QtyStepper } from './QtyStepper'
import { cartSubtotal, useCartStore } from '@/store/cart'
import { useHydrated } from '@/hooks/useHydrated'
import { formatPrice } from '@/lib/utils'

export function CartView() {
  const lines = useCartStore((state) => state.lines)
  const remove = useCartStore((state) => state.remove)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const clear = useCartStore((state) => state.clear)
  const hydrated = useHydrated()

  // The cart lives in localStorage, so nothing can render until the client
  // has read it — otherwise the first paint contradicts the server HTML.
  if (!hydrated) {
    return <p className="py-16 text-center text-ink/60">Loading your cart…</p>
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/40 px-6 py-16 text-center">
        <LogoIcon size={110} />
        <h2 className="text-2xl">Your cart is empty</h2>
        <p className="max-w-md text-ink/70">
          Twenty-six commercial-grade slides, all with free shipping and a blower in the box. Pick
          one and the summer takes care of itself.
        </p>
        <ButtonLink href="/shop" size="lg">
          Shop Water Slides
        </ButtonLink>
      </div>
    )
  }

  const subtotal = cartSubtotal(lines)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <div>
        <ul className="divide-y-2 divide-sky-tint rounded-3xl border-2 border-sky-tint bg-white">
          {lines.map((line) => (
            <li key={line.slug} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Link
                href={`/shop/${line.slug}`}
                className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-sky-tint sm:h-24 sm:w-32"
              >
                <Image
                  src={line.image}
                  alt={`${line.name} — commercial inflatable water slide`}
                  fill
                  sizes="(min-width: 640px) 128px, 92vw"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${line.slug}`}
                  className="font-bold text-deep-blue hover:text-splash-blue-ink"
                >
                  {line.name}
                </Link>
                <p className="mt-1 text-sm text-ink/60">{formatPrice(line.price)} each</p>
                <div className="mt-3">
                  <QtyStepper
                    value={line.quantity}
                    onChange={(next) => setQuantity(line.slug, next)}
                    label={`quantity of ${line.shortName}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-xl font-extrabold text-hot-coral">
                  {formatPrice(line.price * line.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-ink/60 hover:bg-hot-coral/10 hover:text-hot-coral"
                >
                  <Trash2 aria-hidden="true" className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/shop" className="font-bold text-splash-blue-ink underline underline-offset-4">
            ← Continue shopping
          </Link>
          <button
            type="button"
            onClick={clear}
            className="min-h-[44px] text-sm font-bold text-ink/50 hover:text-hot-coral"
          >
            Clear cart
          </button>
        </div>
      </div>

      <aside className="rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6 lg:sticky lg:top-28">
        <h2 className="text-xl">Order summary</h2>

        <p className="mt-4 rounded-2xl bg-lime-pop/20 px-3 py-2 text-center text-sm font-bold text-lime-ink">
          🚚 Free shipping applied
        </p>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-bold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-bold text-lime-ink">Free</dd>
          </div>
          <div className="flex justify-between text-ink/70">
            <dt>Estimated tax</dt>
            <dd>Calculated at checkout</dd>
          </div>
          <div className="flex justify-between border-t-2 border-white pt-3 text-lg">
            <dt className="font-extrabold">Total</dt>
            <dd className="font-extrabold">{formatPrice(subtotal)}</dd>
          </div>
        </dl>

        <p className="mt-2 text-xs text-ink/60">
          Sales tax is added at checkout based on your shipping address, so this total may change.
        </p>

        <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
          Proceed to Checkout
        </ButtonLink>
      </aside>
    </div>
  )
}
