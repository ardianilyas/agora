import Link from 'next/link'
import React from 'react'

export default function ForbiddenPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center text-center bg-background text-foreground">
      <h1 className="text-4xl font-bold text-neutral-800 mb-2">403 - Forbidden</h1>
      <p className="text-neutral-600 leading-relaxed mb-6">
        You don’t have permission to access this page.
      </p>
      <Link className="underline underline-offset-4 text-blue-500 hover:text-blue-600" href={"/dashboard"}>Back to dashboard</Link>
    </main>
  )
}