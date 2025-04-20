import { useQuery } from "@tanstack/react-query";
import { libraryApi } from "../api";
import { QuizQueryParams } from "../types";

export const useLibraryQuizzesQuery = (params: QuizQueryParams = {}) => {
    return useQuery({
        queryKey: ["libraryQuizzes", params],
        queryFn: async () => {
            // Add a minimum loading time of 500ms for better UX
            const startTime = Date.now();
            const result = await libraryApi.getLibraryQuizzes(params);
            const elapsedTime = Date.now() - startTime;
            
            // If the query was too fast, add a delay for better UX
            if (elapsedTime < 500) {
                await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
            }
            
            return result;
        },
    });
};

export const useSavedQuizzesQuery = (params: QuizQueryParams = {}) => {
    return useQuery({
        queryKey: ["savedQuizzes", params],
        queryFn: async () => {
            // Add a minimum loading time of 500ms for better UX
            const startTime = Date.now();
            const result = await libraryApi.getSavedQuizzes(params);
            const elapsedTime = Date.now() - startTime;
            
            // If the query was too fast, add a delay for better UX
            if (elapsedTime < 500) {
                await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
            }
            
            return result;
        },
    });
};

export const useIsQuizSavedQuery = (quizId: string) => {
    return useQuery({
        queryKey: ["isQuizSaved", quizId],
        queryFn: async () => {
            // Add a minimum loading time of 500ms for better UX
            const startTime = Date.now();
            const result = await libraryApi.isQuizSaved(quizId);
            const elapsedTime = Date.now() - startTime;
            
            // If the query was too fast, add a delay for better UX
            if (elapsedTime < 500) {
                await new Promise(resolve => setTimeout(resolve, 500 - elapsedTime));
            }
            
            return result;
        },
        enabled: !!quizId,
    });
};
