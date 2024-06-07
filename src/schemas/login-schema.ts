import { z } from "zod";

export const loginSchema = z.object({
  nim: z
    .string()
    .min(8, { message: "Masukan NIM dengan benar" })
    .max(8, { message: "NIM Tidak Boleh Lebih Dari 8 Digit" }),
});
