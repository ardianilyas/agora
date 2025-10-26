"use client"

import Subtitle from '@/components/Subtitle'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { trpc } from '@/utils/trpc'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import TicketStatus from './ui/TicketStatus'
import TicketPriority from './ui/TicketPriority'

export default function TicketList() {
    const { data: tickets, isLoading } = trpc.ticket.getTickets.useQuery();

    return (
        <>
            <div>
                <Title>Tickets</Title>
                <Subtitle>Try to create a new ticket or just solved it.</Subtitle>
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
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableCaption>Tickets</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tickets.map((ticket) => (
                                            <TableRow key={ticket.id}>
                                                <TableCell>
                                                    <Link className='text-blue-500 hover:text-blue-600 underline underline-offset-4' href={`/dashboard/tickets/${ticket.id}`}>
                                                        {ticket.id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{ticket.title}</TableCell>
                                                <TableCell>
                                                    <div className="line-clamp-2 whitespace-normal break-words">
                                                        {ticket.description}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <TicketPriority priority={ticket.priority} />
                                                </TableCell>
                                                <TableCell>
                                                    <TicketStatus status={ticket.status} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                ) : (
                    <p className="text-neutral-600">
                    No tickets found. Create a new ticket to get started.
                    </p>
                )}
            </div>
        </>
    )
}