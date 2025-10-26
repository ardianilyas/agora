import { TicketPriority as TicketPriorityType } from '@/generated/prisma'
import clsx from 'clsx'
import React from 'react'

type Props = {
    priority: TicketPriorityType
}

const PRIORITY_LABELS: Record<TicketPriorityType, string> = {
    URGENT: "Urgent",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
}
  
const PRIORITY_STYLES: Record<TicketPriorityType, string> = {
    URGENT: "bg-red-200 text-red-800 border-red-400",
    HIGH: "bg-rose-100 text-rose-700 border-rose-300",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
    LOW: "bg-green-100 text-green-700 border-green-300",
}

export default function TicketPriority({ priority }: Props) {
  return (
    <p
        className={clsx(
            "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
            PRIORITY_STYLES[priority]
        )}
    >
        {PRIORITY_LABELS[priority]}
    </p>
  )
}