"use server";

import { getUser } from "@/lib/get-user";
import { signIn } from "auth";
import { AuthError } from "next-auth";

export async function login({ nim }: { nim: string }) {
  const user = await getUser({ nim: nim });

  if (!user) return { error: "NIM Tidak Terdaftar" };
  if (user.voted)
    return {
      error:
        "NIM Tidak Bisa Digunakan Kembali Karena NIM Yang Anda Masukan Sudah Pernah Digunakan Untuk Memilih",
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
