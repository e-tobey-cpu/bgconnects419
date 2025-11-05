import { describe, it, expect } from 'vitest'
import { serviceInputSchema } from '../lib/validation'

describe('serviceInputSchema', () => {
  it('accepts valid input', () => {
    const input = {
      title: 'Test Service',
      description: 'A nice service',
      price_cents: 1000,
      duration_minutes: 60
    }
    const result = serviceInputSchema.safeParse(input)
    expect(result.success).toBe(true)
  })
  it('rejects invalid input', () => {
    const input = {
      title: 'x',
      description: 'short',
      price_cents: -1,
      duration_minutes: 0
    }
    const result = serviceInputSchema.safeParse(input)
    expect(result.success).toBe(false)
  })
})