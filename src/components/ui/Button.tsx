import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'coral' | 'ghost' | 'outline-white'
type Size = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  // 44px minimum tap target, per WCAG 2.1 AA.
  'min-h-[44px]'

const VARIANTS: Record<Variant, string> = {
  // Yellow fill + ink text — the only combination of these two that clears AA.
  primary: 'bg-sunny-yellow text-ink shadow-pop hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0',
  secondary: 'bg-deep-blue text-white shadow-pop hover:bg-splash-blue hover:-translate-y-0.5 active:translate-y-0',
  coral: 'bg-hot-coral text-white shadow-pop hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'bg-white text-deep-blue border-2 border-deep-blue hover:bg-sky-tint',
  'outline-white': 'bg-white/10 text-white border-2 border-white backdrop-blur-sm hover:bg-white hover:text-deep-blue',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </Link>
  )
}
