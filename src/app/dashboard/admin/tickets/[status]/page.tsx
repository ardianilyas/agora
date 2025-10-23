import TicketsByStatus from '@/features/tickets/components/TicketsByStatus';
import { normalizeStatus } from '@/features/tickets/lib/normalizeStatus';
import { TicketStatus } from '@/generated/prisma'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function TicketByStatusPage({ params }: { params: Promise<{ status: TicketStatus }> }) {
    const { status } = await params;
    const normalized = normalizeStatus(status);

    if(!normalized) {
        notFound()
    }

    return (
        <div>
            <div>Ticket By Status : <span>{normalized}</span> </div>
            <TicketsByStatus status={normalized} />
        </div>
    )
}