import { useContext } from "react";
import TakeQuizContext from "../contexts/TakeQuizContext";

export const useTakeQuiz = () => {
    const context = useContext(TakeQuizContext);

    if (!context) {
        throw new Error("useTakeQuiz must be used within a TakeQuizProvider");
    }

    return context;
};
