import { getQuizzes } from "@/api/quiz";
import { DifficultyLevel, Quiz, QuizFilters } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

interface QuizzesContextType {
    filters: QuizFilters;
    tempFilters: QuizFilters | null;
    setFilters: (filter: QuizFilters) => void;
    viewMode: "list" | "grid";
    setViewMode: (viewMode: "list" | "grid") => void;

    quizzes: Quiz[] | undefined;
    isLoading: boolean;

    handleFilterChange: (type: keyof QuizFilters, value: string | number | DifficultyLevel | undefined) => void;
    handleSortChange: (sortOption: string) => void;
    clearAllFilters: () => void;
    applyFilters: () => void;

    getDurationInMinutes: (durationLabel: string) => number | undefined;
}

export const QuizzesContext = createContext<QuizzesContextType | undefined>(
    undefined
);

interface QuizzesProviderProps {
    children: React.ReactNode;
}

export const QuizzesProvider = ({ children }: QuizzesProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const [tempFilters, setTempFilters] = useState<QuizFilters | null>(null);

    const [filters, setFilters] = useState<QuizFilters>({
        search: "",
        difficulty: undefined,
        duration: undefined,
        page: 1,
        pageSize: 10,
        isDescending: true,
        sortBy: "createdAt",
    });

    const { data: quizzes, isLoading: queryIsLoading } = useQuery<Quiz[]>({
        queryKey: ["all-quizzes", filters],
        queryFn: () => getQuizzes(filters),
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
    const handleFilterChange = (type: keyof QuizFilters, value: string | number | DifficultyLevel | undefined) => {
        if (type === "search") {
            setFilters((prev) => ({
                ...prev,
                search: value as string,
                page: 1,
            }));
            return;
        }

        setTempFilters((prev) => {
            if (!prev) {
                if (type === "duration") {
                    return {
                        ...filters,
                        duration: getDurationInMinutes(value as string),
                    };
                } else if (type === "difficulty") {
                    return {
                        ...filters,
                        difficulty: value as DifficultyLevel,
                    };
                } else {
                    return {
                        ...filters,
                        [type]: value,
                    };
                }
            }

            if (type === "duration") {
                if (prev.duration === getDurationInMinutes(value as string)) {
                    return { ...prev, duration: undefined };
                } else {
                    return { ...prev, duration: getDurationInMinutes(value as string) };
                }
            } else if (type === "difficulty") {
                const newValue = prev.difficulty === value ? undefined : value as DifficultyLevel;
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
        quizzes,
        isLoading,
        handleFilterChange,
        handleSortChange,
        clearAllFilters,
        applyFilters,
        getDurationInMinutes,
    };

    return (
        <QuizzesContext.Provider value={value}>
            {children}
        </QuizzesContext.Provider>
    );
};
