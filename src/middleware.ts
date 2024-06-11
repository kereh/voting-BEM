import { API_PREFIX, AUTH, PROTECTED } from "routes";
import NextAuth from "next-auth";
import authConfig from "auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const session = !!auth?.user;
  const api = nextUrl.pathname.startsWith(API_PREFIX);
  const login = AUTH.includes(nextUrl.pathname);
  const secret = PROTECTED.includes(nextUrl.pathname);

  if (!session && secret) return Response.redirect(new URL("/login", nextUrl));
  if (session && login) return Response.redirect(new URL("/", nextUrl));
  if (api) return;

  // return Response.json({
  //   message: "Voting sudah ditutup",
  //   from: "Panitia Pemilihan",
  // });

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
