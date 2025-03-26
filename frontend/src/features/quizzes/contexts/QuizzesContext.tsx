import { getQuizzes } from "@/api/quiz";
import { Quiz } from "@/types/quiz";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";

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
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const {
        data: quizzes,
        isLoading: isQueryLoading,
        error,
    } = useQuery({
        queryKey: ["quizzes"],
        queryFn: () => getQuizzes(),
    });

    useEffect(() => {
        if (isQueryLoading) {
            setIsLoading(true);
        } else {
            new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                setIsLoading(false);
            });
        }
    }, [isQueryLoading]);

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
