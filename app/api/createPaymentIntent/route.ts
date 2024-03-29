import { NextAuthOptions, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import CognitoProvider from "next-auth/providers/cognito";

export async function POST(req: Request) {
  try {
    const authOptions: NextAuthOptions = {
      providers: [
        CognitoProvider({
          clientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_APP_CLIENT_SECRET as string,
          issuer: process.env.NEXT_PUBLIC_COGNITO_DOMAIN as string,
        }),
      ],
    };
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
