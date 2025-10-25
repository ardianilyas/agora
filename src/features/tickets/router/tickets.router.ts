import { adminProcedure, authProcedure, router } from "@/server/trpc/trpc";
import { createTicketSchema, getTicketByStatusSchema, getTicketSchema } from "../schema/ticket.schema";
import { createTicket, getAllTickets, getTicket, getTicketByStatus, getTickets } from "../service/ticket.service";

export const ticketRouter = router({
    getTickets: authProcedure.query(async ({ ctx }) => {
        return await getTickets(ctx.session?.user?.id ?? "");
    }),
    createTicket: authProcedure.input(createTicketSchema).mutation(async ({ ctx, input }) => {
        return await createTicket(ctx, input);
    }),
    getTicket: authProcedure.input(getTicketSchema).query(async ({ ctx, input }) => {
        const ticket = await getTicket(input.id, ctx);
        return ticket;
    }),
    getAllTickets: adminProcedure.query(async () => {
        return await getAllTickets();
    }),
    getTicketByStatus: adminProcedure.input(getTicketByStatusSchema).query(async ({ input }) => {
        return await getTicketByStatus(input.status);
    }),
})