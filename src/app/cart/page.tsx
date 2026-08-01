import type { Metadata } from 'next'
import { CartView } from '@/components/cart/CartView'
import { buildMetadata } from '@/lib/seo'

// A cart is per-visitor and has no business in a search index.
export const metadata: Metadata = buildMetadata({
  title: 'Your Cart | WaterSlides4Kids',
  description: 'Review the inflatable water slides in your cart before checkout.',
  path: '/cart',
  noindex: true,
})

export default function CartPage() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl">Your Cart</h1>
        <CartView />
      </div>
    </section>
  )
}
