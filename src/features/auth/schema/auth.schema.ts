import z from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, 'Password is required')
});

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email("Invalid email"),
    password: z.string().min(1, 'Password is required')
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;