import z from "zod";

export const createTicketSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;