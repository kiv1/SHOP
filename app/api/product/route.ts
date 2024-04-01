import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const allItems = await fetch(
      `${process.env.BACKEND_URL}/api/get-all-products`,
      { next: { revalidate: 3600 } },
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    return NextResponse.json({ allItems }, { status: 200 });
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }
}
