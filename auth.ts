/* auth.ts is for handling authentication system */

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./lib/db";
import client from "./lib/db/client";
import User from "./lib/db/models/user.model";
import Google from "next-auth/providers/google";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

// Modifying the existing module by extending the default "Session" to include the role property of user.
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

// Main function for authentication system
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Maximum age of the session cookie (30 days).
  },
  adapter: MongoDBAdapter(client), // Connect to mongodb adapter (acting as a bridge between next-auth and mongodb).
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),

    // Allows users to sign in using credentials (email and password) and store in database.
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },

      // Handles the authorization process for credentials provider (when user sign in with email and password).
      async authorize(credentials) {
        await connectToDatabase();
        if (credentials == null) return null;

        const user = await User.findOne({ email: credentials.email });

        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  // Main function that are called at different stages of the authentication process.
  callbacks: {
    // Called When jwt is created (sign-in) or updated (sign-out).
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await connectToDatabase();
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split("@")[0],
            role: "user",
          });
        }
        token.name = user.name || user.email!.split("@")[0];
        token.role = (user as { role: string }).role;
      }

      if (session?.user?.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
    // Called When session is created or updated on the client side.
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.name = token.name;
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
});
