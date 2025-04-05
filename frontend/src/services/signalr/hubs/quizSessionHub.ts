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
            const apiUrl = process.env.API_URL || "http://localhost:5118";
            console.log("API URL used:", apiUrl);

            this.connection = new HubConnectionBuilder()
                .withUrl(`${apiUrl}/hubs/quiz-session`, {
                    accessTokenFactory: () => this.token,
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            console.log("Attempting to start connection...");
            await this.connection.start();

            // Verify connection is established
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
            this.connection = null; // Reset connection if it failed
            return false;
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

    // For session state changes
    onSessionStateChanged(callback: (state: string, quizTitle: string) => void) {
        this.connection?.on("sessionStateChanged", callback);
    }

    // For showing results phase
    onShowingResults(callback: () => void) {
        this.connection?.on("showingResults", callback);
    }

    // For question completed event
    onQuestionCompleted(callback: () => void) {
        this.connection?.on("questionCompleted", callback);
    }

    // For participants who join mid-quiz - gets current question
    onCurrentQuestion(callback: (data: QuestionData | null) => void) {
        this.connection?.on("currentQuestion", callback);
    }

    // For participants to receive answer results
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

    // For participants to submit answers
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
