import { z } from 'zod'
import { US_STATE_CODES } from './us-states'

const email = z.string().trim().min(1, 'Email is required').email('Enter a valid email address')

export const newsletterSchema = z.object({ email })

export const notifySchema = z.object({
  email,
  productSlug: z.string().trim().min(1),
  productName: z.string().trim().min(1).max(200),
})

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email,
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(2, 'Please choose a subject').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Please give us a little more detail')
    .max(4000, 'Message is too long'),
  /** Honeypot — real users never fill this in. */
  website: z.string().max(0).optional().or(z.literal('')),
})

const zip = z
  .string()
  .trim()
  .regex(/^\d{5}(-\d{4})?$/, 'Enter a valid US ZIP code (12345 or 12345-6789)')

export const shippingAddressSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  email,
  phone: z
    .string()
    .trim()
    .min(10, 'Enter a phone number we can reach you on for delivery')
    .max(40),
  address1: z.string().trim().min(3, 'Street address is required').max(200),
  address2: z.string().trim().max(200).optional().or(z.literal('')),
  city: z.string().trim().min(2, 'City is required').max(120),
  state: z.enum(US_STATE_CODES as unknown as [string, ...string[]], {
    message: 'Choose a state',
  }),
  zip,
  shippingMethod: z.enum(['standard', 'expedited']),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
})

export const checkoutLineSchema = z.object({
  slug: z.string().trim().min(1),
  quantity: z.number().int().min(1).max(10),
})

export const checkoutSchema = z.object({
  lines: z.array(checkoutLineSchema).min(1, 'Your cart is empty'),
  customer: shippingAddressSchema,
})

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type CheckoutPayload = z.infer<typeof checkoutSchema>
export type ContactPayload = z.infer<typeof contactSchema>

/** Flatten a ZodError into `{ fieldName: firstMessage }` for inline errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.')
    if (key && !result[key]) result[key] = issue.message
  }
  return result
}
