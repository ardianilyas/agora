import { AppRouter } from "@/server/trpc/routers/_app";
import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClientOptions = {
    links: [
        loggerLink(),
        httpBatchLink({
            url: "/api/trpc",
            transformer: superjson,
        }),
    ],
};