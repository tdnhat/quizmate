import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
    onClick: () => void;
}

const RefreshButton = ({ onClick }: RefreshButtonProps) => (
    <div className="flex justify-center mt-4">
        <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onClick}
        >
            <RefreshCcw className="h-4 w-4" /> Refresh List
        </Button>
    </div>
);

export default RefreshButton; 