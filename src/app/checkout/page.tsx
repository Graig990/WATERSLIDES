import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Checkout | WaterSlides4Kids',
  description: 'Complete your inflatable water slide order.',
  path: '/checkout',
  noindex: true,
})

export default function CheckoutPage() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-2 text-4xl">Checkout</h1>
        <p className="mb-8 text-ink/70">
          Free shipping is already applied. Card details are handled by Stripe, never by us.
        </p>
        <CheckoutForm />
      </div>
    </section>
  )
}
