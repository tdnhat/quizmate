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

export const uploadQuizThumbnail = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/quizzes/upload-thumbnail', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};

export const uploadQuestionImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/quizzes/upload-question-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};

export const submitCreateQuizForm = async (payload: SubmitQuizPayload) => {
    const { isDraft, ...quizData } = payload;
    
    // Create a new object manually without the thumbnailFile property
    const {
        title,
        description,
        categoryId,
        thumbnailUrl,
        timeMinutes,
        difficulty,
        passingScore,
        isPublic,
        tags,
        questions
    } = quizData;
    
    const quizDataForSubmission = {
        title,
        description,
        categoryId,
        thumbnailUrl,
        timeMinutes,
        difficulty,
        passingScore,
        tags,
        questions
    };
    
    const response = await api.post("/quizzes", {
        ...quizDataForSubmission,
        isPublic: isDraft ? false : (isPublic ?? true),
    });
    return response.data;
};
