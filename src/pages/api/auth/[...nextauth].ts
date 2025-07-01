import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "dummy-client-id",
      clientSecret: process.env.GITHUB_SECRET || "dummy-client-secret",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 