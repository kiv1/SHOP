import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: Request) {
  try {
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
