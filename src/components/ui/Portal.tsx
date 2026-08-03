'use client'

import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { useHydrated } from '@/hooks/useHydrated'

/**
 * Renders children into `document.body`, escaping the parent's stacking and
 * containing blocks.
 *
 * This exists for a specific, easily-repeated bug: the site header uses
 * `backdrop-filter` for its frosted effect, and **any** backdrop-filter value
 * makes that element a containing block for `position: fixed` descendants.
 * A full-screen `fixed inset-0` overlay rendered inside the header therefore
 * resolves against the header's 72px-tall box rather than the viewport, and
 * collapses into an invisible sliver.
 *
 * Anything meant to cover the viewport must be portalled out.
 */
export function Portal({ children }: { children: ReactNode }) {
  const hydrated = useHydrated()

  // No DOM to portal into during prerender.
  if (!hydrated) return null

  return createPortal(children, document.body)
}
