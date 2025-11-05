import Stripe from 'stripe'

// Initialise Stripe.  Only use on the server.  The secret key must be set in env.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
})