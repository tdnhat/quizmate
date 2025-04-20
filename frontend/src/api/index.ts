import {
    getLocalStorageItem,
    removeLocalStorageItem,
} from "@/utils/local-storage";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:5118";

const baseURL = `${apiUrl}/api`;

export const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = getLocalStorageItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeLocalStorageItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
