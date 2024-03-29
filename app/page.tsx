import ShoppingCard from "@/components/home/shopping-card";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useEffect, useState } from "react";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import Shop from "@/components/home/shop";
import CognitoProvider from "next-auth/providers/cognito";

export default async function Home() {
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

  return <Shop session={session} />;
}
