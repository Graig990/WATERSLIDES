'use client'

import { useEffect, useState } from 'react'
import { AddToCartButton } from './AddToCartButton'
import { formatPrice } from '@/lib/utils'
import type { ProductCardData } from '@/data/types'

/**
 * Mobile-only sticky purchase bar. Appears once the main Add to Cart button
 * has scrolled out of view, so it never duplicates a visible control.
 */
export function StickyAddToCart({ product }: { product: ProductCardData }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const anchor = document.getElementById('pdp-buy-box')
    if (!anchor) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry ? !entry.isIntersecting : false),
      { rootMargin: '0px 0px -40% 0px' },
    )
    observer.observe(anchor)
    return () => observer.disconnect()
  }, [])

  if (product.price === null || product.stock === 'out-of-stock') return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-sky-tint bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-deep-blue">{product.shortName}</p>
          <p className="text-lg font-extrabold text-hot-coral">{formatPrice(product.price)}</p>
        </div>
        <div className="w-[55%] shrink-0">
          <AddToCartButton product={product} label="Add" />
        </div>
      </div>
    </div>
  )
}
