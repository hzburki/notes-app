import { router } from "../trpc";
import { notesRouter } from "./notes.router";

export const appRouter = router({
  note: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
