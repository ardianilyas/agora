'use client'

import { trpc } from '@/utils/trpc'
import Link from 'next/link';
import React from 'react'

export default function AdminTicketsPage() {
    const { data: tickets, isLoading } = trpc.ticket.getAllTickets.useQuery();

    if(isLoading) return <div>Loading...</div>

    return (
        <div>
            <div>
                <h1 className='text-2xl text-neutral-800 font-medium'>Tickets</h1>
                <p className='text-neutral-600 text-sm leading-relaxed'>Try to create a new ticket or just solved it.</p>
            </div>

            <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets && tickets.map((ticket) => (
                    <Link href={`/dashboard/tickets/${ticket.id}`} key={ticket.id} className="p-4 border border-neutral-200 rounded-lg">
                        <h2 className="text-lg font-semibold text-neutral-800">{ticket.title}</h2>
                        <p className="text-neutral-600 text-sm leading-relaxed">{ticket.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}