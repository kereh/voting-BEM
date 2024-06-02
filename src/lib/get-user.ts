"use server";

import { db } from "@/server/db";

export async function getUser({ nim }: { nim: string }) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.nim, nim),
  });
  return user;
}
