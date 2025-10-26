import { prisma } from "@/lib/prisma";
import { CreateTicketSchema } from "../schema/ticket.schema";
import { TicketStatus } from "@/generated/prisma";

type CreateTicketRepositoryInput = CreateTicketSchema & { requesterId: string };

async function getTickets(userId: string) {
    return await prisma.ticket.findMany({
        where: { requesterId: userId },
        include: {
            requester: {
                select: {
                    email: true,
                }
            }
        }
    });
};

async function createTicket(data: CreateTicketRepositoryInput) {
    return await prisma.ticket.create({
        data
    })
};

async function getTicket(id: string) {
    return await prisma.ticket.findUnique({
        where: { id }
    });
};

async function getAllTickets() {
    return await prisma.ticket.findMany();
};

async function getTicketByStatus(status: TicketStatus) {
    return await prisma.ticket.findMany({
        where: { status }
    });
}

export const ticketRepository = {
    getTickets,
    createTicket,
    getTicket,
    getAllTickets,
    getTicketByStatus,
}