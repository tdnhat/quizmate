import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import BackButton from "@/components/shared/components/BackButton";

const FeaturedCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories", "featured"],
        queryFn: getFeaturedCategories,
    });

    return (
        <div className="container mx-auto py-8 px-4 md:px-8">
            <BackButton route="/categories" label="Back to Categories" />
            <h1 className="text-2xl font-bold mb-6">Featured Categories</h1>
            <CategoryGrid categories={categories} isLoading={isLoading} />
        </div>
    );
};

export default FeaturedCategoriesPage;
