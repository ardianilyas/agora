'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function NoFoundPage() {
    const serachParams = useSearchParams()
    const message = serachParams.get('message')
    return (
        <main className="flex h-screen flex-col items-center justify-center text-center bg-background text-foreground">
        <h1 className="text-4xl font-bold text-neutral-800 mb-2">404 - Not Found</h1>
        <p className="text-neutral-600 leading-relaxed mb-6">
            Not Found : {message ?? 'The resource you are looking for could not be found.'}
        </p>
        <Link className="underline underline-offset-4 text-blue-500 hover:text-blue-600" href={"/dashboard"}>Back to dashboard</Link>
        </main>
    )
}