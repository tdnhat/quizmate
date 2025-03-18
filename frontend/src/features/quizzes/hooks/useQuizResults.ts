import { useContext } from "react";
import { QuizResultsContext } from "../contexts/QuizResultsContext";

export const useQuizResults = () => {
    const context = useContext(QuizResultsContext);
    if (!context) {
        throw new Error("useQuizResults must be used within a QuizResultsProvider");
    }
    return context;
};