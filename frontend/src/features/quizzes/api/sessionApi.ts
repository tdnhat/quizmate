import { api } from "@/api";
import { AxiosError } from "axios";

// Session interfaces
export interface SessionInfo {
    id: string;
    hostId: string;
    hostName: string;
    quizId: string;
    quizTitle: string;
    status: string;
}

export interface SessionDetails {
    id: string;
    joinCode: string;
    status: string;
    hostId: string;
    quizId: string;
}

// =========================================
// Session Participant APIs
// =========================================

/**
 * Get quiz session information by join code
 */
export const getSessionByJoinCode = async (
    joinCode: string,
    token?: string
): Promise<SessionInfo> => {
    try {
        if (!token) {
            throw new Error("Authentication required to join a quiz session");
        }

        const response = await api.get(`/quiz-sessions/join/${joinCode}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
            console.error("Authentication failed:", axiosError);
            throw new Error("You must be logged in to join a quiz session");
        }

        if (axiosError.response?.status === 404) {
            console.error("Session not found:", axiosError);
            throw new Error("Quiz session not found with this join code");
        }

        console.error("Failed to get session by join code:", axiosError);
        throw new Error("Unable to join quiz session. Please try again later.");
    }
};

// =========================================
// Session Host APIs
// =========================================

/**
 * Creates a new quiz session in the backend
 */
export const createQuizSession = async (quizId: string): Promise<string> => {
    try {
        const response = await api.post("/quiz-sessions", { quizId });
        return response.data.id;
    } catch (error) {
        console.error("Failed to create quiz session:", error);
        throw new Error("Failed to create quiz session");
    }
};

/**
 * Gets session details including join code
 */
export const getSessionDetails = async (sessionId: string): Promise<SessionDetails> => {
    try {
        const response = await api.get(`/quiz-sessions/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get session details:", error);
        throw new Error("Failed to get session details");
    }
}; 