import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <div className="text-2xl font-semibold text-neutral-800">
        {children}
    </div>
  )
}