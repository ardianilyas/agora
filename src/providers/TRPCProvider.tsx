'use client'

import { handleTrpcError } from "@/lib/trpcErrorHandler";
import { trpc, trpcClientOptions } from "@/utils/trpc";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function TRPCProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => {
        const qc = new QueryClient({
            queryCache: new QueryCache({
                onError: (error) => handleTrpcError(error),
            }),
            mutationCache: new MutationCache({
                onError: (error) => handleTrpcError(error),
            }),
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false
                },
            },
        });
        return qc;
    });

    const [trpcClient] = useState(() =>
        trpc.createClient({
            ...trpcClientOptions,
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}