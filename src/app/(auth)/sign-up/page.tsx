import SignUpForm from '@/features/auth/components/SignUpForm'
import React from 'react'

export default function SignUp() {
  return (
    <>
        <div className="mb-3">
            <h3 className="text-2xl text-neutral-800 font-semibold">Create an Account</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">Start your journey with us — it only takes a minute.</p>
        </div>
        <SignUpForm />
    </>
  )
}