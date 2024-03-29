import ShoppingCard from "@/components/home/shopping-card";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useEffect, useState } from "react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CartPage from "@/components/home/cart-page";
export default async function Cart() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return <CartPage session={session} />;
}
