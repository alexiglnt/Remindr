import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"

import prisma from "../../../lib/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  // adapter: Adapter(prisma), // aller sur la doc de nextauth>adapter>prisma pour créer le fichier prismadb pour importer ici
  // https://next-auth.js.org/adapters/prisma
}

export default NextAuth(authOptions)
