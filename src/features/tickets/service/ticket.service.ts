import { Context } from "@/server/trpc/context";
import { CreateTicketSchema } from "../schema/ticket.schema";
import { Role, TicketStatus } from "@/generated/prisma";

export async function createTicket(ctx: Context, data: CreateTicketSchema) {
    if(!ctx.session?.user) {
        throw new Error("Unauthorized");
    }

    return await ctx.prisma.ticket.create({
        data: {
            title: data.title,
            description: data.description,
            requesterId: ctx.session?.user?.id
        }
    });
};

export async function getTicket(id: string, ctx: Context) {
    const ticket = await ctx.prisma.ticket.findUnique({
        where: { id }
    });

    if(!ticket) {
        throw new Error("Ticket not found");
    };

    if(ticket.requesterId !== ctx.session?.user.id && ctx.session?.user.role !== Role.ADMIN) {
        throw new Error("You dont have permission to view this ticket");
    };

    return ticket;
}

export async function getTicketByStatus(status: TicketStatus, ctx: Context) {
    return await ctx.prisma.ticket.findMany({
        where: { status }
    });
}