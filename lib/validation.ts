import { z } from 'zod'

/**
 * Validation schemas for API inputs.  These schemas define the shape of data
 * accepted by the API routes.  Use `safeParse` on incoming JSON to verify.
 */

export const serviceInputSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10),
  price_cents: z.number().int().positive(),
  duration_minutes: z.number().int().positive(),
  category: z.string().optional(),
  image_url: z.string().url().optional()
})

export type ServiceInput = z.infer<typeof serviceInputSchema>

export const reviewInputSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().max(1000).optional()
})

export type ReviewInput = z.infer<typeof reviewInputSchema>