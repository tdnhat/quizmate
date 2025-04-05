import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5118";

export interface SessionInfo {
    id: string;
    hostId: string;
    quizId: string;
    quizTitle: string;
    status: string;
}

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

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
            `${API_URL}/api/quiz-sessions/join/${joinCode}`,
            { headers }
        );

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
