import { User } from "@/types/user";
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/local-storage";
import { createContext, ReactNode, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useAuthMutations } from "../hooks/useAuthMutations";

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
    const [returnUrl, setReturnUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, data: currentUser, isFetching } = useAuthQuery();
    const { loginMutation, registerMutation } = useAuthMutations();

    // Update user when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        } else if (currentUser === null && !isLoading && !isFetching) {
            // Only clear user if we're sure they're not authenticated
            setUser(null);
        }
    }, [currentUser, isLoading, isFetching]);

    const token = getLocalStorageItem("token");
    
    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isLoading: isLoading || isFetching,
        token: token ?? undefined,
        returnUrl: returnUrl ?? undefined,
        login: async (email: string, password: string, redirectUrl?: string) => {
            try {
                const result = await loginMutation.mutateAsync({
                    email,
                    password,
                    redirectUrl,
                });
                
                setLocalStorageItem("token", result.token);
                setUser(result.user);
                queryClient.setQueryData(["currentUser"], result.user);
                await queryClient.invalidateQueries({ queryKey: ["auth"] });
                
                const targetUrl = redirectUrl || "/home";
                setReturnUrl(targetUrl);
                navigate(targetUrl, { replace: true });
            } catch (error) {
                console.error("[AuthContext] Login error:", error);
                throw error;
            }
        },
        register: async (
            username: string,
            email: string,
            password: string,
            confirmPassword: string,
            redirectUrl?: string
        ) => {
            try {
                const result = await registerMutation.mutateAsync({
                    username,
                    email,
                    password,
                    confirmPassword,
                    redirectUrl,
                });
                
                setLocalStorageItem("token", result.token);
                setUser(result.user);
                queryClient.setQueryData(["currentUser"], result.user);
                await queryClient.invalidateQueries({ queryKey: ["auth"] });
                
                const targetUrl = redirectUrl || "/home";
                setReturnUrl(targetUrl);
                navigate(targetUrl, { replace: true });
            } catch (error) {
                console.error("[AuthContext] Registration error:", error);
                throw error;
            }
        },
        logout: () => {
            removeLocalStorageItem("token");
            setUser(null);
            queryClient.setQueryData(["currentUser"], null);
            queryClient.removeQueries({ queryKey: ["auth"] });
            navigate("/login", { replace: true });
        },
    }), [user, isLoading, isFetching, token, returnUrl, loginMutation, registerMutation, queryClient, navigate]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
