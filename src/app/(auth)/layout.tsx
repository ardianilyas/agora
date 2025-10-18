import React from 'react'

type Props = {
    children: React.ReactNode
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className='flex items-center justify-center h-screen bg-neutral-100'>
            <div className="max-w-lg bg-white rounded-md shadow-md p-6 w-full">
                {children}
            </div>
        </div>
    )
}