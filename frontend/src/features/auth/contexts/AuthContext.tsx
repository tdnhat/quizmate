import { User } from "@/types/user";
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/local-storage";
import { createContext, ReactNode, useState, useEffect } from "react";
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

    const { isLoading, data: currentUser } = useAuthQuery();
    const { loginMutation, registerMutation } = useAuthMutations();

    // Update user when currentUser changes
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    const login = async (
        email: string,
        password: string,
        redirectUrl?: string
    ) => {
        try {
            const result = await loginMutation.mutateAsync({
                email,
                password,
                redirectUrl,
            });
            
            // Update state
            setLocalStorageItem("token", result.token);
            setUser(result.user);
            queryClient.setQueryData(["currentUser"], result.user);
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
            
            // Set return URL and navigate
            const targetUrl = redirectUrl || "/home";
            setReturnUrl(targetUrl);
            navigate(targetUrl, { replace: true });
        } catch (error) {
            console.error("[AuthContext] Login error:", error);
            throw error;
        }
    };

    const register = async (
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
            
            // Update state
            setLocalStorageItem("token", result.token);
            setUser(result.user);
            queryClient.setQueryData(["currentUser"], result.user);
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
            
            // Set return URL and navigate
            const targetUrl = redirectUrl || "/home";
            setReturnUrl(targetUrl);
            navigate(targetUrl, { replace: true });
        } catch (error) {
            console.error("[AuthContext] Registration error:", error);
            throw error;
        }
    };

    const logout = () => {
        removeLocalStorageItem("token");
        setUser(null);
        queryClient.setQueryData(["currentUser"], null);
        navigate("/login", { replace: true });
    };

    const token = getLocalStorageItem("token");

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
