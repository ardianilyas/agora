import { authProcedure, router } from "@/server/trpc/trpc";
import { createTicketSchema } from "../schema/ticket.schema";
import { createTicket } from "../service/ticket.service";

export const ticketRouter = router({
    getTickets: authProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticket.findMany({ 
            where: { requesterId: ctx.session?.user.id },
            orderBy: { createdAt: "desc" }, 
        });
    }),
    createTicket: authProcedure.input(createTicketSchema).mutation(async ({ ctx, input }) => {
        return await createTicket(ctx, input);
    })
})