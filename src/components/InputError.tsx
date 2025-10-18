import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function InputError({ children }: Props) {
  return (
    <div className="text-red-400 text-sm">
        {children}
    </div>
  )
}