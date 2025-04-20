import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";

export interface ParticipantJoinedEvent {
    userId: string;
    username: string;
    score: number;
    isActive: boolean;
    joinedAt: Date;
    leftAt: Date | null;
}

export interface QuestionData {
    questionIndex: number;
    questionId: string;
    text: string;
    questionType: string;
    imageUrl?: string;
    answers: {
        id: string;
        text: string;
    }[];
}

export interface AnswerResult {
    isCorrect: boolean;
    points: number;
    newScore: number;
}

export interface ScoreUpdate {
    userId: string;
    score: number;
}

export interface QuizResults {
    participants: {
        userId: string;
        username: string;
        score: number;
        rank: number;
    }[];
    quizId: string;
    quizTitle: string;
    sessionId: string;
    completedAt: string;
}

class QuizSessionHubConnection {
    public connection: HubConnection | null = null;
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async start() {
        try {
            console.log("Building SignalR connection...");
            const apiUrl =
                import.meta.env.VITE_API_URL || "http://localhost:5118";
            console.log("API URL used:", apiUrl);

            this.connection = new HubConnectionBuilder()
                .withUrl(`${apiUrl}/hubs/quiz-session`, {
                    accessTokenFactory: () => this.token,
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Debug)
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (retryContext) => {
                        const maxRetries = 5;
                        if (retryContext.previousRetryCount >= maxRetries) {
                            console.error("Max reconnection attempts reached");
                            return null;
                        }
                        const delayMs = Math.min(
                            1000 * Math.pow(2, retryContext.previousRetryCount),
                            30000
                        );
                        console.log(`Reconnecting in ${delayMs}ms...`);
                        return delayMs;
                    },
                })
                .build();

            this.connection.onreconnecting((error) => {
                console.log("Reconnecting to SignalR hub...", error);
            });

            this.connection.onreconnected((connectionId) => {
                console.log("Reconnected to SignalR hub.", connectionId);
            });

            this.connection.onclose((error) => {
                console.log("Connection closed.", error);
            });

            console.log("Attempting to start connection...");
            await this.connection.start();

            if (this.connection.state === "Connected") {
                console.log(
                    "SignalR connection started successfully and is connected"
                );
                return true;
            } else {
                console.error(
                    "Connection started but not in connected state:",
                    this.connection.state
                );
                return false;
            }
        } catch (error) {
            console.error("Error starting SignalR connection:", error);
            if (error instanceof Error) {
                console.error("Error details:", {
                    message: error.message,
                    stack: error.stack,
                });
            }
            this.connection = null;
            throw error;
        }
    }

    async stop() {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
        }
    }

    onParticipantJoined(callback: (data: ParticipantJoinedEvent) => void) {
        this.connection?.on("participantJoined", callback);
    }

    onParticipantLeft(
        callback: (data: { userId: string; username: string }) => void
    ) {
        this.connection?.on("participantLeft", callback);
    }

    onSessionStarted(callback: () => void) {
        this.connection?.on("sessionStarted", callback);
    }

    onNewQuestion(callback: (data: QuestionData) => void) {
        this.connection?.on("newQuestion", callback);
    }

    onScoreUpdate(callback: (data: ScoreUpdate) => void) {
        this.connection?.on("scoreUpdate", callback);
    }

    onQuizEnded(callback: (results: QuizResults) => void) {
        this.connection?.on("quizEnded", callback);
    }

    onSessionStateChanged(
        callback: (state: string, quizTitle: string) => void
    ) {
        this.connection?.on("sessionStateChanged", callback);
    }

    onShowingResults(callback: () => void) {
        this.connection?.on("showingResults", callback);
    }

    onQuestionCompleted(callback: () => void) {
        this.connection?.on("questionCompleted", callback);
    }

    onCurrentQuestion(callback: (data: QuestionData | null) => void) {
        this.connection?.on("currentQuestion", callback);
    }

    onAnswerResult(callback: (result: AnswerResult) => void) {
        this.connection?.on("answerResult", callback);
    }

    async joinSession(sessionId: string) {
        if (!this.connection) {
            throw new Error("Connection not established");
        }
        await this.connection.invoke("joinSession", sessionId);
    }

    async startSession(sessionId: string) {
        if (!this.connection) {
            console.error("Connection not established in startSession");
            throw new Error("Connection not established");
        }

        try {
            console.log(`Invoking startSession with sessionId: ${sessionId}`);
            await this.connection.invoke("startSession", sessionId);
            console.log("startSession invoked successfully");
        } catch (error) {
            console.error("Error in startSession:", error);
            throw error;
        }
    }

    async nextQuestion(sessionId: string) {
        if (!this.connection) {
            throw new Error("Connection not established");
        }
        await this.connection.invoke("nextQuestion", sessionId);
    }

    async endSession(sessionId: string) {
        if (!this.connection) {
            throw new Error("Connection not established");
        }
        await this.connection.invoke("endSession", sessionId);
    }

    async submitAnswer(
        sessionId: string,
        questionId: string,
        answerId: string
    ) {
        if (!this.connection) {
            throw new Error("Connection not established");
        }
        await this.connection.invoke(
            "submitAnswer",
            sessionId,
            questionId,
            answerId
        );
    }
}

export default QuizSessionHubConnection;
