'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { LogoIcon } from '@/components/ui/Logo'
import { cartSubtotal, useCartStore } from '@/store/cart'
import { useHydrated } from '@/hooks/useHydrated'
import { formatPrice } from '@/lib/utils'
import { QtyStepper } from './QtyStepper'

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const lines = useCartStore((state) => state.lines)
  const closeDrawer = useCartStore((state) => state.closeDrawer)
  const remove = useCartStore((state) => state.remove)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const hydrated = useHydrated()
  const pathname = usePathname()

  useEffect(() => {
    closeDrawer()
  }, [pathname, closeDrawer])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeDrawer])

  if (!hydrated || !isOpen) return null

  const subtotal = cartSubtotal(lines)

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/50"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b-2 border-sky-tint px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl">
            <ShoppingCart aria-hidden="true" className="h-5 w-5 text-splash-blue" />
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="grid h-11 w-11 place-items-center rounded-xl text-deep-blue hover:bg-sky-tint"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <LogoIcon size={88} className="opacity-90" />
            <p className="text-lg font-bold text-deep-blue">Your cart is empty</p>
            <p className="text-ink/70">
              Pick a slide and the summer takes care of itself.
            </p>
            <ButtonLink href="/shop" onClick={closeDrawer}>
              Shop Water Slides
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sky-tint overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-3 py-4">
                  <Link
                    href={`/shop/${line.slug}`}
                    className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-sky-tint"
                  >
                    <Image
                      src={line.image}
                      alt={`${line.name} — commercial inflatable water slide`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${line.slug}`}
                      className="block text-sm leading-snug font-bold hover:text-splash-blue-ink"
                    >
                      {line.shortName}
                    </Link>
                    <p className="mt-0.5 text-sm text-ink/60">{formatPrice(line.price)} each</p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QtyStepper
                        value={line.quantity}
                        onChange={(next) => setQuantity(line.slug, next)}
                        label={`Quantity for ${line.shortName}`}
                        size="sm"
                      />
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`Remove ${line.shortName} from cart`}
                        className="grid h-9 w-9 place-items-center rounded-lg text-ink/50 hover:bg-hot-coral/10 hover:text-hot-coral"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-extrabold text-hot-coral">
                    {formatPrice(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="shrink-0 space-y-3 border-t-2 border-sky-tint bg-sky-tint/40 px-5 py-4">
              <p className="rounded-xl bg-lime-pop/20 px-3 py-2 text-center text-sm font-bold text-lime-ink">
                🚚 Free shipping applied — every order, every state
              </p>
              <div className="flex items-center justify-between text-lg font-extrabold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/60">
                Sales tax is calculated at checkout based on your shipping address.
              </p>
              <ButtonLink href="/checkout" size="lg" className="w-full" onClick={closeDrawer}>
                Checkout
              </ButtonLink>
              <ButtonLink href="/cart" variant="ghost" className="w-full" onClick={closeDrawer}>
                View full cart
              </ButtonLink>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
