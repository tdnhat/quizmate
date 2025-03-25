import { useQuery } from "@tanstack/react-query";
import { getRecentlyAddedCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import BackButton from "@/components/shared/components/BackButton";

const RecentCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories", "recent"],
        queryFn: getRecentlyAddedCategories,
    });

    return (
        <div className="container mx-auto py-8 px-4 md:px-8">
            <BackButton route="/categories" label="Back to Categories" />
            <h1 className="text-2xl font-bold mb-6">
                Recently Added Categories
            </h1>
            <CategoryGrid categories={categories} isLoading={isLoading} />
        </div>
    );
};

export default RecentCategoriesPage;
