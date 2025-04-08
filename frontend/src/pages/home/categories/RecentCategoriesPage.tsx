import { useQuery } from "@tanstack/react-query";
import { getRecentlyAddedCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";

const RecentCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories", "recent"],
        queryFn: getRecentlyAddedCategories,
    });

    return (
        <div className="container mx-auto p-4">
            <CategoryDetailBreadcrumb categoryName="Recently Added Categories" />
            <h1 className="text-2xl font-bold mb-6">
                Recently Added Categories
            </h1>
            <CategoryGrid categories={categories} isLoading={isLoading} />
        </div>
    );
};

export default RecentCategoriesPage;
