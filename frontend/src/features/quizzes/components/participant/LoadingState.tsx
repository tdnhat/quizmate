import DotLoader from "@/components/shared/components/loaders/DotLoader";

interface LoadingStateProps {
    message?: string;
}

export const LoadingState = ({
    message = "Connecting to quiz session...",
}: LoadingStateProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <DotLoader />
                <p className="text-lg">{message}</p>
            </div>
        </div>
    );
};
