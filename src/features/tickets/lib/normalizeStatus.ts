import { TicketStatus } from "@/generated/prisma";

export function normalizeStatus(param: string): TicketStatus | null {
    const upper = param.toUpperCase() as TicketStatus;
    return Object.values(TicketStatus).includes(upper) ? upper : null;
}