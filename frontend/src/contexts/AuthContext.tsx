import { api } from "@/api";
import { User } from "@/types/user";
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/local-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log("🔍 Checking authentication status...");
            try {
                const token = localStorage.getItem("token");
                console.log("Token exists:", !!token);

                if (!token) {
                    setIsLoading(false);
                    console.log("No token found, not authenticated");
                    return;
                }

                console.log("Token found, verifying with API...");
                const response = await api.get("/account/me");
                console.log("API response:", response.data);
                setUser(response.data);
                console.log("User set:", response.data);
            } catch (error) {
                console.error("Authentication error:", error);
                removeLocalStorageItem("token");
            } finally {
                setIsLoading(false);
                console.log("Auth check complete - isAuthenticated:", !!user); // Check this value
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await api.post("/account/login", {
                username,
                password,
            });
            const { token, user } = response.data;

            setLocalStorageItem("token", token);
            setUser(user);
            navigate("/");
        } catch (error) {
            throw new Error("Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            setIsLoading(true);
            const response = await api.post("/account/register", {
                username,
                email,
                password,
            });
            const { token, user } = response.data;
            setLocalStorageItem("token", token);
            setUser(user);
            navigate("/");
        } catch (error) {
            throw new Error("Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        removeLocalStorageItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
