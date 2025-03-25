import { Button } from "@/components/ui/button";
import { useCategoryDetail } from "../../hooks/useCategoryDetail";
import { cn } from "@/lib/utils";
import { List, Grid } from "lucide-react";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "quizApp.viewMode";

const ViewMode = () => {
    const { viewMode, setViewMode } = useCategoryDetail();

    // Load view mode from localStorage on component mount
    useEffect(() => {
        const savedViewMode = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (
            savedViewMode &&
            (savedViewMode === "grid" || savedViewMode === "list")
        ) {
            setViewMode(savedViewMode);
        }
    }, [setViewMode]);

    // Handle view mode change with localStorage update
    const handleViewModeChange = (mode: "grid" | "list") => {
        setViewMode(mode);
        localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    };

    return (
        <div className="flex">
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewModeChange("grid")}
                className={cn(
                    "rounded-l-md rounded-r-none cursor-pointer",
                    "transition-all duration-200 ease-in-out",
                    viewMode === "grid"
                        ? "bg-cyan-100 text-cyan-700 border-cyan-300"
                        : "hover:bg-gray-100"
                )}
            >
                <Grid className="h-4 w-4 mr-1" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewModeChange("list")}
                className={cn(
                    "rounded-r-md rounded-l-none cursor-pointer",
                    "transition-all duration-200 ease-in-out",
                    viewMode === "list"
                        ? "bg-cyan-100 text-cyan-700 border-cyan-300"
                        : "hover:bg-gray-100"
                )}
            >
                <List className="h-4 w-4 mr-1" />
            </Button>
        </div>
    );
};

export default ViewMode;
