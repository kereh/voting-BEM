import { z } from "zod";

export const loginSchema = z.object({
  nim: z.string().min(8, { message: "Masukan NIM dengan benar" }),
});
