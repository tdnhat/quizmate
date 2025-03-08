import { Skeleton } from "../../../components/ui/skeleton";

const CategorySkeleton = () => {
    return (
        <div className="relative block h-40 rounded-xl overflow-hidden shadow-md">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
                <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

export default CategorySkeleton;