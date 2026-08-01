'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProductCardData } from '@/data/types'

export interface CartLine {
  slug: string
  name: string
  shortName: string
  image: string
  /** Unit price in whole dollars, captured at add-to-cart time. */
  price: number
  quantity: number
}

interface CartState {
  lines: CartLine[]
  /** Slide-out drawer visibility. */
  isOpen: boolean
  /** Bumped on every add so the header badge can animate. */
  lastAddedAt: number | null

  add: (product: ProductCardData, quantity?: number) => void
  remove: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  clear: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

const MAX_QTY_PER_LINE = 10

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      lastAddedAt: null,

      add: (product, quantity = 1) =>
        set((state) => {
          // Guard: unpriced or out-of-stock items are never purchasable.
          if (product.price === null || product.stock === 'out-of-stock') return state

          const existing = state.lines.find((line) => line.slug === product.slug)
          const lines = existing
            ? state.lines.map((line) =>
                line.slug === product.slug
                  ? { ...line, quantity: Math.min(line.quantity + quantity, MAX_QTY_PER_LINE) }
                  : line,
              )
            : [
                ...state.lines,
                {
                  slug: product.slug,
                  name: product.name,
                  shortName: product.shortName,
                  image: product.image,
                  price: product.price,
                  quantity: Math.min(quantity, MAX_QTY_PER_LINE),
                },
              ]

          return { ...state, lines, isOpen: true, lastAddedAt: Date.now() }
        }),

      remove: (slug) =>
        set((state) => ({ ...state, lines: state.lines.filter((line) => line.slug !== slug) })),

      setQuantity: (slug, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { ...state, lines: state.lines.filter((line) => line.slug !== slug) }
          }
          return {
            ...state,
            lines: state.lines.map((line) =>
              line.slug === slug
                ? { ...line, quantity: Math.min(quantity, MAX_QTY_PER_LINE) }
                : line,
            ),
          }
        }),

      clear: () => set((state) => ({ ...state, lines: [], isOpen: false })),
      openDrawer: () => set((state) => ({ ...state, isOpen: true })),
      closeDrawer: () => set((state) => ({ ...state, isOpen: false })),
    }),
    {
      name: 'ws4k-cart',
      version: 1,
      // Only the line items are worth persisting — drawer state is ephemeral.
      partialize: (state) => ({ lines: state.lines }) as unknown as CartState,
    },
  ),
)

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0)
}

export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0)
}

export { MAX_QTY_PER_LINE }
