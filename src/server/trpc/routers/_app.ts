import { userRouter } from "@/features/users/server/user.routers";
import { router } from "../trpc";

export const appRouter = router({
    user: userRouter,
    // more routers here
});

export type AppRouter = typeof appRouter;