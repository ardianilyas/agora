import React from 'react'

type Props = {
    children: React.ReactNode;
};

export default function AuthTitle({ children }: Props) {
  return (
    <h3 className="text-2xl text-neutral-800 font-semibold">
        {children}
    </h3>
  )
}