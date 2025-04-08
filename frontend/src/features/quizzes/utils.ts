import { Question } from "@/types/quiz";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { JSX, createElement } from "react";
import { ResultAnswer } from "./contexts/QuizResultsContext";

interface QuestionReviewData {
    question: Question;
    resultAnswer?: ResultAnswer;
    answerId: string | null;
    isCorrect: boolean;
    earnedPoints: number;
    correctAnswerId: string | undefined;
    statusIcon: JSX.Element;
}

export const getQuestionReviewData = (
    question: Question,
    resultAnswers: ResultAnswer[]
): QuestionReviewData => {
    const resultAnswer = resultAnswers.find(
        (ra) => ra.questionId === question.id
    );

    const answerId = resultAnswer?.answerId ?? null;
    const isCorrect = resultAnswer?.isCorrect ?? false;
    const earnedPoints = resultAnswer?.earnedPoints ?? 0;
    const correctAnswerId = question.answers.find((a) => a.isCorrect)?.id;

    let statusIcon: JSX.Element;
    if (!answerId) {
        statusIcon = createElement(HelpCircle, {
            className: "h-5 w-5 text-amber-500",
        });
    } else if (isCorrect) {
        statusIcon = createElement(CheckCircle, {
            className: "h-5 w-5 text-green-600",
        });
    } else {
        statusIcon = createElement(XCircle, {
            className: "h-5 w-5 text-red-600",
        });
    }

    return {
        question,
        resultAnswer,
        answerId,
        isCorrect,
        earnedPoints,
        correctAnswerId,
        statusIcon,
    };
};

// Helper functions
export const getPositionColor = (position: number): string => {
    switch (position) {
        case 0:
            return "bg-amber-500"; // Gold
        case 1:
            return "bg-slate-400"; // Silver
        case 2:
            return "bg-amber-700"; // Bronze
        default:
            return "bg-gray-500";
    }
};

export const getGradientColor = (position: number): string => {
    switch (position) {
        case 0:
            return "from-amber-400 to-amber-600"; // Gold
        case 1:
            return "from-slate-300 to-slate-500"; // Silver
        case 2:
            return "from-amber-600 to-amber-800"; // Bronze
        default:
            return "from-gray-400 to-gray-600";
    }
};

export const getPositionLabel = (position: number): string => {
    switch (position) {
        case 0:
            return "1st";
        case 1:
            return "2nd";
        case 2:
            return "3rd";
        default:
            return `${position + 1}th`;
    }
};
