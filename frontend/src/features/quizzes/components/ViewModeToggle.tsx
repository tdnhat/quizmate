import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { useViewportSize } from "@/hooks/useViewportSize";
import { useEffect, useState } from "react";

export type ViewMode = "grid" | "list";

interface ViewModeToggleProps {
    value: ViewMode;
    onChange: (viewMode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
    const { width } = useViewportSize();
    const [isMobileView, setIsMobileView] = useState(false);

    // Update mobile view state based on viewport width
    useEffect(() => {
        setIsMobileView(width < 970);
    }, [width]);

    if (isMobileView) {
        return null;
    }

    return (
        <div className="flex items-center space-x-1 rounded-md border border-cyan-200 p-1 bg-white shadow-sm">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("grid")}
                aria-label="Grid view"
                className={`${
                    value === "grid"
                        ? "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white"
                        : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-600"
                }`}
            >
                <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onChange("list")}
                aria-label="List view"
                className={`${
                    value === "list"
                        ? "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white"
                        : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-600"
                }`}
            >
                <List className="h-4 w-4" />
            </Button>
        </div>
    );
}
