import { useQuery } from "@tanstack/react-query";
import { getSessionByJoinCode } from "../../api/sessionApi";

/**
 * @deprecated Use hooks from the session folder instead
 * React Query hook for fetching session by join code
 */
export const useSessionByJoinCode = (joinCode: string, token?: string) => {
    return useQuery({
        queryKey: ['session', joinCode],
        queryFn: () => getSessionByJoinCode(joinCode, token),
        enabled: !!joinCode,
        retry: (failureCount, error) => {
            // Don't retry on 404 errors
            if (error instanceof Error && error.message.includes("not found")) {
                return false;
            }
            return failureCount < 3;
        }
    });
}; 