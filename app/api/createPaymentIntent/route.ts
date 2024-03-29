import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const item = await req.json();
      console.log(parseFloat(item.total));
      const total = Math.round(parseFloat(item.total) * 100);
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      let paymentIntent: Stripe.PaymentIntent;
      paymentIntent = await stripe.paymentIntents.create({
        currency: "SGD",
        amount: total,
        automatic_payment_methods: { enabled: true },
        metadata: { email: session.user?.email! },
      });
      return NextResponse.json(
        { clientSecret: paymentIntent.client_secret },
        { status: 200 },
      );
    } else {
      return NextResponse.json({}, { status: 401 });
    }
  } catch (e) {
    console.log("DIED ", e);
    return NextResponse.json({}, { status: 400 });
  }
}
