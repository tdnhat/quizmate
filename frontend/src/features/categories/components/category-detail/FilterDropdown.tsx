import { ChevronDown, Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFilter } from "@/features/filters/hooks/useFilter";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DifficultyLevel } from "@/types/quiz";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FilterDropdown = () => {
    const {
        filters,
        handleFilterChange,
        clearAllFilters,
    } = useFilter();

    // Add state to control the popover
    const [open, setOpen] = useState(false);

    const activeFilterCount = [
        filters.difficulty ? 1 : 0,
        filters.duration ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    // Handle difficulty changes
    const handleDifficultyChange = (value: string) => {
        handleFilterChange("difficulty", value as DifficultyLevel);
    };

    // Handle duration changes
    const handleDurationChange = (value: string) => {
        handleFilterChange("duration", value);
    };

    // Get the duration display value for comparison in the radio group
    const getDurationDisplayValue = () => {
        if (!filters.duration) return "";
        
        if (filters.duration <= 15) return "< 15 min";
        if (filters.duration <= 30) return "15-30 min";
        return "> 30 min";
    };

    return (
        <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clearAllFilters();
                                }}
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
                            <RadioGroup
                                value={filters.difficulty || ""}
                                onValueChange={handleDifficultyChange}
                                className="grid grid-cols-3 gap-2"
                            >
                                {["Beginner", "Intermediate", "Advanced"].map(
                                    (difficulty) => (
                                        <div key={difficulty} className="relative" onClick={(e) => e.stopPropagation()}>
                                            <RadioGroupItem
                                                value={difficulty}
                                                id={`difficulty-${difficulty}`}
                                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                            />
                                            <Label
                                                htmlFor={`difficulty-${difficulty}`}
                                                className={cn(
                                                    "px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors w-full h-full",
                                                    filters.difficulty === difficulty
                                                        ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                                )}
                                            >
                                                {difficulty}
                                            </Label>
                                        </div>
                                    )
                                )}
                            </RadioGroup>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm mb-2">
                                Duration
                            </h3>
                            <RadioGroup
                                value={getDurationDisplayValue()}
                                onValueChange={handleDurationChange}
                                className="grid grid-cols-3 gap-2"
                            >
                                {["< 15 min", "15-30 min", "> 30 min"].map(
                                    (duration) => (
                                        <div key={duration} className="relative" onClick={(e) => e.stopPropagation()}>
                                            <RadioGroupItem
                                                value={duration}
                                                id={`duration-${duration}`}
                                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                            />
                                            <Label
                                                htmlFor={`duration-${duration}`}
                                                className={cn(
                                                    "px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors w-full h-full",
                                                    getDurationDisplayValue() === duration
                                                        ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                                )}
                                            >
                                                {duration}
                                            </Label>
                                        </div>
                                    )
                                )}
                            </RadioGroup>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FilterDropdown;
