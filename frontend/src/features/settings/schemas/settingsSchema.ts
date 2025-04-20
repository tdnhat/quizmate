import { z } from "zod";

// Schema for updating profile information
export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(50, "Display name must not exceed 50 characters")
    .optional(),
  
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(/^[a-zA-Z0-9._]*$/, "Username can only contain letters, numbers, dots, and underscores")
    .optional(),
  
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  
  phoneNumber: z
    .string()
    .regex(/^(?:\+?\d{1,4})?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "Invalid phone number format")
    .optional()
    .or(z.literal(""))
});

// Schema for changing password
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required"),
  
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 
      "Password must include uppercase, lowercase, number, and special character"),
  
  confirmPassword: z
    .string()
    .min(1, "Please confirm your new password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;
export type PasswordChangeValues = z.infer<typeof passwordChangeSchema>; 