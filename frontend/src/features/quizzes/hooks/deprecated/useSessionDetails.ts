import { useState, useEffect } from "react";
import { getSessionDetails } from "../../api/sessionApi";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface UseSessionDetailsParams {
    sessionId: string;
}

interface UseSessionDetailsResult {
    joinCode: string;
    isLoading: boolean;
    error: string | null;
}

/**
 * @deprecated Use hooks from the session folder instead
 * Hook to fetch session details including join code
 */
export const useSessionDetails = ({
    sessionId,
}: UseSessionDetailsParams): UseSessionDetailsResult => {
    const { token } = useAuth();
    const [joinCode, setJoinCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!token || !sessionId) return;

        const fetchSessionDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const details = await getSessionDetails(sessionId);
                console.log("Session details retrieved:", details);
                setJoinCode(details.joinCode);
            } catch (err) {
                console.error("Failed to get session details:", err);
                setError("Failed to get join code. Please refresh the page.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionDetails();
    }, [sessionId, token]);

    return {
        joinCode,
        isLoading,
        error,
    };
}; 