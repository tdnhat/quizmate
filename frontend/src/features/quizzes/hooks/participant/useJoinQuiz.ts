import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SessionInfo } from "../../api/sessionApi";
import { useSessionByJoinCode } from "./useSessionByJoinCode";

interface UseJoinQuizParams {
    joinCode: string | undefined;
}

interface UseJoinQuizResult {
    sessionInfo: SessionInfo | null;
    isLoading: boolean;
    error: string | null;
    handleJoin: (navigate: (path: string) => void) => void;
}

/**
 * Hook to handle the join quiz functionality
 */
export const useJoinQuiz = ({
    joinCode,
}: UseJoinQuizParams): UseJoinQuizResult => {
    const { token, isAuthenticated, user } = useAuth();
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Use the Query hook to fetch session data
    const { 
        data: sessionData, 
        isLoading: isQueryLoading, 
        error: queryError 
    } = useSessionByJoinCode(joinCode || "", token);

    // Update state when session data changes
    useEffect(() => {
        if (sessionData) {
            setSessionInfo(sessionData);
        }
    }, [sessionData]);

    // Update error state when query error changes
    useEffect(() => {
        if (queryError) {
            setError((queryError as Error).message || "Failed to fetch session info");
        } else if (!joinCode) {
            setError("No join code provided");
        } else {
            setError(null);
        }
    }, [queryError, joinCode]);

    // Handle joining the quiz
    const handleJoin = (navigate: (path: string) => void) => {
        if (!isAuthenticated) {
            // Redirect to login with return URL
            navigate(
                `/login?returnUrl=${encodeURIComponent(`/join/${joinCode}`)}`
            );
            return;
        }

        // If we have session info and are authenticated, navigate to participate
        if (sessionInfo && user) {
            navigate(`/quizzes/participate/${sessionInfo.id}`);
            return;
        }

        // If authenticated but no session info yet, try loading it
        if (!sessionInfo && token && joinCode) {
            // The query will handle loading the data
            // The useEffect will update sessionInfo when data arrives
        }
    };

    return {
        sessionInfo,
        isLoading: isQueryLoading,
        error,
        handleJoin,
    };
}; 