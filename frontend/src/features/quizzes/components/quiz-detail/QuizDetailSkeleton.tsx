import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const QuizDetailSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Breadcrumb */}
            <Skeleton className="h-6 w-64 mb-4" />
            {/* Main content and sidebar layout */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main content area */}
                <div className="flex-1 space-y-6">
                    {/* Thumbnail */}
                    <Skeleton className="h-80 w-full" />
                    {/* Title, rating, description */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-24 w-full" />
                    </div>

                    <Separator />

                    {/* Quiz content skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-1/3" />
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-32 w-full" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full md:w-[350px] flex-shrink-0 space-y-4">
                    {/* Action card skeleton */}
                    <div className="rounded-lg border p-4 space-y-4">
                        {/* CTA button */}
                        <Skeleton className="h-10 w-full" />
                        {/* Statistics */}
                        <div className="flex justify-between w-full gap-4">
                            <Skeleton className="h-24 w-1/2" />
                            <Skeleton className="h-24 w-1/2" />
                        </div>
                        {/* Difficulty badge */}
                        <Skeleton className="h-10 w-full" />
                        {/* Tags list */}
                        <Skeleton className="h-10 w-full" />

                        <Separator />

                        {/* Author info */}
                        <Skeleton className="h-4 w-20" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>

                    {/* Share card skeleton */}
                    <div className="rounded-lg border p-4 space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-30 rounded-lg" />
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-10 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default QuizDetailSkeleton;
