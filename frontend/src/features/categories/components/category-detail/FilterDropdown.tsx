import { ChevronDown, Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFilter } from "@/features/filters/hooks/useFilter";

const FilterDropdown = () => {
    const {
        filters,
        tempFilters,
        handleFilterChange,
        getDurationInMinutes,
        clearAllFilters,
        applyFilters,
    } = useFilter();

    const activeFilterCount = [
        filters.difficulty ? 1 : 0,
        filters.duration ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const displayFilters = tempFilters || filters;

    return (
        <div className="relative">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="inline-flex w-full items-center justify-center cursor-pointer gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200">
                        <Filter className="h-4 w-4 mr-1" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge
                                variant="secondary"
                                className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center"
                            >
                                {activeFilterCount}
                            </Badge>
                        )}
                        <ChevronDown
                            className="ml-2 h-4 w-4 opacity-50"
                            aria-hidden="true"
                        />
                    </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80 p-0">
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-base">Filters</h2>
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-cyan-600 hover:text-cyan-700 cursor-pointer"
                            >
                                Clear all
                            </button>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-medium text-sm mb-2">
                                Difficulty
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {["Beginner", "Intermediate", "Advanced"].map(
                                    (difficulty) => (
                                        <button
                                            key={difficulty}
                                            onClick={() =>
                                                handleFilterChange(
                                                    "difficulty",
                                                    difficulty
                                                )
                                            }
                                            className={`px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                                                displayFilters.difficulty ===
                                                difficulty
                                                    ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                            }`}
                                        >
                                            {difficulty}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm mb-2">
                                Duration
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {["< 15 min", "15-30 min", "> 30 min"].map(
                                    (duration) => (
                                        <button
                                            key={duration}
                                            onClick={() =>
                                                handleFilterChange(
                                                    "duration",
                                                    duration
                                                )
                                            }
                                            className={`px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                                                displayFilters.duration ===
                                                getDurationInMinutes(duration)
                                                    ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                            }`}
                                        >
                                            {duration}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-end">
                            <button
                                onClick={applyFilters}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FilterDropdown;
