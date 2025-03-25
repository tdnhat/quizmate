import { Button } from "@/components/ui/button";
import { FilterIcon, ListIcon, GridIcon } from "lucide-react";
import { QuizFilters } from "@/types/quiz";

interface FilterToolbarProps {
    viewMode: "list" | "grid";
    setViewMode: (mode: "list" | "grid") => void;
    toggleFilters: () => void;
    handleSortChange: (option: string) => void;
    filters: QuizFilters;
    getDurationInMinutes: (label: string) => number | undefined;
    handleFilterChange: (type: keyof QuizFilters, value: any) => void;
}

const FilterToolbar = ({
    viewMode,
    setViewMode,
    toggleFilters,
    handleSortChange,
    filters,
    getDurationInMinutes,
    handleFilterChange,
}: FilterToolbarProps) => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-6">
            <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={toggleFilters}
            >
                <FilterIcon className="h-4 w-4" />
                Filters
            </Button>

            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                    Sort by:
                    <select
                        className="ml-2 border-none bg-transparent font-medium"
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option>Most Popular</option>
                        <option>Newest</option>
                        <option>Highest Rated</option>
                    </select>
                </div>

                <div className="flex border rounded">
                    <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none cursor-pointer"
                    >
                        <GridIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none cursor-pointer"
                    >
                        <ListIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FilterToolbar;
