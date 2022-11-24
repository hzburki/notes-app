import { router } from "../trpc";
import { notesRouter } from "./notes.router";
import { exampleRouter } from "./example";

export const appRouter = router({
  note: notesRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
