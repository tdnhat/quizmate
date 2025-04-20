import {
    getLocalStorageItem,
    removeLocalStorageItem,
} from "@/utils/local-storage";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5118/api",
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
