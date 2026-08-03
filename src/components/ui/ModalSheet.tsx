'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useScrollLock } from '@/hooks/useScrollLock'

/**
 * A full-screen modal built on the native <dialog> element.
 *
 * Why <dialog> rather than a div with a big z-index:
 *
 * `showModal()` promotes the element into the browser's **top layer**, which
 * paints above every other element on the page no matter what z-index they
 * carry or what stacking and containing contexts they sit in. A z-index race
 * is not winnable in general — an ancestor with a transform, filter, opacity
 * or backdrop-filter can trap a fixed child, and this site already hit that
 * once when the header's backdrop-blur collapsed the mobile menu into a 72px
 * sliver. The top layer removes the whole category of bug rather than
 * out-bidding it by one more z-index.
 */
export function ModalSheet({
  open,
  onClose,
  label,
  children,
  className = '',
}: {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)

  // Kept in a ref so the listener effect below never needs to re-subscribe.
  // Synced in an effect rather than during render — writing to a ref while
  // rendering is not safe under concurrent rendering.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  /*
   * State is synced from the DOM by observing the `open` attribute, rather
   * than by listening for `close` / `cancel`.
   *
   * Those events do not bubble and are not reliably delivered — React's
   * synthetic onClose never fired here, and a directly-attached native
   * listener did not fire either. Relying on them left React believing the
   * menu was still open after the browser had closed it, which meant the
   * scroll lock was never released (frozen page) AND the toggle became a
   * no-op, so the menu could never be reopened.
   *
   * The `open` attribute is the authoritative state and is removed on every
   * close path — Escape, backdrop dismissal, close(), or the close button —
   * so watching it catches all of them without depending on event delivery.
   */
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    const observer = new MutationObserver(() => {
      if (!dialog.open) onCloseRef.current()
    })
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] })

    const handleClick = (event: MouseEvent) => {
      // The backdrop is not a separate node; a click landing on the dialog
      // itself rather than its contents is a backdrop click.
      if (event.target === dialog) onCloseRef.current()
    }
    dialog.addEventListener('click', handleClick)

    return () => {
      observer.disconnect()
      dialog.removeEventListener('click', handleClick)
    }
  }, [])

  // Drive the element from React state. Guarded both ways so the two can
  // never fight, and so an already-open dialog is not re-shown (which throws).
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // The dialog blocks scroll on most engines, but not dependably on iOS
  // Safari, so the page is pinned explicitly as well.
  useScrollLock(open)

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`m-0 max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-ink/50 ${className}`}
    >
      {children}
    </dialog>
  )
}
