import { NextAuthOptions, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CognitoProvider from "next-auth/providers/cognito";

export async function GET(req: Request) {
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
      const cartString: any = await fetch(
        `${process.env.BACKEND_URL}/api/get-cart/${session.user?.email}`,
      )
        .then((res) => res.json())
        .catch((e) => console.log(e));
      if (cartString.length > 0) {
        let cart = JSON.parse(cartString);
        let cartToSend = {
          user_id: session.user?.email,
          cart: JSON.stringify(cart),
        };
        let result = await fetch(`${process.env.BACKEND_URL}/api/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartToSend),
        });
        console.log("UPDATE");
        return NextResponse.json({ cart }, { status: 200 });
      } else {
        console.log("CREATE");
        return NextResponse.json({}, { status: 200 });
      }
    } else {
      return NextResponse.json({}, { status: 401 });
    }
  } catch (e) {
    console.log("DIED ", e);
    return NextResponse.json({}, { status: 400 });
  }
}
