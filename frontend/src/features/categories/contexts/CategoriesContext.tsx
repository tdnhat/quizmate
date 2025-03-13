import { Category } from "@/types/category";
import { createContext, ReactNode, useEffect, useState } from "react";

const DEFAULT_CATEGORIES: Category[] = [
    {
        id: "math",
        name: "Mathematics",
        image: "/categories/mathematics.png",
        description: "Algebra, calculus, geometry and more",
        quizCount: 42,
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: "science",
        name: "Science",
        image: "/categories/science.jpg",
        description: "Physics, chemistry, biology and astronomy",
        quizCount: 38,
        color: "from-green-500 to-emerald-400",
    },
    {
        id: "languages",
        name: "Languages",
        image: "/categories/languages.jpg",
        description: "English, Spanish, French and more",
        quizCount: 29,
        color: "from-orange-500 to-amber-400",
    },
    {
        id: "history",
        name: "History",
        image: "/categories/history.jpg",
        description: "World history, civilizations and events",
        quizCount: 35,
        color: "from-red-500 to-pink-500",
    },
    {
        id: "programming",
        name: "Programming",
        image: "/categories/programming.jpg",
        description: "Web development, algorithms and more",
        quizCount: 27,
        color: "from-purple-500 to-violet-400",
    },
];

interface CategoriesContextType {
    categories: Category[];
    featuredCategories: Category[];
    isLoading: boolean;
    error: string | null;
    refreshCategories: () => Promise<void>;
    getCategoryById: (id: string) => Category | undefined;
}

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: [],
    featuredCategories: [],
    isLoading: false,
    error: null,
    refreshCategories: async () => {},
    getCategoryById: () => undefined,
});

interface CategoriesProviderProps {
    children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
    const [categories, setCategories] =
        useState<Category[]>(DEFAULT_CATEGORIES);
    const [featuredCategories, setFeaturedCategories] =
        useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await api.get('/api/categories');
            // const data = response.data;
            // setCategories(data);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCategories(DEFAULT_CATEGORIES);
            setFeaturedCategories(DEFAULT_CATEGORIES.slice(0, 4));
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("An error occurred while fetching categories");
            setCategories(DEFAULT_CATEGORIES);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryById = (id: string) => {
        return categories.find((category) => category.id === id);
    };

    // Load categories on initial mount
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                featuredCategories,
                isLoading,
                error,
                refreshCategories: fetchCategories,
                getCategoryById,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
