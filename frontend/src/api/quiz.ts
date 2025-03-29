import { QuizFilters, QuizResultPayload } from "@/types/quiz";
import { api } from ".";
import { SubmitQuizPayload } from "@/features/quizzes/contexts/QuizFormContext";

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

export const submitCreateQuizForm = async (payload: SubmitQuizPayload) => {
    const { isDraft, ...quizData } = payload;
    const response = await api.post("/quizzes", {
        ...quizData,
        isPublic: isDraft ? false : (quizData.isPublic ?? true),
    });
    return response.data;
};
