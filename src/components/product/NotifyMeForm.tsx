'use client'

import { useState, type FormEvent } from 'react'
import { BellRing, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submitForm'
import { notifySchema } from '@/lib/validation'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

/** Replaces Add to Cart on out-of-stock products. */
export function NotifyMeForm({
  productSlug,
  productName,
  compact = false,
  className,
}: {
  productSlug: string
  productName: string
  compact?: boolean
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [mailto, setMailto] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = notifySchema.safeParse({ email, productSlug, productName })
    if (!parsed.success) {
      setStatus('error')
      setMessage(parsed.error.issues[0]?.message ?? 'Enter a valid email address.')
      return
    }

    setStatus('submitting')
    const result = await submitForm('notify', parsed.data)

    if (result.status === 'unconfigured') {
      setStatus('unconfigured')
      setMailto(result.mailto)
      setMessage(result.message)
      return
    }
    if (result.status === 'error') {
      setStatus('error')
      setMessage(result.message)
      return
    }

    setStatus('success')
    setMessage(`Done — we will email you when the ${productName} is back.`)
    setEmail('')
  }

  // No form backend configured yet — say so rather than claiming success.
  if (status === 'unconfigured') {
    return (
      <p
        role="alert"
        className={cn(
          'rounded-2xl bg-sunny-yellow/25 px-3 py-2.5 text-sm font-semibold',
          className,
        )}
      >
        {message}{' '}
        <a href={mailto} className="underline">
          Email us about the {productName}
        </a>
        .
      </p>
    )
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className={cn(
          'flex items-center gap-2 rounded-2xl bg-lime-pop/20 px-3 py-2.5 text-sm font-semibold text-lime-ink',
          className,
        )}
      >
        <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
        {message}
      </p>
    )
  }

  const inputId = `notify-${productSlug}`

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-2', className)} noValidate>
      <label htmlFor={inputId} className={cn('block text-sm font-bold', compact && 'sr-only')}>
        Email me when {productName} is back in stock
      </label>
      <div className={cn('flex gap-2', compact ? 'flex-col' : 'flex-col sm:flex-row')}>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-describedby={status === 'error' ? `${inputId}-error` : undefined}
          className="min-h-[44px] w-full rounded-2xl border-2 border-sky-tint bg-white px-4 text-base text-ink placeholder:text-ink/40 focus:border-splash-blue"
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          disabled={status === 'submitting'}
          className="shrink-0"
        >
          <BellRing aria-hidden="true" className="h-4 w-4" />
          {status === 'submitting' ? 'Adding…' : 'Notify Me'}
        </Button>
      </div>
      {status === 'error' ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm font-semibold text-hot-coral">
          {message}
        </p>
      ) : null}
    </form>
  )
}
