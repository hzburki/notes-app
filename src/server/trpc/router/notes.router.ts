import { z } from 'zod'
import { router, publicProcedure } from "../trpc"

export const notesRouter = router({
  store: publicProcedure
    .input(
      z.object({
        title: z.string().min(2, { message: "Title should have at least 2 letters" }),
        content: z
          .string()
          .min(2, { message: "Note should have at least 2 letters" }),
      }))
    .mutation(async ({ input, ctx }) => {
      console.log({ input, ctx })
      const note = await ctx.prisma.note.create({ data: input })

      return note;
    })
})