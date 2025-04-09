import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import { getLocalStorageItem } from "@/utils/local-storage";

export const useAuthQuery = () => {
    return useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const token = getLocalStorageItem("token");

            if (!token) {
                return null;
            }

            return authApi.getCurrentUser();
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}; 