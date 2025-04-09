import { api } from "@/api";
import { User } from "@/types/user";

interface LoginResponse {
    token: string;
    user: User;
}

interface RegisterResponse {
    token: string;
    user: User;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/auth/login", data, {
            timeout: 10000,
        });
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await api.post<RegisterResponse>("/auth/register", data, {
            timeout: 10000,
        });
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>("/auth/me");
        return response.data;
    },
};
