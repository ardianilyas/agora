import { TRPCClientError } from "@trpc/react-query";
import { toast } from "sonner";

export function handleTrpcError(error: unknown) {
    if (error instanceof TRPCClientError) {
        const code = error?.data?.code;

        const message = encodeURIComponent(error.message);

        switch (code) {
            case "UNAUTHORIZED":
                toast.error("You are not signed in.");
                window.location.href = "/sign-in";
                break;
            case "FORBIDDEN":
                toast.error(error.message || "You do not have permission to access this resource.");
                window.location.href = `/403?message=${message}`;
                break;
            case "NOT_FOUND":
                toast.error(error.message || "The resource you are looking for could not be found.");
                window.location.href = `/404?message=${message}`;
                break;
            default:
                toast.error(error.message || "Unexpected error");
                break;
        };
    }
};