import { Quiz } from "@/types/quiz";
import QuizCard from "./QuizCard";
import QuizSkeleton from "./QuizSkeleton";
import { useState, useEffect, useContext } from "react";
import { useViewportSize } from "@/hooks/useViewportSize";
import { ViewModeToggle } from "../ViewModeToggle";
import SortCombobox from "@/features/categories/components/category-detail/SortCombobox";
import FilterDropdown from "@/features/categories/components/category-detail/FilterDropdown";
import SearchBar from "@/features/categories/components/category-detail/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { CategoryDetailContext } from "@/features/categories/contexts/CategoryDetailContext";
import { QuizzesContext } from "@/features/quizzes/contexts/QuizzesContext";

interface QuizGridProps {
    quizzes?: Quiz[];
    isLoading?: boolean;
    showFilters?: boolean;
    showSearch?: boolean;
    showSort?: boolean;
    showViewToggle?: boolean;
    categorySlug?: string;
}

const QuizGrid = ({
    quizzes: propQuizzes,
    isLoading: propIsLoading,
    showFilters = true,
    showSearch = true,
    showSort = true,
    showViewToggle = true,
    categorySlug,
}: QuizGridProps) => {
    const { width } = useViewportSize();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Try to get data from both contexts
    const categoryContext = useContext(CategoryDetailContext);
    const quizzesContext = useContext(QuizzesContext);

    // Determine which context to use, prioritizing the appropriate one
    const activeContext = categorySlug ? categoryContext : quizzesContext;

    // Use context values if available, otherwise use props
    const viewMode = activeContext?.viewMode || "grid";
    const quizzes = activeContext?.quizzes || propQuizzes;
    const isLoading = activeContext?.isLoading || propIsLoading;

    // Update mobile view state based on viewport width
    useEffect(() => {
        setIsMobileView(width < 970);
    }, [width]);

    // Force list view on smaller screens (using our custom breakpoint)
    const effectiveViewMode = width < 970 ? "grid" : viewMode;

    const gridClassName =
        effectiveViewMode === "list"
            ? "space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

    // Check if any filter components should be displayed
    const showFilterSection =
        showFilters || showSearch || showSort || showViewToggle;

    // Filter components that will work with either context
    const FilterComponents = () => (
        <>
            {/* Mobile filter toggle - show when width < 970px */}
            <div
                className={isMobileView ? "flex" : "hidden"}
                style={{ marginBottom: "1rem" }}
            >
                <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                >
                    <span className="flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters & Options
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                            filtersOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </div>

            {/* Mobile collapsible filters - show when width < 970px */}
            <div
                className={`space-y-3 mb-4 bg-gray-50 rounded-lg ${
                    isMobileView ? (filtersOpen ? "block" : "hidden") : "hidden"
                }`}
            >
                {showSearch && <SearchBar />}
                <div className="flex justify-between items-center flex-wrap gap-2">
                    {showFilters && <FilterDropdown />}
                    {showSort && <SortCombobox />}
                </div>
                {showViewToggle && activeContext?.setViewMode && (
                    <div className="flex justify-end">
                        <ViewModeToggle
                            value={viewMode}
                            onChange={activeContext.setViewMode}
                        />
                    </div>
                )}
            </div>

            {/* Desktop filters - show when width >= 970px */}
            <div
                className={
                    isMobileView
                        ? "hidden"
                        : "flex justify-between items-center mb-4"
                }
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-x-2 flex-wrap">
                        {showSearch && <SearchBar />}
                        {showFilters && <FilterDropdown />}
                    </div>
                    <div className="flex items-center gap-x-2">
                        {showSort && <SortCombobox />}
                        {showViewToggle && activeContext?.setViewMode && (
                            <ViewModeToggle
                                value={viewMode}
                                onChange={activeContext.setViewMode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div>
            {showFilterSection && <FilterComponents />}

            <div className={gridClassName}>
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                          <QuizSkeleton key={i} viewMode={effectiveViewMode} />
                      ))
                    : quizzes?.map((quiz) => (
                          <QuizCard
                              key={quiz.id}
                              quiz={quiz}
                              viewMode={effectiveViewMode}
                          />
                      ))}
            </div>
        </div>
    );
};

export default QuizGrid;
