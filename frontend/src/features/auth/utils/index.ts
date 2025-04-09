import { UseFormReturn } from "react-hook-form";
import { ApiError, ErrorResponse } from "../types";
import { RegisterFormValues } from "../schemas/registerFormSchema";

export const PASSWORD_REQUIREMENTS = [
    {
        text: "Contain at least 8 characters",
        check: (pass: string) => pass.length >= 8,
    },
    {
        text: "Contain at least 1 uppercase letter",
        check: (pass: string) => /[A-Z]/.test(pass),
    },
    {
        text: "Contain at least 1 lowercase letter",
        check: (pass: string) => /[a-z]/.test(pass),
    },
    {
        text: "Contain at least 1 special character",
        check: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    },
    {
        text: "Contain at least 1 number",
        check: (pass: string) => /[0-9]/.test(pass),
    },
];

export const handleRegisterError = (
    error: ApiError,
    form: UseFormReturn<RegisterFormValues>
) => {
    console.error("Registration failed:", error.response?.data);

    // Handle array format errors
    if (Array.isArray(error.response?.data)) {
        const errors = error.response.data as ErrorResponse[];
        
        // Handle DuplicateUserName error
        const duplicateUserError = errors.find(
            (err) => err.code === "DuplicateUserName"
        );
        if (duplicateUserError) {
            form.setError("username", {
                type: "manual",
                message:
                    duplicateUserError.description ||
                    "This username is already taken.",
            });
            return;
        }

        // Handle password requirement errors
        const passwordErrors = errors.filter((err) => 
            err.code.startsWith("Password")
        );
        
        if (passwordErrors.length > 0) {
            form.setError("password", {
                type: "manual",
                message: "Password requirements not met",
            });
            return;
        }
    }

    // Handle object format error (Email already registered)
    const errorData = error.response?.data as { error?: string };
    if (errorData?.error === "Email is already registered") {
        form.setError("email", {
            type: "manual",
            message: "This email is already registered",
        });
        return;
    }

    // Handle validation errors from backend
    const validationErrors = error.response?.data as { errors?: Record<string, string[]> };
    if (validationErrors?.errors) {
        Object.keys(validationErrors.errors).forEach((key) => {
            const fieldName =
                key.charAt(0).toLowerCase() + key.slice(1);
            form.setError(fieldName as keyof RegisterFormValues, {
                type: "manual",
                message: validationErrors.errors![key][0],
            });
        });
        return;
    }

    // Handle any other errors
    form.setError("root", {
        type: "manual",
        message: "Registration failed. Please try again.",
    });
};
