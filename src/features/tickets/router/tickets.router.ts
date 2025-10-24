import { adminProcedure, authProcedure, router } from "@/server/trpc/trpc";
import { createTicketSchema, getTicketByStatusSchema, getTicketSchema } from "../schema/ticket.schema";
import { createTicket, getTicket, getTicketByStatus } from "../service/ticket.service";

export const ticketRouter = router({
    getTickets: authProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticket.findMany({ 
            where: { requesterId: ctx.user.id },
            orderBy: { createdAt: "desc" }, 
        });
    }),
    createTicket: authProcedure.input(createTicketSchema).mutation(async ({ ctx, input }) => {
        return await createTicket(ctx, input);
    }),
    getTicket: authProcedure.input(getTicketSchema).query(async ({ ctx, input }) => {
        const ticket = await getTicket(input.id, ctx);
        return ticket;
    }),
    getAllTickets: adminProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticket.findMany();
    }),
    getTicketByStatus: adminProcedure.input(getTicketByStatusSchema).query(async ({ ctx, input }) => {
        return await getTicketByStatus(input.status, ctx);
    }),
})