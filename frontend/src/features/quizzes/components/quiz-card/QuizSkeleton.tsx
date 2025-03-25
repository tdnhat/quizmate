import { Skeleton } from "@/components/ui/skeleton";

interface QuizSkeletonProps {
    viewMode?: "grid" | "list";
}

const QuizSkeleton = ({ viewMode = "grid" }: QuizSkeletonProps) => {
    // List view skeleton
    if (viewMode === "list") {
        return (
            <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex">
                {/* Thumbnail skeleton */}
                <div className="w-32 h-32 flex-shrink-0">
                    <Skeleton className="w-full h-full" />
                </div>

                {/* Content skeleton */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Title */}
                        <Skeleton className="h-5 w-3/4 mb-2" />

                        {/* Description */}
                        <Skeleton className="h-3 w-full" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-3">
                        <div className="flex items-center space-x-4">
                            {/* Author and rating */}
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-4 w-10" />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-3 w-14" />
                            <Skeleton className="h-3 w-18" />
                            <Skeleton className="h-3 w-14" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default grid view skeleton (original implementation)
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
            {/* Thumbnail skeleton */}
            <div className="relative h-36">
                <Skeleton className="w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="p-4">
                {/* Title */}
                <Skeleton className="h-5 w-full mb-2" />

                {/* Description */}
                <div className="space-y-1 mb-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                </div>

                {/* Author info and rating */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-10" />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-3 w-18" />
                    <Skeleton className="h-3 w-14" />
                </div>
            </div>
        </div>
    );
};

export default QuizSkeleton;
