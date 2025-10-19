/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/lib/auth";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { headers } from "next/headers";

export const createContext = async (opts?: CreateNextContextOptions) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return { 
        session,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;