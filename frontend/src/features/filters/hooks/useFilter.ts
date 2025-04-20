import { useContext } from "react";
import { CategoryDetailContext } from "@/features/categories/contexts/CategoryDetailContext";
import { QuizzesContext } from "@/features/quizzes/contexts/QuizzesContext";

/**
 * Custom hook that provides filter functionality by attempting to use either
 * CategoryDetailContext or QuizzesContext, whichever is available.
 */
export const useFilter = () => {
    const categoryContext = useContext(CategoryDetailContext);
    const quizzesContext = useContext(QuizzesContext);

    // Use whichever context is available
    const activeContext = categoryContext || quizzesContext;

    if (!activeContext) {
        throw new Error(
            "useFilter must be used within a CategoryDetailProvider or QuizzesProvider"
        );
    }

    return {
        filters: activeContext.filters,
        tempFilters: activeContext.tempFilters,
        setFilters: activeContext.setFilters,
        viewMode: activeContext.viewMode,
        setViewMode: activeContext.setViewMode,
        quizzes: activeContext.quizzes,
        isLoading: activeContext.isLoading,
        handleFilterChange: activeContext.handleFilterChange,
        handleSortChange: activeContext.handleSortChange,
        clearAllFilters: activeContext.clearAllFilters,
        applyFilters: activeContext.applyFilters,
        getDurationInMinutes: activeContext.getDurationInMinutes,
        // Only available in CategoryDetailContext
        categoryName: "categoryName" in activeContext ? activeContext.categoryName : null,
    };
}; 