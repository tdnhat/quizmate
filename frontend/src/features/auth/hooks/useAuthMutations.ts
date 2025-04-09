import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";

export const useAuthMutations = () => {
    const loginMutation = useMutation({
        mutationFn: async ({
            email,
            password,
            redirectUrl,
        }: {
            email: string;
            password: string;
            redirectUrl?: string;
        }) => {
            const response = await authApi.login({ email, password });
            return { ...response, redirectUrl };
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.error("[Auth] Login error:", error);
                throw new Error("Invalid credentials");
            }
            throw error;
        },
    });

    const registerMutation = useMutation({
        mutationFn: async ({
            username,
            email,
            password,
            confirmPassword,
            redirectUrl,
        }: {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
            redirectUrl?: string;
        }) => {
            const response = await authApi.register({
                username,
                email,
                password,
                confirmPassword,
            });
            return { ...response, redirectUrl };
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.error("[Auth] Registration error:", error);
                const axiosError = error as { response?: { data?: unknown } };
                if (axiosError.response?.data) {
                    throw axiosError;
                }
            }
            throw error;
        },
    });

    return {
        loginMutation,
        registerMutation,
    };
}; 