import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Subtitle({ children }: Props) {
  return (
    <p className="text-neutral-600 text-sm leading-relaxed">
        {children}
    </p>
  )
}