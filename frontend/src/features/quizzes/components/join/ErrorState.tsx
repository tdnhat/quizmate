import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorStateProps {
    error: string;
    isFullPage?: boolean;
}

export const ErrorState = ({ error, isFullPage = true }: ErrorStateProps) => {
    if (isFullPage) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="text-center text-destructive">
            <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
            <p>{error}</p>
        </div>
    );
}; 