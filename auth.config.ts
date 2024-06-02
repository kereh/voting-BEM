import "next-auth/jwt";

import type { NextAuthConfig, DefaultSession } from "next-auth";
import { loginSchema } from "@/schemas/login-schema";
import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      nim: string;
      voted: boolean | null;
    } & DefaultSession["user"];
  }

  interface User {
    nim: string;
    voted: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nim: string;
    voted: boolean | null;
  }
}

export default {
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.nim = token.nim;
        session.user.voted = token.voted;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.nim = user.nim;
        token.voted = user.voted;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: { nim: {} },
      authorize: async (creds) => {
        const { nim } = await loginSchema.parseAsync(creds);
        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.nim, nim),
        });
        if (user) return user;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
