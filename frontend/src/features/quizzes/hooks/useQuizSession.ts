import { useState, useEffect } from "react";
import { createQuizSession } from "../api/quizSessionApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Quiz } from "@/types/quiz";

interface UseQuizSessionParams {
    quiz: Quiz;
}

interface UseQuizSessionResult {
    sessionId: string;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook to handle quiz session creation
 */
export const useQuizSession = ({
    quiz,
}: UseQuizSessionParams): UseQuizSessionResult => {
    const { token } = useAuth();
    const [sessionId, setSessionId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !quiz) return;

        const initSession = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const createdSessionId = await createQuizSession(
                    quiz.id,
                    token
                );
                console.log("Session created with ID:", createdSessionId);
                setSessionId(createdSessionId);
            } catch (err) {
                console.error("Failed to create session:", err);
                setError("Failed to create quiz session. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        initSession();
    }, [quiz, token]);

    return {
        sessionId,
        isLoading,
        error,
    };
};
