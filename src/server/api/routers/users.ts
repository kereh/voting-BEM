import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  jumlah: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.users.findMany()).length;
  }),
});
