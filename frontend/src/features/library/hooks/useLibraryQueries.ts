import { useQuery } from "@tanstack/react-query";
import { libraryApi } from "../api";
import { QuizQueryParams } from "../types";

export const useLibraryQuizzesQuery = (params: QuizQueryParams = {}) => {
    return useQuery({
        queryKey: ["libraryQuizzes", params],
        queryFn: () => libraryApi.getLibraryQuizzes(params),
    });
};

export const useSavedQuizzesQuery = (params: QuizQueryParams = {}) => {
    return useQuery({
        queryKey: ["savedQuizzes", params],
        queryFn: () => libraryApi.getSavedQuizzes(params),
    });
};

export const useIsQuizSavedQuery = (quizId: string) => {
    return useQuery({
        queryKey: ["isQuizSaved", quizId],
        queryFn: () => libraryApi.isQuizSaved(quizId),
        enabled: !!quizId,
    });
};
