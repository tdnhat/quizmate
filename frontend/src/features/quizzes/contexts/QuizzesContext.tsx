import { getQuizzes } from "@/api/quiz";
import { Quiz } from "@/types/quiz";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";

interface QuizzesContextType {
    quizzes: Quiz[];
    isLoading: boolean;
    error: string | null;
    refreshQuizzes: () => void;
}

export const QuizzesContext = createContext<QuizzesContextType>({
    quizzes: [],
    isLoading: false,
    error: null,
    refreshQuizzes: async () => {},
});

interface QuizzesProviderProps {
    children: ReactNode;
}

export const QuizzesProvider = ({ children }: QuizzesProviderProps) => {
    const queryClient = useQueryClient();

    const {
        data: quizzes,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["quizzes"],
        queryFn: getQuizzes,
    });

    const refreshQuizzes = async () => {
        await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    };

    return (
        <QuizzesContext.Provider
            value={{
                quizzes,
                isLoading,
                error: error?.message ?? null,
                refreshQuizzes,
            }}
        >
            {children}
        </QuizzesContext.Provider>
    );
};
