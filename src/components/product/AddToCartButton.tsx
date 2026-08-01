'use client'

import { useCallback, useRef, useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cart'
import type { ProductCardData } from '@/data/types'
import { cn } from '@/lib/utils'

const CONFETTI = [
  { color: '#FFD400', dx: '-46px', dr: '320deg', delay: '0ms' },
  { color: '#FF4E64', dx: '-18px', dr: '-260deg', delay: '30ms' },
  { color: '#00B4E6', dx: '12px', dr: '400deg', delay: '60ms' },
  { color: '#7ED321', dx: '38px', dr: '-180deg', delay: '20ms' },
  { color: '#8B4EFF', dx: '58px', dr: '300deg', delay: '80ms' },
  { color: '#0057B8', dx: '-62px', dr: '220deg', delay: '50ms' },
]

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = 'md',
  label = 'Add to Cart',
}: {
  product: ProductCardData
  quantity?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
}) {
  const add = useCartStore((state) => state.add)
  const [burst, setBurst] = useState(0)
  const [justAdded, setJustAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = useCallback(() => {
    add(product, quantity)
    setBurst((n) => n + 1)
    setJustAdded(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setJustAdded(false), 1600)
  }, [add, product, quantity])

  const disabled = product.price === null || product.stock === 'out-of-stock'

  return (
    <div className={cn('relative', className)}>
      {/* Confetti burst. Keyed so each click restarts the animation. */}
      {burst > 0 ? (
        <span key={burst} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center">
          {CONFETTI.map((piece, index) => (
            <span
              key={index}
              className="absolute h-2 w-2 rounded-[2px]"
              style={{
                backgroundColor: piece.color,
                animation: 'confetti-fall 900ms ease-out forwards',
                animationDelay: piece.delay,
                ['--dx' as string]: piece.dx,
                ['--dr' as string]: piece.dr,
              }}
            />
          ))}
        </span>
      ) : null}

      <Button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        size={size}
        className="w-full"
        aria-label={`${label}: ${product.name}`}
      >
        {justAdded ? (
          <>
            <Check aria-hidden="true" className="h-5 w-5" />
            Added!
          </>
        ) : (
          <>
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
            {label}
          </>
        )}
      </Button>

      {/* Announced to screen readers, which never see the confetti. */}
      <span role="status" aria-live="polite" className="sr-only">
        {justAdded ? `${product.name} added to your cart` : ''}
      </span>
    </div>
  )
}
