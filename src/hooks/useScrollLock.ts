'use client'

import { useEffect } from 'react'

/**
 * Prevents the page behind a modal or overlay from scrolling.
 *
 * `overflow: hidden` on <body> alone is not enough — iOS Safari ignores it
 * and happily scrolls the page underneath, which is the single most common
 * complaint about overlays on phones. Pinning the body with `position: fixed`
 * is the reliable approach, at the cost of losing the scroll offset, so the
 * offset is captured on lock and restored on release.
 *
 * The cleanup runs on unmount as well as on unlock, so an overlay that
 * disappears while open can never leave the page frozen.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const scrollY = window.scrollY

    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow

      // Jumping back is instant; 'auto' avoids the page smooth-scrolling
      // back into place, which reads as a glitch.
      window.scrollTo({ top: scrollY, behavior: 'auto' })
    }
  }, [locked])
}
