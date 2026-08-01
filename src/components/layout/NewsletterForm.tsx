'use client'

import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterForm({
  variant = 'footer',
  className,
}: {
  variant?: 'footer' | 'band'
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data: { ok?: boolean; message?: string } = await response.json()

      if (!response.ok || !data.ok) {
        setStatus('error')
        setMessage(data.message ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'You are subscribed.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const inputId = `newsletter-${variant}`
  const onBand = variant === 'band'

  if (status === 'success') {
    return (
      <p
        role="status"
        className={cn(
          'flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold',
          onBand ? 'bg-white text-ink' : 'bg-white/15 text-white',
          className,
        )}
      >
        <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className={cn('flex gap-2', onBand ? 'flex-col sm:flex-row' : 'flex-col')}>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-describedby={status === 'error' ? `${inputId}-error` : undefined}
          className={cn(
            'min-h-[44px] w-full rounded-2xl border-2 px-4 text-base',
            onBand
              ? 'border-white bg-white text-ink placeholder:text-ink/40'
              : 'border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-sunny-yellow',
          )}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-2xl px-6 font-extrabold transition disabled:opacity-60',
            onBand
              ? 'bg-ink text-white hover:bg-deep-blue'
              : 'bg-sunny-yellow text-ink hover:brightness-105',
          )}
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          {status === 'submitting' ? 'Sending…' : 'Get $50 Off'}
        </button>
      </div>
      {status === 'error' ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className={cn('mt-2 text-sm font-semibold', onBand ? 'text-white' : 'text-sunny-yellow')}
        >
          {message}
        </p>
      ) : null}
      <p className={cn('mt-2 text-xs', onBand ? 'text-white/90' : 'text-white/60')}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
