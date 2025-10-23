'use client'

import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export default function TicketDetail({ id }: { id: string }) {
    const ticketId = id;
    const router = useRouter();

    const { data: ticket, isLoading, error } = trpc.ticket.getTicket.useQuery(
        { id: ticketId },
        { enabled: !!ticketId }
    )

    useEffect(() => {
        if (error?.data?.code === "FORBIDDEN") {
          // ✅ UX smooth: redirect pelan ke dashboard
          const timeout = setTimeout(() => {
            toast.error(error.message);
            router.replace("/dashboard/tickets");
          }, 1000);
    
          return () => clearTimeout(timeout);
        }
    }, [error, router]);

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