import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { QuizSessionState } from "../../types/quizSession";
import { useQuizSessionHub } from "../../hooks/useQuizSessionHub";

interface UseParticipateQuizParams {
    sessionId: string | undefined;
}

interface ParticipantState {
    quizTitle: string;
    currentQuestion: {
        id: string;
        text: string;
        options: {
            id: string;
            text: string;
        }[];
        timeLimit: number;
    } | null;
    selectedOption: string | null;
    sessionState: QuizSessionState;
    hasSubmitted: boolean;
    timeRemaining: number;
    feedback: {
        isCorrect?: boolean;
        points?: number;
        basePoints?: number;
        timeBonus?: number;
        timedOut?: boolean;
        timeTaken?: number;
    } | null;
    error: string | null;
    score: number;
    questionStartTime: number | null;
}

export const useParticipateQuiz = ({ sessionId }: UseParticipateQuizParams) => {
    const { token, user } = useAuth();
    const userId = user?.id;
    const [participantState, setParticipantState] = useState<ParticipantState>({
        quizTitle: "",
        currentQuestion: null,
        selectedOption: null,
        sessionState: QuizSessionState.WaitingToStart,
        hasSubmitted: false,
        timeRemaining: 0,
        feedback: null,
        error: null,
        score: 0,
        questionStartTime: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Get the hub connection
    const { connection, connectionState, connectionError } = useQuizSessionHub({
        sessionId,
        token: token || undefined,
    });

    // Handle hub connection error
    useEffect(() => {
        if (connectionError) {
            setParticipantState((prev) => ({
                ...prev,
                error: `Connection error: ${connectionError}`,
            }));
            setIsLoading(false);
        }
    }, [connectionError]);

    // Debug log for session state
    useEffect(() => {
        console.log("Current session state:", participantState.sessionState);
    }, [participantState.sessionState]);

    // Clear timer on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Handle timer and auto-submit
    useEffect(() => {
        // Only set up timer if there's an active question and we haven't submitted yet
        if (
            participantState.sessionState === QuizSessionState.Active &&
            participantState.currentQuestion &&
            !participantState.hasSubmitted &&
            participantState.timeRemaining > 0
        ) {
            // Clear any existing timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            // Set up a new timer
            timerRef.current = setInterval(() => {
                setParticipantState((prev) => {
                    // If time is up, clear the timer
                    if (prev.timeRemaining <= 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        
                        // Auto-submit if user has selected an option but not submitted yet
                        if (prev.selectedOption && !prev.hasSubmitted) {
                            submitAnswerHandler(
                                connection,
                                connectionState,
                                sessionId,
                                prev.currentQuestion?.id,
                                prev.selectedOption
                            );
                        } else if (!prev.hasSubmitted) {
                            // If no option selected, just show timeout message and move to between questions
                            return {
                                ...prev,
                                hasSubmitted: true,
                                timeRemaining: 0,
                                sessionState: QuizSessionState.BetweenQuestions,
                                feedback: {
                                    isCorrect: false,
                                    points: 0,
                                    timedOut: true
                                }
                            };
                        }
                        
                        return {
                            ...prev,
                            timeRemaining: 0
                        };
                    }
                    
                    // Decrease time remaining
                    return {
                        ...prev,
                        timeRemaining: prev.timeRemaining - 1
                    };
                });
            }, 1000);
        } else if (
            (participantState.sessionState !== QuizSessionState.Active ||
            participantState.hasSubmitted ||
            participantState.timeRemaining <= 0) &&
            timerRef.current
        ) {
            // Clear timer if not in active state or already submitted
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [
        participantState.sessionState,
        participantState.hasSubmitted,
        participantState.currentQuestion,
        participantState.timeRemaining,
        connectionState,
        connection,
        sessionId,
        participantState.selectedOption,
    ]);

    // Set up event handlers for the hub
    const setupHubHandlers = useCallback((connection: HubConnection) => {
        // Set up all event handlers using the hub connection methods
        
        // Session state changes
        connection.on("sessionStateChanged", (state: string, quizTitle: string) => {
            console.log("sessionStateChanged received:", state, quizTitle);
            // Map the string state to QuizSessionState enum safely
            let mappedState: QuizSessionState;
            switch (state) {
                case "WaitingToStart":
                    mappedState = QuizSessionState.WaitingToStart;
                    break;
                case "Active":
                    mappedState = QuizSessionState.Active;
                    break;
                case "BetweenQuestions":
                    mappedState = QuizSessionState.BetweenQuestions;
                    break;
                case "ShowingResults":
                    mappedState = QuizSessionState.ShowingResults;
                    break;
                case "Ended":
                    mappedState = QuizSessionState.Ended;
                    break;
                case "Paused":
                    mappedState = QuizSessionState.Paused;
                    break;
                default:
                    console.warn("Unknown session state received:", state);
                    mappedState = QuizSessionState.WaitingToStart;
            }

            setParticipantState((prev) => ({
                ...prev,
                sessionState: mappedState,
                quizTitle: quizTitle || prev.quizTitle,
            }));
            setIsLoading(false);
        });

        // Other events with simple wrappers
        connection.on("sessionStarted", () => {
            console.log("sessionStarted event received");
            setParticipantState((prev) => ({
                ...prev,
                sessionState: QuizSessionState.Active,
            }));
        });

        connection.on("questionCompleted", () => {
            console.log("questionCompleted event received");
            setParticipantState((prev) => ({
                ...prev,
                sessionState: QuizSessionState.BetweenQuestions,
            }));
        });

        connection.on("showingResults", () => {
            console.log("showingResults event received");
            setParticipantState((prev) => ({
                ...prev,
                sessionState: QuizSessionState.ShowingResults,
            }));
        });

        connection.on("quizEnded", () => {
            console.log("quizEnded event received");
            setParticipantState((prev) => ({
                ...prev,
                sessionState: QuizSessionState.Ended,
                currentQuestion: null,
            }));
        });

        connection.on("newQuestion", (questionData: {
            questionId: string;
            text: string;
            answers: { id: string; text: string }[];
            timeLimit?: number;
        }) => {
            console.log("newQuestion event received", questionData);
            const now = Date.now();
            setParticipantState((prev) => ({
                ...prev,
                currentQuestion: {
                    id: questionData.questionId,
                    text: questionData.text,
                    options: questionData.answers,
                    timeLimit: questionData.timeLimit || 30,
                },
                selectedOption: null,
                hasSubmitted: false,
                feedback: null,
                timeRemaining: questionData.timeLimit || 30,
                sessionState: QuizSessionState.Active,
                questionStartTime: now,
            }));
        });

        connection.on("currentQuestion", (
            questionData: {
                questionId: string;
                text: string;
                answers: { id: string; text: string }[];
                timeLimit?: number;
            } | null
        ) => {
            console.log("currentQuestion event received", questionData);
            if (questionData) {
                const now = Date.now();
                setParticipantState((prev) => ({
                    ...prev,
                    currentQuestion: {
                        id: questionData.questionId,
                        text: questionData.text,
                        options: questionData.answers,
                        timeLimit: questionData.timeLimit || 30,
                    },
                    selectedOption: null,
                    hasSubmitted: false,
                    feedback: null,
                    timeRemaining: questionData.timeLimit || 30,
                    sessionState: QuizSessionState.Active,
                    questionStartTime: now,
                }));
            }
        });

        connection.on("timeRemainingUpdated", (timeRemaining: number) => {
            console.log("timeRemainingUpdated received:", timeRemaining);
            setParticipantState((prev) => {
                // If the new time is 0, we need to also handle auto-submit
                if (timeRemaining === 0 && !prev.hasSubmitted && prev.sessionState === QuizSessionState.Active) {
                    // If there's a selected option, submit it
                    if (prev.selectedOption && prev.currentQuestion && connection) {
                        // We'll trigger the submission on the next tick to avoid state conflicts
                        setTimeout(() => {
                            if (!prev.hasSubmitted && prev.selectedOption && prev.currentQuestion?.id) {
                                submitAnswerHandler(
                                    connection,
                                    connectionState,
                                    sessionId,
                                    prev.currentQuestion.id,
                                    prev.selectedOption
                                );
                            }
                        }, 0);
                        
                        return {
                            ...prev,
                            timeRemaining: 0,
                            hasSubmitted: true
                        };
                    } else {
                        // No selection, just show timeout
                        return {
                            ...prev,
                            timeRemaining: 0,
                            hasSubmitted: true,
                            sessionState: QuizSessionState.BetweenQuestions,
                            feedback: {
                                isCorrect: false,
                                points: 0,
                                timedOut: true
                            }
                        };
                    }
                }
                
                return {
                    ...prev,
                    timeRemaining
                };
            });
        });

        connection.on("answerResult", (result: { 
            isCorrect: boolean, 
            points: number, 
            basePoints: number, 
            timeBonus: number,
            timeTaken: number | null,
            newScore: number 
        }) => {
            console.log("answerResult event received", result);
            setParticipantState((prev) => {
                // Use server-provided time taken if available, otherwise use client-side calculation
                const timeTaken = result.timeTaken !== null 
                    ? result.timeTaken 
                    : prev.questionStartTime
                        ? (Date.now() - prev.questionStartTime) / 1000
                        : undefined;
                
                return {
                    ...prev,
                    feedback: {
                        isCorrect: result.isCorrect,
                        points: result.points,
                        basePoints: result.basePoints,
                        timeBonus: result.timeBonus,
                        timeTaken: timeTaken,
                    },
                    hasSubmitted: true,
                    score: result.newScore,
                    sessionState: QuizSessionState.BetweenQuestions,
                    questionStartTime: null, // Reset question start time
                };
            });
        });

        // Handle score updates
        connection.on("scoreUpdate", (data: { userId: string; score: number }) => {
            console.log("scoreUpdate event received", data);
            if (data.userId === userId) {
                setParticipantState((prev) => ({
                    ...prev,
                    score: data.score
                }));
            }
        });

        connection.on("error", (error: string) => {
            console.error("Error event received:", error);
            setParticipantState((prev) => ({
                ...prev,
                error,
            }));
        });

        return () => {
            connection.off("sessionStateChanged");
            connection.off("sessionStarted");
            connection.off("questionCompleted");
            connection.off("newQuestion");
            connection.off("currentQuestion");
            connection.off("timeRemainingUpdated");
            connection.off("answerResult");
            connection.off("showingResults");
            connection.off("quizEnded");
            connection.off("scoreUpdate");
            connection.off("error");
        };
    }, []);

    // Set up event handlers once connection is established
    useEffect(() => {
        if (connection && connectionState === HubConnectionState.Connected) {
            console.log(
                "Connection established, setting up handlers and joining session"
            );
            const cleanup = setupHubHandlers(connection);

            // Join the session
            if (userId && sessionId) {
                console.log(`Joining session ${sessionId} as user ${userId}`);
                connection
                    .invoke("joinSession", sessionId)
                    .then(() => {
                        console.log("Successfully joined session");
                        setIsLoading(false);
                    })
                    .catch((err: Error) => {
                        console.error("Error joining session:", err);
                        setParticipantState((prev) => ({
                            ...prev,
                            error:
                                "Failed to join the quiz session: " +
                                err.message,
                        }));
                        setIsLoading(false);
                    });
            } else {
                setParticipantState((prev) => ({
                    ...prev,
                    error: "User ID or session ID not available",
                }));
                setIsLoading(false);
            }

            return cleanup;
        }
    }, [connection, connectionState, sessionId, userId, setupHubHandlers]);

    // Handle selecting an option
    const selectOption = useCallback(
        (optionId: string) => {
            if (participantState.hasSubmitted) return;

            setParticipantState((prev) => ({
                ...prev,
                selectedOption: optionId,
            }));
        },
        [participantState.hasSubmitted]
    );

    // Helper function for submitting answer (used by both manual and auto-submit)
    const submitAnswerHandler = useCallback(
        (
            conn: HubConnection | null,
            connState: HubConnectionState,
            sessId: string | undefined,
            questionId: string | undefined,
            optionId: string
        ) => {
            if (
                !conn ||
                connState !== HubConnectionState.Connected ||
                !optionId ||
                !questionId ||
                !sessId
            ) {
                return;
            }

            // Calculate time taken before updating state
            setParticipantState((prev) => {
                const timeTaken = prev.questionStartTime ? 
                    (Date.now() - prev.questionStartTime) / 1000 : // convert to seconds
                    undefined;
                
                // Send time taken as additional parameter if available
                if (timeTaken !== undefined) {
                    conn.invoke("submitAnswer", sessId, questionId, optionId, Math.round(timeTaken))
                        .catch((err: Error) => {
                            console.error("Error submitting answer:", err);
                            setParticipantState((prev) => ({
                                ...prev,
                                error: "Failed to submit answer: " + err.message,
                                hasSubmitted: false,
                            }));
                        });
                } else {
                    conn.invoke("submitAnswer", sessId, questionId, optionId)
                        .catch((err: Error) => {
                            console.error("Error submitting answer:", err);
                            setParticipantState((prev) => ({
                                ...prev,
                                error: "Failed to submit answer: " + err.message,
                                hasSubmitted: false,
                            }));
                        });
                }
                
                return {
                    ...prev,
                    hasSubmitted: true,
                };
            });
        },
        []
    );

    // Handle submitting an answer
    const submitAnswer = useCallback(() => {
        if (
            !connection ||
            connectionState !== HubConnectionState.Connected ||
            !participantState.selectedOption ||
            !participantState.currentQuestion ||
            participantState.hasSubmitted
        ) {
            return;
        }

        submitAnswerHandler(
            connection,
            connectionState,
            sessionId,
            participantState.currentQuestion.id,
            participantState.selectedOption
        );
    }, [
        connection,
        connectionState,
        sessionId,
        participantState.selectedOption,
        participantState.currentQuestion,
        participantState.hasSubmitted,
        submitAnswerHandler
    ]);

    return {
        quizTitle: participantState.quizTitle,
        currentQuestion: participantState.currentQuestion,
        selectedOption: participantState.selectedOption,
        sessionState: participantState.sessionState,
        hasSubmitted: participantState.hasSubmitted,
        timeRemaining: participantState.timeRemaining,
        feedback: participantState.feedback,
        error: participantState.error || connectionError,
        isLoading,
        connectionState,
        selectOption,
        submitAnswer,
        score: participantState.score,
    };
}; 