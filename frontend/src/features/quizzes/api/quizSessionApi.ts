import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5118";

interface SessionDetails {
    id: string;
    joinCode: string;
    status: string;
    hostId: string;
    quizId: string;
}

/**
 * Creates a new quiz session in the backend
 */
export const createQuizSession = async (
    quizId: string,
    token: string
): Promise<string> => {
    try {
        const response = await axios.post(
            `${API_URL}/api/quiz-sessions`,
            { quizId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.id;
    } catch (error) {
        console.error("Failed to create quiz session:", error);
        throw new Error("Failed to create quiz session");
    }
};

/**
 * Gets session details including join code
 */
export const getSessionDetails = async (
    sessionId: string,
    token: string
): Promise<SessionDetails> => {
    try {
        const response = await axios.get(
            `${API_URL}/api/quiz-sessions/${sessionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to get session details:", error);
        throw new Error("Failed to get session details");
    }
};
