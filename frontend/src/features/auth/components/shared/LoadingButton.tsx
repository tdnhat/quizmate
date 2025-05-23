import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
    isLoading: boolean;
    loadingText: string;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const LoadingButton = ({
    isLoading,
    loadingText,
    children,
    className,
    type = "submit",
    disabled = false,
}: LoadingButtonProps) => {
    return (
        <Button
            type={type}
            className={cn("w-full hover:cursor-pointer", className)}
            disabled={isLoading || disabled}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    );
};
