import { User } from "./user";

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
    type: string;
    points: number;
    answers: Answer[];
    explanation?: string;
    image?: string;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    author: User;
    thumbnail?: string;
    timeMinutes: number;
    questionCount: number;
    difficulty: DifficultyLevel;
    rating: number;
    tags: string[];
    completions: number;
    questions?: Question[];
}