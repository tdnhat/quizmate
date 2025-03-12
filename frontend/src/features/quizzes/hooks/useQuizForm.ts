import { useContext } from "react";
import { QuizFormContext } from "../contexts/QuizFormContext";

export const useQuizForm = () => {
    const context = useContext(QuizFormContext);

    if (!context) {
        throw new Error("useQuizForm must be used within a QuizFormProvider");
    }

    return context;
};
