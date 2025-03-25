import { z } from "zod";

export const RegisterFormSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and privacy policy to register",
        }),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
