import { UseFormReturn, FieldValues } from "react-hook-form";

export interface ErrorResponse {
    code: string;
    description: string;
}

export interface ApiError {
    response?: {
        data?: unknown;
        status?: number;
    };
}

export interface PasswordRequirement {
    text: string;
    check: (pass: string) => boolean;
}

// Form Error Handler
export type FormErrorHandler = (
    error: ApiError,
    form: UseFormReturn<FieldValues>
) => void;
