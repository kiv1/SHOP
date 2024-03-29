import ShoppingCard from "@/components/home/shopping-card";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useEffect, useState } from "react";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CartPage from "@/components/home/cart-page";
import CognitoProvider from "next-auth/providers/cognito";

export default async function Cart() {
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
  if (!session) {
    redirect("/");
  }

  return <CartPage session={session} />;
}
