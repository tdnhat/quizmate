import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorStateProps {
    error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Alert variant="destructive" className="max-w-md">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );
};