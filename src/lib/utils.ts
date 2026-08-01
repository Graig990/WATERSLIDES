export type ClassValue = string | false | null | undefined

/** Minimal class joiner — enough for conditional classes without a dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? usd.format(amount) : usdCents.format(amount)
}

export function formatDate(iso: string): string {
  // Fixed UTC formatting so server and client render identical strings.
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export const STOCK_LABELS = {
  'in-stock': 'In Stock',
  'pre-order': 'Pre-Order',
  'out-of-stock': 'Out of Stock',
} as const
