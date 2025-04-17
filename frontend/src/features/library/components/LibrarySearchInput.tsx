import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useLibraryContext } from "../context/LibraryContext";

const LibrarySearchInput = () => {
    const { queryParams, handleFilterChange } = useLibraryContext();
    const [searchValue, setSearchValue] = useState(
        queryParams.searchTerm || ""
    );
    const [isLoading, setIsLoading] = useState(false);

    // Update local state when query params change
    useEffect(() => {
        setSearchValue(queryParams.searchTerm || "");
    }, [queryParams.searchTerm]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchValue !== queryParams.searchTerm) {
                performSearch();
            }
        }
    };

    const performSearch = () => {
        // Set loading state
        setIsLoading(true);
        
        // Simulate loading time for better UX
        setTimeout(() => {
            handleFilterChange("searchTerm", searchValue);
            setIsLoading(false);
        }, 300);
    };

    const clearSearch = () => {
        setSearchValue("");
        setIsLoading(true);
        
        // Simulate loading time for better UX
        setTimeout(() => {
            handleFilterChange("searchTerm", "");
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className="relative bg-white shadow-sm rounded-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {isLoading ? (
                    <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                ) : (
                    <Search className="h-4 w-4 text-gray-400" />
                )}
            </div>
            <Input
                type="text"
                placeholder="Search quizzes..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
                disabled={isLoading}
            />
            {searchValue && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    disabled={isLoading}
                >
                    <X className="h-4 w-4 text-gray-400" />
                </button>
            )}
        </div>
    );
};

export default LibrarySearchInput;
