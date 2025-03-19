import { Question, Quiz } from "@/types/quiz";
import { createContext, ReactNode, useCallback, useState } from "react";

type QuizAnswer = {
    questionId: string;
    selectedOptionId: string;
};

export type QuestionResult = {
    question: Question;
    selectedOptionId: string | undefined;
    isCorrect: boolean;
    correctOptionId: string;
    explanation: string;
    points: number;
    earnedPoints: number;
};

export type QuizResult = {
    id: string;
    quizId: string;
    quiz: Quiz;
    userAnswers: QuizAnswer[];
    questionResults: QuestionResult[];
    score: number;
    maxScore: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    unansweredCount: number;
    timeTaken: number; // in seconds
    completedAt: string;
    passRate: number;
};

type QuizResultsContextType = {
    isLoading: boolean;
    error: string | null;
    quizResult: QuizResult | null;
    fetchQuizResult: (quizId: string) => Promise<void>;
};

export const QuizResultsContext = createContext<
    QuizResultsContextType | undefined
>(undefined);

const fetchMockQuizResult = async (quizId: string): Promise<QuizResult> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        id: "result-123",
        quizId,
        quiz: {
            id: quizId,
            title: "Sample Quiz",
            description: "This is a sample quiz",
            author: {
                id: "sarah-johnson",
                username: "sarah-johnson",
                email: "sarah@example.com",
                avatarUrl: "/avatars/sarah.jpg",
                role: "user",
                savedQuizzes: [],
                completedQuizzes: [],
                createdQuizzes: [],
                teams: [],
            },
            thumbnail: "/thumbnails/quiz.jpg",
            timeMinutes: 10,
            questionCount: 3,
            difficulty: "Intermediate",
            rating: 4.5,
            tags: ["sample", "test"],
            completions: 120,
            questions: [
                {
                    id: "q1",
                    quizId,
                    text: "What is the capital of France?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a1", text: "London", isCorrect: false },
                        {
                            id: "a2",
                            text: "Paris",
                            isCorrect: true,
                            explanation: "Paris is the capital of France",
                        },
                        { id: "a3", text: "Berlin", isCorrect: false },
                        { id: "a4", text: "Madrid", isCorrect: false },
                    ],
                    explanation:
                        "Paris has been the capital of France since 987 CE.",
                },
                {
                    id: "q2",
                    quizId,
                    text: "Which planet is known as the Red Planet?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a5", text: "Venus", isCorrect: false },
                        {
                            id: "a6",
                            text: "Mars",
                            isCorrect: true,
                            explanation:
                                "Mars appears red due to iron oxide on its surface",
                        },
                        { id: "a7", text: "Jupiter", isCorrect: false },
                        { id: "a8", text: "Mercury", isCorrect: false },
                    ],
                },
                {
                    id: "q3",
                    quizId,
                    text: "What is the largest mammal?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a9", text: "Elephant", isCorrect: false },
                        {
                            id: "a10",
                            text: "Blue Whale",
                            isCorrect: true,
                            explanation:
                                "The Blue Whale is the largest animal known to have ever existed",
                        },
                        { id: "a11", text: "Giraffe", isCorrect: false },
                        { id: "a12", text: "Rhinoceros", isCorrect: false },
                    ],
                },
            ],
        },
        userAnswers: [
            { questionId: "q1", selectedOptionId: "a2" },
            { questionId: "q2", selectedOptionId: "a6" },
            // No answer for q3
        ],
        questionResults: [
            {
                question: {
                    id: "q1",
                    quizId,
                    text: "What is the capital of France?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a1", text: "London", isCorrect: false },
                        {
                            id: "a2",
                            text: "Paris",
                            isCorrect: true,
                            explanation: "Paris is the capital of France",
                        },
                        { id: "a3", text: "Berlin", isCorrect: false },
                        { id: "a4", text: "Madrid", isCorrect: false },
                    ],
                    explanation:
                        "Paris has been the capital of France since 987 CE.",
                },
                selectedOptionId: "a1",
                isCorrect: true,
                correctOptionId: "a2",
                explanation: "Paris is the capital of France since 987 CE.",
                points: 10,
                earnedPoints: 10,
            },
            {
                question: {
                    id: "q2",
                    quizId,
                    text: "Which planet is known as the Red Planet?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a5", text: "Venus", isCorrect: false },
                        {
                            id: "a6",
                            text: "Mars",
                            isCorrect: true,
                            explanation:
                                "Mars appears red due to iron oxide on its surface",
                        },
                        { id: "a7", text: "Jupiter", isCorrect: false },
                        { id: "a8", text: "Mercury", isCorrect: false },
                    ],
                },
                selectedOptionId: "a6",
                isCorrect: true,
                correctOptionId: "a6",
                explanation:
                    "Mars appears red due to iron oxide on its surface.",
                points: 10,
                earnedPoints: 10,
            },
            {
                question: {
                    id: "q3",
                    quizId,
                    text: "What is the largest mammal?",
                    type: "multiple-choice",
                    points: 10,
                    answers: [
                        { id: "a9", text: "Elephant", isCorrect: false },
                        {
                            id: "a10",
                            text: "Blue Whale",
                            isCorrect: true,
                            explanation:
                                "The Blue Whale is the largest animal known to have ever existed",
                        },
                        { id: "a11", text: "Giraffe", isCorrect: false },
                        { id: "a12", text: "Rhinoceros", isCorrect: false },
                    ],
                },
                selectedOptionId: undefined,
                isCorrect: false,
                correctOptionId: "a10",
                explanation:
                    "The Blue Whale is the largest animal known to have ever existed.",
                points: 10,
                earnedPoints: 0,
            },
        ],
        score: 20,
        maxScore: 30,
        correctAnswersCount: 2,
        incorrectAnswersCount: 0,
        unansweredCount: 1,
        timeTaken: 312, // 5 minutes and 12 seconds
        completedAt: new Date().toISOString(),
        passRate: 0.67, // 67%
    };
};

interface QuizResultsProviderProps {
    children: ReactNode;
}

export const QuizResultsProvider = ({ children }: QuizResultsProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const fetchQuizResult = useCallback(async (quizId: string) => {
        try {
            setIsLoading(true);
            setError(null);

            // Add a timeout for debugging the loading state
            const result = await new Promise((resolve) => {
                setTimeout(async () => {
                    try {
                        const data = await fetchMockQuizResult(quizId);
                        resolve(data);
                    } catch (err) {
                        resolve(null);
                    }
                }, 1000);
            });
            if (result) {
                setQuizResult(result as QuizResult);
            } else {
                setError("Failed to fetch results");
            }
        } catch (err) {
            console.error("Error fetching quiz result:", err);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false); // Make sure this is always called
        }
    }, []);

    const value = {
        isLoading,
        error,
        quizResult,
        fetchQuizResult,
    };

    return (
        <QuizResultsContext.Provider value={value}>
            {children}
        </QuizResultsContext.Provider>
    );
};
