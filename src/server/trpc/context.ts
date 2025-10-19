/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { headers } from "next/headers";

export const createContext = async (opts?: CreateNextContextOptions) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return { 
        session,
        prisma,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;