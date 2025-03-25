import { QuizFilters } from "@/types/quiz";
import { api } from ".";

export const getQuizzes = async (filters: QuizFilters) => {
    const response = await api.get("/quizzes", { params: filters });
    return response.data;
};
