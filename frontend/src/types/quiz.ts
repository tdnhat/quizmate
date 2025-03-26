import { User } from "./user";

export type QuizFilters = {
    search?: string;
    categorySlug?: string;
    duration?: number;
    isPublic?: boolean;
    difficulty?: DifficultyLevel;
    page: number;
    pageSize: number;
    isDescending: boolean;
    sortBy: string;
}

export interface QuizResultAnswer {
    questionId: string;
    answerId: string;
}

export interface QuizResultPayload {
    quizId: string;
    timeTaken: number;
    resultAnswers: QuizResultAnswer[];
}

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface QuizAuthor {
    id: string;
    name: string;
    avatar: string;
}

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
}

export interface Question {
    id: string;
    quizId: string;
    text: string;
    questionType: string;
    points: number;
    answers: Answer[];
    explanation?: string;
    imageUrl?: string;
}

export interface Quiz {
    id: string;
    slug: string;
    title: string;
    description?: string;
    categoryName?: string;
    appUser: User;
    thumbnail?: string;
    timeMinutes: number;
    questionCount: number;
    difficulty: DifficultyLevel;
    rating: number;
    tags: string[];
    completions: number;
    questions?: Question[];
}