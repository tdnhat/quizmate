import DotLoader from "@/components/shared/components/loaders/DotLoader";

export const LoadingState = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <DotLoader />
        </div>
    );
};
