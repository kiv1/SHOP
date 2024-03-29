import { NextAuthOptions } from "next-auth";
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import CognitoProvider from "next-auth/providers/cognito";

export default async function Nav() {
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
  return <Navbar session={session} />;
}
