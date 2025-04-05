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
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
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
        }: {
            email: string;
            password: string;
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
            return response.data;
        },
        onSuccess: (data) => {
            const { token, user } = data;
            setLocalStorageItem("token", token);
            setUser(user);
            queryClient.setQueryData(["currentUser"], user);
            navigate("/home");
        },
        onError: (error: any) => {
            console.log(error.response.data);
            throw new Error("Invalid credentials");
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
        }: {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
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
            return response.data;
        },
        onSuccess: (data) => {
            const { token, user } = data;
            setLocalStorageItem("token", token);
            setUser(user);
            queryClient.setQueryData(["currentUser"], user);
            navigate("/home");
        },
        onError: (error: any) => {
            console.log(error.response.data);
            throw new Error("Registration failed");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password });
    };

    const register = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        await registerMutation.mutateAsync({
            username,
            email,
            password,
            confirmPassword,
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
                token,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
