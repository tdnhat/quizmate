import { Loader2 } from "lucide-react";

export const LoadingState = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg">Loading quiz information...</p>
            </div>
        </div>
    );
};
