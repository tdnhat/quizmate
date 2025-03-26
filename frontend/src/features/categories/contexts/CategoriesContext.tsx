import { getCategories } from "@/api/category";
import { Category } from "@/types/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CategoriesContextType {
    categories: Category[];
    featuredCategories: Category[];
    isLoading: boolean;
    error: string | null;
    refreshCategories: () => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: [],
    featuredCategories: [],
    isLoading: false,
    error: null,
    refreshCategories: async () => {},
});

interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const {
        data: categories = [],
        isLoading: isQueryLoading,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    useEffect(() => {
        if (isQueryLoading) {
            setIsLoading(true);
        } else {
            new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                setIsLoading(false);
            });
        }
    }, [isQueryLoading]);

    // Refresh categories
    const refreshCategories = () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
    };

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                featuredCategories: [],
                isLoading,
                error: error?.message ?? null,
                refreshCategories,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
