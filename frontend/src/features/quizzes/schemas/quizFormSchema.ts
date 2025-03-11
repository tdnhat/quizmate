import { z } from "zod";

export const quizFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    thumbnail: z.string().optional(),
    timeMinutes: z.number().int().min(1, "Time must be at least 1 minute"),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    tags: z.array(z.string()).max(5, "You can only add up to 5 tags"),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;
