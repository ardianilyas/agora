/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminProcedure, authProcedure, router } from "@/server/trpc/trpc";
import { createTicketSchema, getTicketSchema } from "../schema/ticket.schema";
import { createTicket, getTicket } from "../service/ticket.service";
import { TRPCError } from "@trpc/server";

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
        try {
            const ticket = await getTicket(input.id, ctx);
            return ticket;
        } catch (error: any) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: error.message
            });
        };
    }),
    getAllTickets: adminProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticket.findMany();
    }),
})