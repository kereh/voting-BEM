import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type Adapter } from "next-auth/adapters";
import { db } from "@/server/db";
import NextAuth from "next-auth";
import authConfig from "auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
