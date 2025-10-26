'use client'

import { trpc } from '@/utils/trpc';
import TicketPriority from './ui/TicketPriority';
import TicketStatus from './ui/TicketStatus';

export default function TicketDetail({ id }: { id: string }) {
    const ticketId = id;

    const { data: ticket, isLoading } = trpc.ticket.getTicket.useQuery(
        { id: ticketId },
        { enabled: !!ticketId }
    )

    return (
        <>
            <div>
                <h1 className='text-2xl text-neutral-800 font-medium'>Ticket Detail</h1>
                <p className='text-neutral-600 text-sm leading-relaxed'>Solved the ticket as soon as possible</p>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : ticket ? (
                <div className='p-6 shadow-md rounded-md max-w-xl w-full'>
                    <div className='flex gap-2 mb-2'>
                        <div className='text-neutral-600 text-sm leading-relaxed'><TicketPriority priority={ticket.priority} /></div>
                        <div className='text-neutral-600 text-sm leading-relaxed'><TicketStatus status={ticket.status} /></div>
                    </div>
                    <h1 className='text-2xl text-neutral-800 font-medium'>{ticket.title}</h1>
                    <p className='text-neutral-600 text-sm leading-relaxed'>{ticket.description}</p>
                </div>
            ) : (
                <div>
                    <h1 className='text-2xl text-neutral-800 font-medium'>Ticket not found</h1>
                </div>
            )}
        </>
    )
}