export interface Quiz {
    id: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
    };
    thumbnail: string;
    timeMinutes: number;
    questionCount: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    rating: number;
    tags: string[];
    completions: number;
}
