import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="flex items-center p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;