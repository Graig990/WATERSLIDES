'use client'

import { useState } from 'react'
import { QtyStepper } from '@/components/cart/QtyStepper'
import { AddToCartButton } from './AddToCartButton'
import type { ProductCardData } from '@/data/types'

/** Quantity stepper + Add to Cart, kept in sync on the product page. */
export function PdpBuyBox({ product }: { product: ProductCardData }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <QtyStepper
        value={quantity}
        onChange={setQuantity}
        label={`quantity of ${product.shortName}`}
      />
      <div className="flex-1">
        <AddToCartButton product={product} quantity={quantity} size="lg" />
      </div>
    </div>
  )
}
