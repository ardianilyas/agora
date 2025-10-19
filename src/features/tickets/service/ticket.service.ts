import { Context } from "@/server/trpc/context";
import { CreateTicketSchema } from "../schema/ticket.schema";

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
}