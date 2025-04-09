import { api } from "@/api";
import { User } from "@/types/user";
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/local-storage";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | undefined;
    returnUrl: string | undefined;
    login: (
        email: string,
        password: string,
        redirectUrl?: string
    ) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
        redirectUrl?: string
    ) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: undefined,
    returnUrl: undefined,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [returnUrl, setReturnUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading } = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const token = getLocalStorageItem("token");

            if (!token) {
                return null;
            }

            const response = await api.get("/auth/me");
            setUser(response.data);
            setToken(token);
            return response.data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

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
            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                },
                {
                    timeout: 10000, // 10 seconds
                }
            );
            return { ...response.data, redirectUrl };
        },
        onSuccess: (data) => {
            const { token, user, redirectUrl } = data;
            setLocalStorageItem("token", token);
            setUser(user);
            queryClient.setQueryData(["currentUser"], user);
            // Use the redirectUrl if provided, otherwise default to "/home"
            setReturnUrl(redirectUrl || "/home");
            navigate(redirectUrl || "/home");
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                console.log(
                    (error as { response?: { data?: unknown } }).response?.data
                );
                throw new Error("Invalid credentials");
            }
            throw error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
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
            const response = await api.post(
                "/auth/register",
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                },
                {
                    timeout: 10000, // 10 seconds
                }
            );
            return { ...response.data, redirectUrl };
        },
        onSuccess: (data) => {
            const { token, user, redirectUrl } = data;
            console.log(`[AuthContext.tsx] Registration successful, redirectUrl: ${redirectUrl}`);
            setLocalStorageItem("token", token);
            setUser(user);
            queryClient.setQueryData(["currentUser"], user);
            // Use the redirectUrl if provided, otherwise default to "/home"
            setReturnUrl(redirectUrl || "/home");
            console.log(`[AuthContext.tsx] Navigating to: ${redirectUrl || "/home"}`);
            navigate(redirectUrl || "/home", { replace: true });
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                const axiosError = error as { response?: { data?: unknown } };
                if (axiosError.response?.data) {
                    throw axiosError;
                }
            }
            throw error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });

    const login = async (
        email: string,
        password: string,
        redirectUrl?: string
    ) => {
        await loginMutation.mutateAsync({ email, password, redirectUrl });
    };

    const register = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
        redirectUrl?: string
    ) => {
        await registerMutation.mutateAsync({
            username,
            email,
            password,
            confirmPassword,
            redirectUrl,
        });
    };

    const logout = () => {
        removeLocalStorageItem("token");
        setUser(null);
        queryClient.setQueryData(["currentUser"], null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                token: token ?? undefined,
                returnUrl: returnUrl ?? undefined,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
