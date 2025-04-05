import { useState, useEffect, useRef } from "react";
import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
    LogLevel,
} from "@microsoft/signalr";

interface UseQuizSessionHubParams {
    sessionId: string | undefined;
    token?: string;
}

interface UseQuizSessionHubResult {
    connection: HubConnection | null;
    connectionState: HubConnectionState;
    connectionError: string | null;
}

/**
 * Hook to manage the SignalR hub connection for quiz sessions
 */
export const useQuizSessionHub = ({
    sessionId,
    token,
}: UseQuizSessionHubParams): UseQuizSessionHubResult => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<HubConnectionState>(
        HubConnectionState.Disconnected
    );
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const reconnectAttempts = useRef(0);
    const MAX_RECONNECT_ATTEMPTS = 5;

    useEffect(() => {
        if (!sessionId) {
            setConnectionError("No session ID provided");
            return;
        }

        if (!token) {
            setConnectionError("Authentication token required");
            return;
        }

        // Build the hub connection
        const hubUrl = import.meta.env.VITE_API_URL || "http://localhost:5118";
        console.log(
            "Connecting to SignalR hub at:",
            `${hubUrl}/hubs/quiz-session`
        );

        const hubConnection = new HubConnectionBuilder()
            .withUrl(`${hubUrl}/hubs/quiz-session`, {
                accessTokenFactory: () => token,
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    if (
                        retryContext.previousRetryCount >=
                        MAX_RECONNECT_ATTEMPTS
                    ) {
                        return null; // Stop reconnecting after max attempts
                    }
                    return Math.min(
                        1000 * Math.pow(2, retryContext.previousRetryCount),
                        30000
                    );
                },
            })
            .configureLogging(LogLevel.Information)
            .build();

        // Set up connection state handlers
        hubConnection.onreconnecting(() => {
            console.log("SignalR reconnecting...");
            setConnectionState(HubConnectionState.Reconnecting);
            reconnectAttempts.current += 1;
        });

        hubConnection.onreconnected(() => {
            console.log("SignalR reconnected successfully");
            setConnectionState(HubConnectionState.Connected);
            reconnectAttempts.current = 0;
        });

        hubConnection.onclose((error) => {
            console.log(
                "SignalR connection closed",
                error ? `with error: ${error}` : ""
            );
            setConnectionState(HubConnectionState.Disconnected);
            if (error) {
                setConnectionError(`Connection closed with error: ${error}`);
            }
        });

        // Start the connection
        const startConnection = async () => {
            try {
                console.log("Starting SignalR connection...");
                await hubConnection.start();
                console.log("SignalR connection started successfully");
                setConnection(hubConnection);
                setConnectionState(HubConnectionState.Connected);
                setConnectionError(null);
            } catch (err) {
                const error = err as Error;
                console.error("Error starting SignalR connection:", error);
                setConnectionError(`Failed to connect: ${error.message}`);
                setConnectionState(HubConnectionState.Disconnected);
            }
        };

        startConnection();

        // Clean up the connection when the component unmounts
        return () => {
            if (hubConnection.state === HubConnectionState.Connected) {
                hubConnection.stop();
            }
        };
    }, [sessionId, token]);

    return {
        connection,
        connectionState,
        connectionError,
    };
};
