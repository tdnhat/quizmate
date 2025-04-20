import { z } from "zod";

export const answerFormSchema = z.object({
    text: z.string().min(1, "Answer cannot be empty"),
    isCorrect: z.boolean(),
    explanation: z.string().optional(),
});

export const questionFormSchema = z.object({
    text: z.string().min(3, "Question must be at least 3 characters"),
    questionType: z.enum(["SingleChoice", "TrueFalse"]),
    points: z.number().int().min(1, "Points must be at least 1"),
    answers: z
        .array(answerFormSchema)
        .min(2, "At least two answers are required")
        .max(6, "A maximum of 6 answers is allowed"),
    imageFile: z.instanceof(File).optional(),
    imageUrl: z.string().optional(),
    explanation: z.string().optional(),
});

export const quizFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    thumbnailFile: z.instanceof(File).optional(),
    thumbnailUrl: z.string().optional(),
    timeMinutes: z.number().int().min(1, "Time must be at least 1 minute"),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    passingScore: z.number().int().min(0),
    isPublic: z.boolean().default(true),
    tags: z.array(z.string()).max(5, "You can only add up to 5 tags"),
    questions: z.array(questionFormSchema).optional(),
});

export type AnswerFormValues = z.infer<typeof answerFormSchema>;

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

export type QuizFormValues = z.infer<typeof quizFormSchema>;
