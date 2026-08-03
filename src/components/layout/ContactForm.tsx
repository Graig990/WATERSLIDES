'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { contactSchema, fieldErrors } from '@/lib/validation'
import { submitForm } from '@/lib/submitForm'
import { siteConfig } from '@/data/site'

const SUBJECTS = [
  'Choosing the right slide',
  'Order status or shipping',
  'Warranty or a damaged unit',
  'Returns',
  'Rental business / multi-unit order',
  'Something else',
]

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' }

export function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'>('idle')
  const [mailto, setMailto] = useState('')
  const [message, setMessage] = useState('')

  function update(key: keyof typeof EMPTY, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = contactSchema.safeParse(form)
    if (!parsed.success) {
      const issues = fieldErrors(parsed.error)
      setErrors(issues)
      const firstKey = Object.keys(issues)[0]
      if (firstKey) document.getElementById(`contact-${firstKey}`)?.focus()
      return
    }

    // Honeypot: a filled `website` field means a bot. Report success so it
    // gets no signal, but send nothing.
    if (parsed.data.website) {
      setStatus('success')
      setMessage('Thanks — your message is with us.')
      setForm(EMPTY)
      return
    }

    setStatus('submitting')
    const result = await submitForm('contact', parsed.data)

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
    setMessage('Thanks — your message is with us and we reply within one business day.')
    setForm(EMPTY)
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-3xl border-2 border-lime-pop/40 bg-lime-pop/10 p-8 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto mb-3 h-12 w-12 text-lime-ink" />
        <h2 className="text-2xl">Message sent</h2>
        <p className="mt-2 text-ink/75">{message}</p>
      </div>
    )
  }

  /*
   * No form backend is configured, so nothing can be delivered. Say so and
   * hand over a prefilled email instead — a contact form that reports
   * success and quietly discards the enquiry is the worst possible outcome.
   */
  if (status === 'unconfigured') {
    return (
      <div
        role="alert"
        className="rounded-3xl border-2 border-sunny-yellow bg-sunny-yellow/15 p-8 text-center"
      >
        <h2 className="text-2xl">Please email us instead</h2>
        <p className="mx-auto mt-2 max-w-md text-ink/80">{message}</p>
        <a
          href={mailto}
          className="mt-5 inline-flex min-h-[48px] items-center rounded-2xl bg-ink px-6 font-extrabold text-white hover:bg-deep-blue"
        >
          Open email with your message
        </a>
        <p className="mt-4 text-sm text-ink/70">
          Or call{' '}
          <a href={`tel:${siteConfig.phoneE164}`} className="font-bold underline">
            {siteConfig.phone}
          </a>{' '}
          — {siteConfig.hours}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          value={form.name}
          onChange={(value) => update('name', value)}
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update('email', value)}
          error={errors.email}
          autoComplete="email"
        />
        <TextField
          id="phone"
          label="Phone (optional)"
          type="tel"
          value={form.phone}
          onChange={(value) => update('phone', value)}
          error={errors.phone}
          autoComplete="tel"
        />

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block font-bold">
            Subject
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update('subject', event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            className={`min-h-[44px] w-full rounded-2xl border-2 bg-white px-3 ${
              errors.subject ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue'
            }`}
          >
            <option value="">What is this about?</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="contact-subject-error" role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
              {errors.subject}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-bold">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          placeholder="Yard dimensions, ages of the riders, and what you are trying to do — that is usually enough for us to point you at the right slide."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`w-full rounded-2xl border-2 bg-white p-3 ${
            errors.message ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue'
          }`}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p role="alert" className="rounded-2xl bg-hot-coral/15 p-3 font-semibold text-hot-coral">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-sunny-yellow px-6 text-lg font-extrabold text-ink shadow-pop transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-1.5 block font-bold">
        {label}
      </label>
      <input
        id={`contact-${id}`}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `contact-${id}-error` : undefined}
        className={`min-h-[44px] w-full rounded-2xl border-2 bg-white px-3 ${
          error ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue'
        }`}
      />
      {error ? (
        <p id={`contact-${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
          {error}
        </p>
      ) : null}
    </div>
  )
}
