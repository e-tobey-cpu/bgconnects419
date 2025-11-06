import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"; // uses your shared client

export const runtime = "nodejs";           // Stripe needs Node runtime
export const dynamic = "force-dynamic";    // no caching
export const revalidate = 0;               // disable ISR

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  // get the raw body text (important!)
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    // ✅ handle any event types you want below
    // switch (event.type) {
    //   case "checkout.session.completed":
    //     // your logic here
    //     break;
    // }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("⚠️ Stripe webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
