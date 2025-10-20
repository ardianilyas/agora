import React from 'react'

type Props = {
    children: React.ReactNode
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className='h-screen w-full'>
            <div className="min-h-screen flex justify-between items-center">
                <div className='basis-5/12 bg-violet-500 p-12 min-h-screen'>
                    {/* Here the content soon */}
                </div>
                <div className="basis-7/12 bg-neutral-50 min-h-screen flex justify-center items-center">
                    <div className="max-w-md w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}