import { authProcedure, procedure, router } from "@/server/trpc/trpc";

export const userRouter = router({
    getAll: procedure.query(async () => {
        return [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Doe" },
        ];
    }),
    me: authProcedure.query(({ ctx }) => {
        return ctx.user;
    }),
})