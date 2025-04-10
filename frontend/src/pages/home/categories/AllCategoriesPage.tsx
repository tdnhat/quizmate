import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";
import { CategoryDetailProvider } from "@/features/categories/contexts/CategoryDetailContext";

const AllCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    return (
        <div className="container mx-auto p-4">
            <CategoryDetailBreadcrumb categoryName="All Categories" />
            <h1 className="text-2xl font-bold mb-6">All Categories</h1>
            <CategoryDetailProvider categorySlug="all-categories">
                <CategoryGrid categories={categories} isLoading={isLoading} />
            </CategoryDetailProvider>
        </div>
    );
};

export default AllCategoriesPage;
