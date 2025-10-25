import { Context } from "@/server/trpc/context";
import { CreateTicketSchema } from "../schema/ticket.schema";
import { Role, TicketStatus } from "@/generated/prisma";
import { TRPCError } from "@trpc/server";
import { ticketRepository } from "../repository/ticket.repository";

export async function getTickets(userId: string) {
    return await ticketRepository.getTickets(userId);
}

export async function createTicket(ctx: Context, data: CreateTicketSchema) {
    if(!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized"});

    return await ticketRepository.createTicket({ ...data, requesterId: ctx.session.user.id});
};

export async function getTicket(id: string, ctx: Context) {
    const ticket = await ticketRepository.getTicket(id);

    if(!ticket) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Ticket not found" });
    };

    if(ticket.requesterId !== ctx.session?.user.id && ctx.session?.user.role !== Role.ADMIN) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You don't have access to this ticket" });
    };

    return ticket;
}

export async function getAllTickets() {
    return await ticketRepository.getAllTickets();
}

export async function getTicketByStatus(status: TicketStatus) {
    return await ticketRepository.getTicketByStatus(status);
}