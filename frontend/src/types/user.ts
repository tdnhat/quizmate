export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    role: string;
    savedQuizzes: string[];
    completedQuizzes: string[];
    createdQuizzes: string[];
    teams: string[];
}