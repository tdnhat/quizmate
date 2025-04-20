import { ChevronDown, Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLibraryContext } from "../context/LibraryContext";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const LibraryFilter = () => {
    const { queryParams, handleFilterChange } =
        useLibraryContext();

    // Add state to control the popover
    const [open, setOpen] = useState(false);

    // Duration options match FilterDropdown.tsx
    const durationOptions = [
        { label: "< 15 min", value: "15" },
        { label: "15-30 min", value: "30" },
        { label: "> 30 min", value: "31" },
    ];

    // Difficulty options match FilterDropdown.tsx
    const difficultyOptions = [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
    ];

    const isDifficultyFilterActive = queryParams.difficulty !== undefined;
    const isDurationFilterActive = queryParams.duration !== undefined;

    // Calculate active filter count for badge
    const activeFilterCount = [
        isDifficultyFilterActive ? 1 : 0,
        isDurationFilterActive ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    // Handle the clear all filters action
    const handleClearAllFilters = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleFilterChange(null);
        // Optionally close popover
        setOpen(false);
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
                                onClick={handleClearAllFilters}
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
                                value={queryParams.difficulty || ""}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        value === queryParams.difficulty
                                            ? null
                                            : value
                                    )
                                }
                                className="grid grid-cols-3 gap-2"
                            >
                                {difficultyOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`difficulty-${option.value}`}
                                            className="absolute opacity-0 w-full h-full cursor-pointer"
                                        />
                                        <Label
                                            htmlFor={`difficulty-${option.value}`}
                                            className={cn(
                                                "px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors w-full h-full",
                                                queryParams.difficulty ===
                                                    option.value
                                                    ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                            )}
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm mb-2">
                                Duration
                            </h3>
                            <RadioGroup
                                value={queryParams.duration || ""}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        value === queryParams.duration
                                            ? null
                                            : value 
                                    )
                                }
                                className="grid grid-cols-3 gap-2"
                            >
                                {durationOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={`duration-${option.value}`}
                                            className="absolute opacity-0 w-full h-full cursor-pointer"
                                        />
                                        <Label
                                            htmlFor={`duration-${option.value}`}
                                            className={cn(
                                                "px-3 py-1.5 text-xs rounded-md flex items-center justify-center cursor-pointer transition-colors w-full h-full",
                                                queryParams.duration ===
                                                    option.value
                                                    ? "bg-cyan-100 text-cyan-700 font-medium border border-cyan-300"
                                                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                                            )}
                                        >
                                            {option.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default LibraryFilter;
