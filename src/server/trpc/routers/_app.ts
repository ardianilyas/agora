import { userRouter } from "@/features/users/server/user.routers";
import { router } from "../trpc";
import { ticketRouter } from "@/features/tickets/router/tickets.router";

export const appRouter = router({
    user: userRouter,
    ticket: ticketRouter,
    // more routers here
});

export type AppRouter = typeof appRouter;