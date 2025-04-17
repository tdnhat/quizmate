import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import LibrarySearchInput from "./LibrarySearchInput";
import LibraryFilter from "./LibraryFilter";
import LibrarySort from "./LibrarySort";
import LibraryViewToggle from "./LibraryViewToggle";
import { useViewportSize } from "@/hooks/useViewportSize";

interface LibraryFilterBarProps {
    className?: string;
    showFilters?: boolean;
    showSearch?: boolean;
    showSort?: boolean;
    showViewToggle?: boolean;
}

const LibraryFilterBar = ({
    className = "",
    showFilters = true,
    showSearch = true,
    showSort = true,
    showViewToggle = true,
}: LibraryFilterBarProps) => {
    const { width } = useViewportSize();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Update mobile view state based on viewport width
    useEffect(() => {
        setIsMobileView(width < 970);
    }, [width]);

    // Check if any filter components should be displayed
    const showFilterSection =
        showFilters || showSearch || showSort || showViewToggle;

    if (!showFilterSection) {
        return null;
    }

    // Filter components
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
                className={`space-y-3 mb-4 bg-gray-50 rounded-lg p-3 ${
                    isMobileView ? (filtersOpen ? "block" : "hidden") : "hidden"
                }`}
            >
                {showSearch && <LibrarySearchInput />}
                <div className="flex justify-between items-center flex-wrap gap-2 mt-3">
                    {showFilters && <LibraryFilter />}
                    {showSort && <LibrarySort />}
                </div>
                {showViewToggle && (
                    <div className="flex justify-end mt-3">
                        <LibraryViewToggle />
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
                        {showSearch && <LibrarySearchInput />}
                        {showFilters && <LibraryFilter />}
                    </div>
                    <div className="flex items-center gap-x-2">
                        {showSort && <LibrarySort />}
                        {showViewToggle && <LibraryViewToggle />}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className={className}>
            <FilterComponents />
        </div>
    );
};

export default LibraryFilterBar;
