"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createTicketSchema, CreateTicketSchema } from '../schema/ticket.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '@/components/InputError'
import { Textarea } from '@/components/ui/textarea'
import Title from '@/components/Title'
import Subtitle from '@/components/Subtitle'

export default function CreateTicketForm() {
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutateAsync, isPending } = trpc.ticket.createTicket.useMutation({
    onSuccess: () => {
      toast.success("Ticket created successfully.");
      utils.ticket.getTickets.invalidate();
      router.push("/dashboard/tickets");
    },
  }); 

  const { register, handleSubmit, formState: { errors } } = useForm<CreateTicketSchema>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: { title: "", description: "" },
  });

  async function onSubmit(data: CreateTicketSchema) {
    await mutateAsync(data);
  }

  return (
    <div>
        <div>
          <Title>Create Ticket</Title>
          <Subtitle>Fill out the form below to create a new ticket.</Subtitle>
        </div>

        <div className='p-6 shadow-md rounded-md max-w-xl w-full'>
          <form onSubmit={handleSubmit(onSubmit)} className=' my-6 [&>div]:mb-3'>
              <div>
                  <Label>Title</Label>
                  <Input {...register("title")} type="text" placeholder="Enter ticket title" className={errors.title ? "border-red-400" : ""} />
                  {errors.title && <InputError>{errors.title.message}</InputError>}
              </div>
              <div>
                  <Label>Description</Label>
                  <Textarea {...register("description")} placeholder="Enter ticket description" className={errors.description ? "border-red-400" : ""} />
                  {errors.description && <InputError>{errors.description.message}</InputError>}
              </div>
              <Button type='submit' disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
              </Button>
          </form>
        </div>

    </div>
  )
}