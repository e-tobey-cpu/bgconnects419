import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";        // ✅ no Edge
export const dynamic = "force-dynamic"; // ✅ no caching
export const revalidate = 0;            // ✅

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  if (!sig) return new NextResponse("Missing Stripe signature", { status: 400 });

  const body = await req.text(); // raw body

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    // TODO: handle event types if needed

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
