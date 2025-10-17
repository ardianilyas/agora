/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { signInSchema, type SignInSchema } from "@/features/users/schema/auth.schema"
import { signIn } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function SignIn() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: SignInSchema) => signIn.email(data),
    onSuccess: (res) => {
      if (!res.error) {
        router.push("/")
      } else {
        alert(res.error.message)
      }
    },
    onError: (error: any) => {
      console.error("Sign-in error:", error)
      alert("Error signing in.")
    },
  })

  const onSubmit = (data: SignInSchema) => {
    console.log("Submitting:", data)
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h3 className="text-2xl text-blue-400 p-12">Sign In</h3>
    </div>
  )
}