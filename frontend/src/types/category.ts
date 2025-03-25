export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
    image?: string;
    slug: string;
    isFeatured: boolean;
    createdAt: Date;
    quizCount: number;
}