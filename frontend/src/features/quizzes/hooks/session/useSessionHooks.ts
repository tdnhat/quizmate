import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
    createQuizSession, 
    getSessionDetails, 
    getSessionByJoinCode,
    SessionInfo
} from "../../api/sessionApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Quiz } from "@/types/quiz";

// =============================================
// Types for hook params and results
// =============================================

interface UseSessionDetailsParams {
    sessionId: string;
}

interface UseSessionDetailsResult {
    joinCode: string;
    isLoading: boolean;
    error: string | null;
}

interface UseQuizSessionParams {
    quiz: Quiz;
}

interface UseQuizSessionResult {
    sessionId: string;
    hostId: string;
    isLoading: boolean;
    error: string | null;
}

interface UseJoinQuizParams {
    joinCode: string | undefined;
}

interface UseJoinQuizResult {
    sessionInfo: SessionInfo | null;
    isLoading: boolean;
    error: string | null;
    handleJoin: (navigate: (path: string) => void) => void;
}

// =============================================
// Host Session Hooks
// =============================================

/**
 * React Query mutation hook for creating a quiz session
 */
export const useCreateQuizSession = () => {
    return useMutation({
        mutationFn: (quizId: string) => createQuizSession(quizId)
    });
};

/**
 * Hook to handle quiz session creation
 * This is a wrapper around useCreateQuizSession that manages state for components
 */
export const useQuizSession = ({
    quiz,
}: UseQuizSessionParams): UseQuizSessionResult => {
    const { token } = useAuth();
    const [sessionId, setSessionId] = useState<string>("");
    const [hostId, setHostId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { mutate, isPending: isLoading } = useCreateQuizSession();

    useEffect(() => {
        if (!token || !quiz) return;

        setError(null);
        mutate(quiz.id, {
            onSuccess: (createdSessionId) => {
                console.log("Session created with ID:", createdSessionId);
                setSessionId(createdSessionId);
                setHostId(quiz.appUser?.id || "");
            },
            onError: (err) => {
                console.error("Failed to create session:", err);
                setError("Failed to create quiz session. Please try again.");
            }
        });
    }, [quiz, token, mutate]);

    return {
        sessionId,
        hostId,
        isLoading,
        error,
    };
};

/**
 * React Query hook for fetching session details
 */
export const useSessionDetailsQuery = (sessionId: string) => {
    return useQuery({
        queryKey: ['sessionDetails', sessionId],
        queryFn: () => getSessionDetails(sessionId),
        enabled: !!sessionId
    });
};

/**
 * Hook to fetch session details including join code
 * This is a wrapper around useSessionDetailsQuery that formats the data for components
 */
export const useSessionDetails = ({
    sessionId,
}: UseSessionDetailsParams): UseSessionDetailsResult => {
    const { data, isLoading, error } = useSessionDetailsQuery(sessionId);
    
    // Return formatted data for backward compatibility
    return {
        joinCode: data?.joinCode || "",
        isLoading,
        error: error ? (error as Error).message : null,
    };
};

// =============================================
// Participant Session Hooks
// =============================================

/**
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
            return failureCount < 2;
        }
    });
};

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