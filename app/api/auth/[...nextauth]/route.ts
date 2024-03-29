import NextAuth, { NextAuthOptions } from "next-auth";

import CognitoProvider from "next-auth/providers/cognito";

const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_APP_CLIENT_SECRET as string,
      issuer: process.env.NEXT_PUBLIC_COGNITO_DOMAIN as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
