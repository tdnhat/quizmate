import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";

const FeaturedCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories", "featured"],
        queryFn: getFeaturedCategories,
    });

    return (
        <div className="container mx-auto p-4">
            <CategoryDetailBreadcrumb categoryName="Featured Categories" />
            <h1 className="text-2xl font-bold mb-6">Featured Categories</h1>
            <CategoryGrid categories={categories} isLoading={isLoading} />
        </div>
    );
};

export default FeaturedCategoriesPage;
