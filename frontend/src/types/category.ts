export interface Category {
    id: string;
    name: string;
    description: string;
    colorPreset: string;
    image?: string;
    slug: string;
    isFeatured: boolean;
    createdAt: Date;
    quizCount: number;
}