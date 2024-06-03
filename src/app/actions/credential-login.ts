"use server";

import { getUser } from "@/lib/get-user";
import { signIn } from "auth";
import { AuthError } from "next-auth";

export async function login({ nim }: { nim: string }) {
  const user = await getUser({ nim: nim });

  if (!user) return { error: "NIM Tidak Terdaftar" };
  if (user.voted)
    return {
      error: "NIM yang anda masukan sudah pernah digunakan",
    };

  try {
    await signIn("credentials", {
      nim: nim,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something Went Wrong" };
      }
    }
    throw error;
  }
}
