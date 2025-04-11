import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useFilter } from "@/features/filters/hooks/useFilter";

const SearchBar = () => {
    const { filters, handleFilterChange } = useFilter();
    const [searchValue, setSearchValue] = useState(filters.search || "");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchValue !== filters.search) {
                handleFilterChange("search", searchValue);
            }
        }
    };

    const clearSearch = () => {
        setSearchValue("");
        handleFilterChange("search", "");
    };

    return (
        <div className="relative bg-white shadow-sm rounded-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
                type="text"
                placeholder="Search quizzes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
            />
            {searchValue && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    <X className="h-4 w-4 text-gray-400" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
