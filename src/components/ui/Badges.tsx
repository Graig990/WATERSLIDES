import { formatPrice } from '@/lib/utils'
import type { StockStatus } from '@/data/types'

const STOCK_STYLES: Record<StockStatus, { label: string; className: string }> = {
  // Lime and yellow only clear AA as dark text on a tinted background,
  // never as light text on the raw brand color.
  'in-stock': { label: 'In Stock', className: 'bg-lime-pop/25 text-lime-ink' },
  'pre-order': { label: 'Pre-Order', className: 'bg-sunny-yellow/40 text-ink' },
  'out-of-stock': { label: 'Out of Stock', className: 'bg-ink/10 text-ink/70' },
}

export function StockPill({ status }: { status: StockStatus }) {
  const { label, className } = STOCK_STYLES[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

export function SaveBadge({ amount }: { amount: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-hot-coral px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase">
      Save {formatPrice(amount)}
    </span>
  )
}

/** Starburst for `isNew` products. */
export function NewBurst({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-grid h-14 w-14 place-items-center ${className}`}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow"
      >
        <path
          fill="#FFD400"
          d="M50 2 60 18 78 12 78 31 96 36 85 50 96 64 78 69 78 88 60 82 50 98 40 82 22 88 22 69 4 64 15 50 4 36 22 31 22 12 40 18Z"
        />
      </svg>
      <span className="relative text-[11px] font-extrabold text-ink">NEW!</span>
    </span>
  )
}

export function BestValueBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-grape px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase">
      Best Value
    </span>
  )
}
