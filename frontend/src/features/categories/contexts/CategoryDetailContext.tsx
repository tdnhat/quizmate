import { getCategoryBySlug } from "@/api/category";
import { getQuizzes } from "@/api/quiz";
import { Quiz, QuizFilters } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

interface CategoryDetailContextType {
    filters: QuizFilters;
    tempFilters: QuizFilters | null;
    setFilters: (filter: QuizFilters) => void;
    viewMode: "list" | "grid";
    setViewMode: (viewMode: "list" | "grid") => void;

    categoryName: string | null;
    quizzes: Quiz[] | undefined;
    isLoading: boolean;

    handleFilterChange: (type: keyof QuizFilters, value: any) => void;
    handleSortChange: (sortOption: string) => void;
    clearAllFilters: () => void;
    applyFilters: () => void;

    getDurationInMinutes: (durationLabel: string) => number | undefined;
}

export const CategoryDetailContext = createContext<
    CategoryDetailContextType | undefined
>(undefined);

interface CategoryDetailProviderProps {
    children: React.ReactNode;
    categorySlug?: string;
}

export const CategoryDetailProvider = ({
    children,
    categorySlug,
}: CategoryDetailProviderProps) => {
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const [tempFilters, setTempFilters] = useState<QuizFilters | null>(null);

    const { data: category } = useQuery({
        queryKey: ["category", categorySlug],
        queryFn: () => getCategoryBySlug(categorySlug!),
        enabled: !!categorySlug,
    });

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category]);

    const [filters, setFilters] = useState<QuizFilters>({
        search: "",
        difficulty: undefined,
        duration: undefined,
        page: 1,
        pageSize: 10,
        isDescending: true,
        sortBy: "createdAt",
        categorySlug: categorySlug,
    });

    const { data: quizzes, isLoading: queryIsLoading } = useQuery<Quiz[]>({
        queryKey: ["quizzes", filters],
        queryFn: () => getQuizzes(filters),
        enabled: !!categorySlug,
    });

    useEffect(() => {
        if (queryIsLoading) {
            setIsLoading(true);
        } else {
            new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                setIsLoading(false);
            });
        }
    }, [queryIsLoading]);

    const getDurationInMinutes = (
        durationLabel: string
    ): number | undefined => {
        switch (durationLabel) {
            case "< 15 min":
                return 15;
            case "15-30 min":
                return 30;
            case "> 30 min":
                return 31; // Any value > 30
            default:
                return undefined;
        }
    };

    // Handle filter changes for all filter types
    const handleFilterChange = (type: keyof QuizFilters, value: any) => {
        if (type === "search") {
            setFilters((prev) => ({
                ...prev,
                search: value,
                page: 1,
            }));
            return;
        }

        setTempFilters((prev) => {
            if (!prev)
                return {
                    ...filters,
                    [type]:
                        type === "duration"
                            ? getDurationInMinutes(value)
                            : value,
                };

            if (type === "duration") {
                if (prev.duration === getDurationInMinutes(value)) {
                    return { ...prev, duration: undefined };
                } else {
                    return { ...prev, duration: getDurationInMinutes(value) };
                }
            } else if (type === "difficulty") {
                const newValue = prev.difficulty === value ? undefined : value;
                return { ...prev, difficulty: newValue };
            } else {
                return { ...prev, [type]: value };
            }
        });
    };

    // Handle sort changes
    const handleSortChange = (sortOption: string) => {
        switch (sortOption) {
            case "Most Popular":
                setFilters((prev) => ({
                    ...prev,
                    sortBy: "completions",
                    isDescending: true,
                }));
                break;
            case "Newest":
                setFilters((prev) => ({
                    ...prev,
                    sortBy: "createdAt",
                    isDescending: true,
                }));
                break;
            case "Highest Rated":
                setFilters((prev) => ({
                    ...prev,
                    sortBy: "rating",
                    isDescending: true,
                }));
                break;
            default:
                setFilters((prev) => ({
                    ...prev,
                    sortBy: "createdAt",
                    isDescending: true,
                }));
        }
    };

    const clearAllFilters = () => {
        setTempFilters({
            ...filters,
            difficulty: undefined,
            duration: undefined,
        });
    };

    const applyFilters = () => {
        if (tempFilters) {
            setFilters(tempFilters);
            setTempFilters(null);
        }
    };

    const value = {
        filters,
        tempFilters,
        setFilters,
        viewMode,
        setViewMode,
        categoryName: categoryName,
        quizzes,
        isLoading,
        handleFilterChange,
        handleSortChange,
        clearAllFilters,
        applyFilters,
        getDurationInMinutes,
    };

    return (
        <CategoryDetailContext.Provider value={value}>
            {children}
        </CategoryDetailContext.Provider>
    );
};
