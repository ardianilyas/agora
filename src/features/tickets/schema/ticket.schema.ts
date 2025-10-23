import { TicketStatus } from "@/generated/prisma";
import z from "zod";

export const createTicketSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
});

export const getTicketSchema = z.object({
    id: z.uuid(),
});

export const updateTicketSchema = z.object({
    id: z.uuid(),
    status: z.enum(TicketStatus),
});

export const getTicketByStatusSchema = z.object({
    status: z.enum(TicketStatus),
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
export type GetTicketSchema = z.infer<typeof getTicketSchema>;
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;
export type GetTicketByStatusSchema = z.infer<typeof getTicketByStatusSchema>;