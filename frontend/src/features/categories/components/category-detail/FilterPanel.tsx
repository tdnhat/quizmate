import { Button } from "@/components/ui/button";
import { QuizFilters } from "@/types/quiz";

interface FilterPanelProps {
    filters: QuizFilters;
    handleFilterChange: (type: keyof QuizFilters, value: any) => void;
    clearAllFilters: () => void;
    closeFilters: () => void;
    getDurationInMinutes: (label: string) => number | undefined;
}

const FilterPanel = ({
    filters,
    handleFilterChange,
    clearAllFilters,
    closeFilters,
    getDurationInMinutes,
}: FilterPanelProps) => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={clearAllFilters}
                >
                    Clear all
                </button>
            </div>

            <div className="mb-4">
                <h4 className="font-medium mb-2">Difficulty Level</h4>
                <div className="flex flex-wrap gap-2">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <button
                            key={level}
                            className={`px-4 py-2 rounded-full text-sm ${
                                filters.difficulty === level
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() =>
                                handleFilterChange("difficulty", level)
                            }
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="font-medium mb-2">Duration</h4>
                <div className="flex flex-wrap gap-2">
                    {["< 15 min", "15-30 min", "> 30 min"].map((duration) => (
                        <button
                            key={duration}
                            className={`px-4 py-2 rounded-full text-sm ${
                                filters.duration ===
                                getDurationInMinutes(duration)
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() =>
                                handleFilterChange("duration", duration)
                            }
                        >
                            {duration}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeFilters}>
                    Cancel
                </Button>
                <Button onClick={closeFilters}>Apply Filters</Button>
            </div>
        </div>
    );
};

export default FilterPanel;
