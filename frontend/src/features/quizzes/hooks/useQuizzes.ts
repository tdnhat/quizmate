import { useContext } from "react";
import { QuizzesContext } from "../contexts/QuizzesContext";

export const useQuizzes = () => {
    const context = useContext(QuizzesContext);
    
    if (!context) {
        throw new Error("useQuizzes must be used within a QuizzesProvider");
    }
    
    return context;
};
