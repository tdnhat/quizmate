import { QuizFilters, QuizResultPayload } from "@/types/quiz";
import { api } from ".";

export const getQuizzes = async (filters?: QuizFilters) => {
    const response = await api.get("/quizzes", { params: filters });
    return response.data;
};

export const getQuizBySlug = async (slug: string | undefined) => {
    const response = await api.get(`/quizzes/slug/${slug}`);
    return response.data;
};

export const getQuizById = async (id: string | undefined) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
};

export const submitQuizResults = async (payload: QuizResultPayload) => {
    const response = await api.post("/results", payload);
    return response.data;
};
