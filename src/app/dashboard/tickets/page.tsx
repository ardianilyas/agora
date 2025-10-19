"use client"

import { Button } from '@/components/ui/button'
import { trpc } from '@/utils/trpc'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TicketsPage() {
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
                    <ul className="space-y-4">
                    {tickets.map((ticket) => (
                        <li
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
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-neutral-600">
                    No tickets found. Create a new ticket to get started.
                    </p>
                )}
            </div>
        </>
    )
}