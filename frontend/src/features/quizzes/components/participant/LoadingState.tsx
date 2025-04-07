import { Loader2 } from "lucide-react";

interface LoadingStateProps {
    message?: string;
}

export const LoadingState = ({ message = "Connecting to quiz session..." }: LoadingStateProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg">{message}</p>
            </div>
        </div>
    );
}; 