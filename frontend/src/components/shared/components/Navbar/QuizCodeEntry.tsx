import { useState, useEffect } from "react";
import { Search, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSessionByJoinCode } from "@/features/quizzes/hooks/participant/useSessionByJoinCode";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

interface QuizCodeEntryProps {
    onJoin?: (code: string) => void;
    className?: string;
}

const QuizCodeEntry = ({ onJoin, className }: QuizCodeEntryProps) => {
    const { token } = useAuth();
    const [joinCode, setJoinCode] = useState("");
    const [debouncedCode, setDebouncedCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isValidFormat, setIsValidFormat] = useState(false);

    // Debounce the join code input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedCode(joinCode);
        }, 500); // 500ms debounce delay

        return () => clearTimeout(timer);
    }, [joinCode]);

    // Validate format when debounced code changes
    useEffect(() => {
        const valid =
            debouncedCode.length === 6 && /^[A-Za-z0-9]+$/.test(debouncedCode);
        setIsValidFormat(valid);

        // If format is invalid and there's input, show format error
        if (debouncedCode.length > 0 && !valid) {
            setErrorMessage("Code must be 6 alphanumeric characters");
        } else {
            setErrorMessage("");
        }
    }, [debouncedCode]);

    // Clear error when input changes
    useEffect(() => {
        if (errorMessage) {
            setErrorMessage("");
        }
    }, [joinCode]);

    // Use React Query to validate the join code, but only when format is valid
    const {
        data: sessionData,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useSessionByJoinCode(isValidFormat ? debouncedCode : "", token);

    // Set error message when query fails
    useEffect(() => {
        if (isError && error instanceof Error) {
            if (error.message.includes("not found")) {
                setErrorMessage("Invalid quiz code");
            } else {
                setErrorMessage("Error validating code");
            }
        }
    }, [isError, error]);

    // Handle join button click
    const handleJoin = () => {
        if (isValidFormat && isSuccess && sessionData) {
            onJoin?.(joinCode);
            setJoinCode("");
        }
    };

    const showValidation = debouncedCode.length > 0;
    const showFormatError = showValidation && !isValidFormat;
    const showApiValidation = showValidation && isValidFormat;

    return (
        <div className={cn("flex justify-center", className)}>
            <div className="relative flex items-center max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.trim())}
                    placeholder="123 456"
                    className={cn(
                        "pl-9 pr-12 bg-gray-50 text-center border-gray-200 focus:bg-white transition-all w-full",
                        isLoading && showApiValidation && "pr-12",
                        isSuccess &&
                            showApiValidation &&
                            "border-cyan-500 focus:border-cyan-600 pr-24",
                        (isError || showFormatError) &&
                            "border-red-300 focus:border-red-400 pr-12"
                    )}
                />

                {/* Loading indicator - only when format is valid */}
                {isLoading && showApiValidation && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="h-4 w-4 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin" />
                    </div>
                )}

                {/* Format error indicator */}
                {showFormatError && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className="bg-red-50 text-red-800 border border-red-200"
                            >
                                <p>{errorMessage || "Invalid code format"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {/* API validation error indicator */}
                {isError && showApiValidation && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className="bg-red-50 text-red-800 border border-red-200"
                            >
                                <p>{errorMessage || "Invalid code"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {/* Success indicator and join button */}
                {isSuccess && showApiValidation && (
                    <>
                        <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
                            <Check className="h-4 w-4 text-emerald-500" />
                        </div>

                        <Button
                            onClick={handleJoin}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-3 bg-cyan-600 hover:bg-cyan-700 text-white"
                            size="sm"
                        >
                            Join
                            <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizCodeEntry;
