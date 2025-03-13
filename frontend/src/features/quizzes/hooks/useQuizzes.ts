import { QuizzesContext } from "@/features/quizzes/contexts/QuizzesContext";
import { useContext } from "react";

export const useQuizzes = () => {
    const context = useContext(QuizzesContext);

    if (!context) {
        throw new Error("useQuizzes must be used within a QuizzesProvider");
    }

    return context;
};
