import { QuizContext } from "@/features/quizzes/contexts/QuizContext";
import { useContext } from "react";

export const useQuizzes = () => {
    const context = useContext(QuizContext);

    if (!context) {
        throw new Error("useQuizzes must be used within a QuizProvider");
    }

    return context;
};
