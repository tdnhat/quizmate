export interface User {
    id: string;
    email: string;
    avatarUrl: string;
    userName: string;
    displayName: string;
    phoneNumber: string;
    role: string;
    savedQuizzes: string[];
    completedQuizzes: string[];
    createdQuizzes: string[];
    // teams: string[];
}