import { getQuizResult } from "@/api/result";
import { Question, Quiz } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { User } from "@/types/user";

// Result Answer type from backend
interface ResultAnswer {
    id: string;
    resultId: string;
    questionId: string;
    answerId: string;
    isCorrect: boolean;
    earnedPoints: number;
}

// Quiz with additional fields from backend
interface QuizWithDetails extends Quiz {
    appUser: User;
    tags: string[];
    questions: Question[];
    passingScore: number;
    isPublic: boolean;
    rating: number;
    completions: number;
    categoryName: string;
}

// Main Quiz Result type matching backend response
export interface QuizResult {
    id: string;
    quiz: QuizWithDetails;
    appUserId: string;
    score: number;
    maxScore: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
    unansweredCount: number;
    isPassed: boolean;
    passRate: number;
    attemptedAt: string;
    timeTaken: number;
    resultAnswers: ResultAnswer[];
}

type QuizResultsContextType = {
    isLoading: boolean;
    quizResult: QuizResult | null;
};

export const QuizResultsContext = createContext<QuizResultsContextType | undefined>(
    undefined
);

interface QuizResultsProviderProps {
    children: ReactNode;
    resultId: string;
}

export const QuizResultsProvider = ({
    children,
    resultId,
}: QuizResultsProviderProps) => {
    const { data: quizResult, isLoading } = useQuery({
        queryKey: ["quizResult", resultId],
        queryFn: () => getQuizResult(resultId),
    });

    const value = {
        isLoading,
        quizResult: quizResult || null,
    };

    return (
        <QuizResultsContext.Provider value={value}>
            {children}
        </QuizResultsContext.Provider>
    );
};
