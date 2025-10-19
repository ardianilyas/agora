/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { SignUpSchema, signUpSchema } from "@/features/auth/schema/auth.schema"
import { signUp } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { TRPCError } from "@trpc/server"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import InputError from '@/components/InputError'
import Link from 'next/link'


export default function SignUpForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const mutation = useMutation({
        mutationFn: (data: SignUpSchema) => signUp.email(data),
        onSuccess: (res) => {
            if (!res.error) {
                toast.success("Signed up successfully.")
                router.push("/dashboard")
            } else {
                toast.error(res.error.message)
            }
        },
        onError: (error: any) => {
            if(error instanceof TRPCError) {
                toast.error(error.message)
            } else {
                toast.error("Error signing in.")
            }
        },
    })

    const onSubmit = (data: SignUpSchema) => {
        mutation.mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="[&>div]:mb-3">
                <div>
                    <Label>Name</Label>
                    <Input {...register("name")} type="text" placeholder="Agora" className={errors.email ? "border-red-400" : ""} />
                    {errors.name && <InputError>{errors.name.message}</InputError>}
                </div>
                <div>
                    <Label>Email</Label>
                    <Input {...register("email")} type="email" placeholder="agora@developer.com" className={errors.email ? "border-red-400" : ""} />
                    {errors.email && <InputError>{errors.email.message}</InputError>}
                </div>
                <div>
                    <Label>Password</Label>
                    <Input {...register("password")} type="password" placeholder="*********" className={errors.password ? "border-red-400" : ""} />
                    {errors.password && <InputError>{errors.password.message}</InputError>}
                </div>
                <div>    
                    <Button disabled={mutation.isPending} className="w-full">
                        {mutation.isPending ? "Signing up..." : "Sign up"}
                    </Button>
                </div>
            </form>
            <p className="text-sm text-neutral-600 leading-relaxed">Already have an account ? <Link className="underline underline-offset-4 text-blue-500 hover:text-blue-600" href="/sign-in">Sign in</Link> here</p>
        </div>
    )
}