'use client'

import { Minus, Plus } from 'lucide-react'
import { MAX_QTY_PER_LINE } from '@/store/cart'
import { cn } from '@/lib/utils'

export function QtyStepper({
  value,
  onChange,
  label,
  size = 'md',
  min = 1,
}: {
  value: number
  onChange: (next: number) => void
  label: string
  size?: 'sm' | 'md'
  min?: number
}) {
  const buttonSize = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border-2 border-sky-tint bg-white',
        size === 'sm' ? 'gap-0' : 'gap-1',
      )}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={cn(
          'grid place-items-center rounded-lg text-deep-blue hover:bg-sky-tint disabled:opacity-30',
          buttonSize,
        )}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>

      <span
        aria-live="polite"
        className={cn('min-w-8 text-center font-extrabold', size === 'sm' ? 'text-sm' : 'text-base')}
      >
        {value}
        <span className="sr-only"> — {label}</span>
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY_PER_LINE}
        aria-label={`Increase ${label}`}
        className={cn(
          'grid place-items-center rounded-lg text-deep-blue hover:bg-sky-tint disabled:opacity-30',
          buttonSize,
        )}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  )
}
