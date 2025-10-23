'use client'

import { TicketStatus } from '@/generated/prisma'
import { trpc } from '@/utils/trpc'
import Link from 'next/link'
import React from 'react'

type Props = {
    status: TicketStatus
}

export default function TicketsByStatus({ status }: Props) {
    const { data: tickets, isLoading } = trpc.ticket.getTicketByStatus.useQuery({ status }); 
    
    if(isLoading) return <div>Loading tickets...</div>
    
    return (
        <div>
                {isLoading ? (
                    <div className="text-neutral-600">Loading...</div>
                ) : tickets && tickets.length > 0 ? (
                    <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tickets.map((ticket) => (
                            <Link
                            href={`/dashboard/tickets/${ticket.id}`}
                            key={ticket.id}
                            className="p-4 border border-neutral-200 rounded-lg"
                            >
                                <h2 className="text-lg font-semibold text-neutral-800">
                                    {ticket.title}
                                </h2>
                                <p className="text-sm text-neutral-600">{ticket.description}</p>
                                <span className="text-xs text-neutral-500">
                                    Status: {ticket.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-600">
                    No tickets found for status {status}.
                    </p>
                )}
            </div>
    )
}