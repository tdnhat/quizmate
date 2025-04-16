import { api } from "@/api";
import { QuizQueryParams, SavedQuizResponse } from "../types";
import { Quiz } from "@/types/quiz";

export const libraryApi = {
    getSavedQuizzes: async (params: QuizQueryParams = {}): Promise<Quiz[]> => {
        const response = await api.get<Quiz[]>(`/saved-quizzes`, { params });
        return response.data;
    },

    toggleSaveQuiz: async (quizId: string): Promise<SavedQuizResponse> => {
        const response = await api.post<SavedQuizResponse>(
            `/saved-quizzes/${quizId}/toggle`
        );
        return response.data;
    },

    isQuizSaved: async (quizId: string): Promise<SavedQuizResponse> => {
        const response = await api.get<SavedQuizResponse>(
            `/saved-quizzes/is-saved/${quizId}`
        );
        return response.data;
    },
};
