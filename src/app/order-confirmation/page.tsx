import type { Metadata } from 'next'
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Order Confirmed | WaterSlides4Kids',
  description: 'Your inflatable water slide order is confirmed.',
  path: '/order-confirmation',
  noindex: true,
})

export default function OrderConfirmationPage() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-3xl px-4">
        <OrderConfirmation />
      </div>
    </section>
  )
}
