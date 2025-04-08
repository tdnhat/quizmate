import { useQuery } from "@tanstack/react-query";
import { getPopularCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";

const PopularCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories", "popular"],
        queryFn: getPopularCategories,
    });

    return (
        <div className="container mx-auto p-4">
            <CategoryDetailBreadcrumb categoryName="Popular Categories" />
            <h1 className="text-2xl font-bold mb-6">Popular Categories</h1>
            <CategoryGrid categories={categories} isLoading={isLoading} />
        </div>
    );
};

export default PopularCategoriesPage;
