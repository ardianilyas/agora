import SignUpForm from '@/features/auth/components/SignUpForm'
import AuthSubtitle from '@/features/auth/components/ui/AuthSubtitle'
import AuthTitle from '@/features/auth/components/ui/AuthTitle'
import React from 'react'

export default function SignUp() {
  return (
    <div>
        <div className="mb-3">
            <AuthTitle>Create an Account</AuthTitle>
            <AuthSubtitle>Start your journey with us — it only takes a minute.</AuthSubtitle>
        </div>
        <SignUpForm />
    </div>
  )
}