import { describe, it, expect } from 'vitest'
import { createServiceSchema } from '../lib/validation'

describe('createServiceSchema', () => {
  it('validates a correct service payload', () => {
    const payload = {
      title: 'Test service',
      description: 'This is a test service',
      price_cents: 1000,
      duration_minutes: 60,
      categories: ['hair']
    }
    const result = createServiceSchema.safeParse(payload)
    expect(result.success).toBe(true)
  })

  it('fails with negative price', () => {
    const payload = {
      title: 'Bad service',
      description: 'No description',
      price_cents: -100,
      duration_minutes: 30
    }
    const result = createServiceSchema.safeParse(payload)
    expect(result.success).toBe(false)
  })
})