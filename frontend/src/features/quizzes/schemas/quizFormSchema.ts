import { z } from "zod";

export const answerFormSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Answer cannot be empty"),
    isCorrect: z.boolean(),
    explanation: z.string().optional(),
});

export const questionFormSchema = z.object({
    text: z.string().min(3, "Question must be at least 3 characters"),
    type: z.enum(["multiple-choice", "true-false"]),
    points: z.number().int().min(1, "Points must be at least 1"),
    answers: z
        .array(answerFormSchema)
        .min(2, "At least two answers are required")
        .max(6, "A maximum of 6 answers is allowed"),
    // image: z.instanceof(File).optional(),
    explanation: z.string().optional(),
});

export const quizFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    thumbnail: z.instanceof(File).optional(),
    timeMinutes: z.number().int().min(1, "Time must be at least 1 minute"),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    tags: z.array(z.string()).max(5, "You can only add up to 5 tags"),
});

export type AnswerFormValues = z.infer<typeof answerFormSchema>;

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

export type QuizFormValues = z.infer<typeof quizFormSchema>;
