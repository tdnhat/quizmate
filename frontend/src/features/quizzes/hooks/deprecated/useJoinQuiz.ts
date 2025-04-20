import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getSessionByJoinCode, SessionInfo } from "../../api/sessionApi";

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
 * @deprecated Use hooks from the session folder instead
 * Hook to handle the join quiz functionality
 */
export const useJoinQuiz = ({
    joinCode,
}: UseJoinQuizParams): UseJoinQuizResult => {
    const { token, isAuthenticated, user } = useAuth();
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch session info by join code when authenticated
    useEffect(() => {
        if (!joinCode) {
            setError("No join code provided");
            setIsLoading(false);
            return;
        }

        // Don't attempt to fetch if not authenticated
        if (!isAuthenticated || !token) {
            setIsLoading(false);
            return;
        }

        const fetchSessionInfo = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getSessionByJoinCode(
                    joinCode,
                    token || undefined
                );
                setSessionInfo(data);
            } catch (err) {
                console.error("Failed to fetch session info:", err);
                const error = err as Error;
                setError(
                    error.message ||
                        "This quiz session does not exist or has already ended."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionInfo();
    }, [joinCode, token, isAuthenticated]);

    // Handle joining the quiz
    const handleJoin = (navigate: (path: string) => void) => {
        if (!isAuthenticated) {
            // Redirect to login with return URL
            navigate(
                `/login?returnUrl=${encodeURIComponent(`/join/${joinCode}`)}`
            );
            return;
        }

        // If authenticated but no session info yet, try to fetch it
        if (!sessionInfo && token) {
            setIsLoading(true);
            getSessionByJoinCode(joinCode || "", token)
                .then((data) => {
                    setSessionInfo(data);
                    navigate(`/quizzes/participate/${data.id}`);
                })
                .catch((err) => {
                    console.error("Failed to join quiz:", err);
                    const error = err as Error;
                    setError(
                        error.message ||
                            "Failed to join quiz. Please try again."
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });
            return;
        }

        // If we have session info and are authenticated, navigate to participate
        if (sessionInfo && user) {
            navigate(`/quizzes/participate/${sessionInfo.id}`);
        }
    };

    return {
        sessionInfo,
        isLoading,
        error,
        handleJoin,
    };
}; 