'use client'

import { useSyncExternalStore } from 'react'

/** Nothing to subscribe to — these values never change after hydration. */
const NEVER_CHANGES = () => () => {}

/**
 * False during SSR and the first client render, true afterwards.
 *
 * The cart is restored from localStorage, so anything that renders cart
 * contents must wait for this or the first paint will not match the HTML
 * the server sent.
 *
 * Implemented with useSyncExternalStore rather than an effect that calls
 * setState — React treats the differing server and client snapshots as a
 * hydration signal directly, without a cascading second render.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    NEVER_CHANGES,
    () => true,
    () => false,
  )
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/**
 * Tracks the user's reduced-motion preference, and keeps tracking it — the
 * setting can be changed while the page is open.
 *
 * Returns false on the server, which is the safe default: markup renders
 * identically either way and CSS already strips animation via the
 * prefers-reduced-motion media query.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}
