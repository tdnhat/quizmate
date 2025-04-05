import { useState, useEffect } from "react";
import QuizSessionHubConnection from "@/services/signalr/hubs/quizSessionHub";

interface UseQuizConnectionParams {
    token: string | null;
    sessionId: string;
}

interface UseQuizConnectionResult {
    hubConnection: QuizSessionHubConnection | null;
    isConnecting: boolean;
    error: string | null;
}

/**
 * Hook to manage the SignalR connection for a quiz session
 */
export const useQuizConnection = ({
    token,
    sessionId,
}: UseQuizConnectionParams): UseQuizConnectionResult => {
    const [hubConnection, setHubConnection] =
        useState<QuizSessionHubConnection | null>(null);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !sessionId) return;

        let mounted = true;
        const connection = new QuizSessionHubConnection(token);
        console.log(
            "Initializing hub connection with token:",
            token ? "Token exists" : "No token"
        );

        const initConnection = async () => {
            try {
                setIsConnecting(true);
                setError(null);
                console.log("Starting connection...");
                const success = await connection.start();

                if (success && mounted) {
                    console.log(
                        "Connection successful, joining session:",
                        sessionId
                    );
                    setHubConnection(connection);

                    try {
                        await connection.joinSession(sessionId);
                        console.log("Successfully joined session");
                    } catch (joinErr) {
                        console.error("Error joining session:", joinErr);
                        setError(
                            "Failed to join session: " +
                                (joinErr instanceof Error
                                    ? joinErr.message
                                    : String(joinErr))
                        );
                        connection.stop();
                        setHubConnection(null);
                    }
                } else if (mounted) {
                    console.error("Failed to establish connection");
                    setHubConnection(null);
                    setError("Failed to establish connection to the server");
                }
            } catch (err) {
                if (mounted) {
                    console.error("Error connecting to session hub:", err);
                    setError(
                        "Error connecting to session hub: " +
                            (err instanceof Error ? err.message : String(err))
                    );
                    setHubConnection(null);
                }
            } finally {
                if (mounted) {
                    setIsConnecting(false);
                }
            }
        };

        initConnection();

        return () => {
            mounted = false;
            console.log("Cleaning up connection");
            connection.stop();
        };
    }, [token, sessionId]);

    return {
        hubConnection,
        isConnecting,
        error,
    };
};
