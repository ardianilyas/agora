import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function ErrorLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
        {children}
    </div>
  )
}