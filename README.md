# BGConnects

BGConnects is a marketplace that connects buyers with on‑campus sellers for services like haircuts, tutoring and event help.  It is built with the [Next.js](https://nextjs.org/) App Router, TypeScript, Tailwind CSS, [Supabase](https://supabase.com/) for auth/storage/database, and [Stripe Connect](https://stripe.com/connect) for payments.  This project is designed to be easily run locally and deployed on [Vercel](https://vercel.com/).  Feel free to fork this repo and customise it for your own campus community.

## Quick Start

1. **Clone** the repository and install dependencies:

   ```sh
   git clone <repository-url> bgconnects
   cd bgconnects
   cp .env.example .env.local
   npm install
   npm run dev
   ```

2. **Visit** `http://localhost:3000` in your browser.  You should see the landing page.  Browse services at `/browse` or sign up using the Auth pages.

3. **Configure environment variables** (see the table below).  At a minimum you need your Supabase project URL/anon key.  For payments you need Stripe keys; for email you need SendGrid/Postmark/Nodemailer credentials.  Optional integrations (Google/Microsoft Calendar, Twilio, Stripe Tax) can be toggled via env vars.

4. **Run migrations and seed data** via:

   ```sh
   npm run db:migrate
   npm run seed
   ```

   The migration script creates all database tables and RLS policies.  The seed script inserts a demo seller and sample service so that `/browse` is not empty.

5. **Deploy** to Vercel: push your code to GitHub and create a new Vercel project.  Vercel will detect the Next.js app and build it automatically.  Set all environment variables in the Vercel dashboard, then hit deploy.

## Environment Variables

All required and optional configuration is surfaced via environment variables.  Copy `.env.example` to `.env.local` and fill in the blanks.  The following table describes each variable:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL (e.g. `https://xyzcompany.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase public anon key used by the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key used on the server for admin tasks (never expose this to the client) |
| `STRIPE_SECRET_KEY` | ✅ | Secret API key from Stripe |
| `STRIPE_PUBLISHABLE_KEY` | ✅ | Publishable key from Stripe |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Webhook signing secret used to verify webhook events |
| `STRIPE_TAX_ENABLED` | ⬜ | Set to `true` to enable Stripe Tax (defaults to `false`) |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | ⬜ | Default currency (e.g. `USD`); supports multi‑currency |
| `SENDGRID_API_KEY`/`POSTMARK_TOKEN`/SMTP | ⬜ | One of these is required to send confirmation emails |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` | ⬜ | Enable SMS reminders/notifications via Twilio |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | ⬜ | Enable Google Calendar sync for sellers |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | ⬜ | Enable Microsoft Outlook Calendar sync |
| `OAUTH_REDIRECT_URL` | ⬜ | Redirect URL for OAuth providers (e.g. `https://bgconnect.biz/api/auth/callback`) |

Optional values may be omitted; the app will gracefully fall back to in‑app availability for bookings or skip tax calculation if those integrations are not configured.

## Migrations & Seed Data

Migrations live in `supabase/migrations`.  They are idempotent SQL files that create all necessary tables and policies.  Run `npm run db:migrate` to apply them.  The seed script (`npm run seed`) uses the Supabase service key to insert a demo seller, service and buyer.  It is safe to run multiple times as it checks for existing records.

## Enable Optional Integrations

The app includes hooks for optional integrations.  These features remain dormant unless their corresponding environment variables are set.

* **Google/Microsoft Calendar** – Sellers can link their calendars to avoid double‑booking.  Set the client IDs/secrets and `OAUTH_REDIRECT_URL` to enable OAuth flows.  Without them the booking page falls back to the seller’s in‑app availability schedule.
* **Stripe Tax** – When `STRIPE_TAX_ENABLED=true`, checkout requests to Stripe will include tax behaviour and the UI will display tax lines.  Without it, prices are tax inclusive and no additional tax is calculated.
* **Twilio** – SMS notifications and reminders are supported if all Twilio credentials are present.  Otherwise emails alone will be sent.

## Admin Lite

The application includes a minimal admin interface at `/admin`.  Users with the `admin` flag in their profile can:

* View and deactivate services.
* View all bookings and issue refunds via a Stripe Dashboard link.
* Manage coupon codes.

By default no one is an admin.  You can manually update a user’s profile in Supabase to set `role = 'admin'`.

## Development Notes

This codebase uses the Next.js App Router and server components wherever possible.  API routes live in `app/api` and use [Zod](https://github.com/colinhacks/zod) for input validation.  Styling is provided by [Tailwind CSS](https://tailwindcss.com).  Custom UI primitives live in the `components` directory, so no external UI library is required.

On first install the app will not find any services and `/browse` will show “No services yet.”.  Running the seed script fixes this.  You can also create new services via the `/account` page once logged in as a seller.

Testing uses [Vitest](https://vitest.dev/) and there is a minimal smoke test for Supabase helpers and one API route in `tests`.

## What I built & how to run it

This repository contains a full‑stack marketplace application connecting buyers and sellers.  It features user authentication, service search with filters, dynamic booking with Stripe payments, review & rating system, in‑app messaging, availability management, coupon codes, optional tax/multi‑currency support, image uploads, an admin interface and legal pages.  The project is type‑safe with Zod validation and uses server components where appropriate.

Running locally requires Node.js ≥ 18.  Copy `.env.example` to `.env.local`, fill in your Supabase/Stripe keys, then run `npm install` followed by `npm run dev`.  Migrations and seeds are optional but recommended before browsing.  Once configured you can deploy to Vercel with the same environment variables.

## Assumptions / trade‑offs

* Some optional integrations (Google/Microsoft Calendar, Twilio, Stripe Tax) are disabled by default and require manual configuration.
* The skeleton code includes placeholders and simplified logic for brevity; you may need to adjust queries or UI for your real use case.
* Rate‑limiting, advanced error handling and unit tests are minimal and should be expanded in production.
* RLS policies assume that user IDs in Supabase match authenticated users; adapt them if your auth provider differs.
* This starter uses Supabase storage for image uploads; you can swap it with another provider if desired.
