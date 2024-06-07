import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const calonRouter = createTRPCRouter({
  semua: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.calon.findMany({
      with: { suara: true },
      orderBy: (calon, { asc }) => [asc(calon.no)],
    });
  }),
  vote: protectedProcedure
    .input(
      z.object({
        calon: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      return await ctx.db
        .update(users)
        .set({ calonId: input.calon, voted: true })
        .where(eq(users.id, id))
        .returning();
    }),
});
