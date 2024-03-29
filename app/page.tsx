import ShoppingCard from "@/components/home/shopping-card";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useEffect, useState } from "react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Shop from "@/components/home/shop";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <Shop session={session} />;
}
