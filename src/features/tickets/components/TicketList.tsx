"use client"

import { Button } from '@/components/ui/button'
import { trpc } from '@/utils/trpc'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TicketList() {
    const { data: tickets, isLoading } = trpc.ticket.getTickets.useQuery();

    return (
        <>
            <div>
                <h1 className='text-2xl text-neutral-800 font-medium'>Tickets</h1>
                <p className='text-neutral-600 text-sm leading-relaxed'>Try to create a new ticket or just solved it.</p>
            </div>
            <div>
                <Link href={"/dashboard/tickets/create"}>
                    <Button>
                        <PlusIcon />
                        Open ticket
                    </Button>
                </Link>
            </div>

            <div>
                {isLoading ? (
                    <div className="text-neutral-600">Loading...</div>
                ) : tickets && tickets.length > 0 ? (
                    <div className="my-4 grid grid-cols-1 md:grid-cols-2 space-x-4">
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
                    No tickets found. Create a new ticket to get started.
                    </p>
                )}
            </div>
        </>
    )
}