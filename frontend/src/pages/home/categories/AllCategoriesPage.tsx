import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category";
import CategoryGrid from "@/features/categories/components/CategoryGrid";
import CategoryDetailBreadcrumb from "@/features/categories/components/category-detail/CategoryDetailBreadcrumb";
import { CategoryDetailProvider } from "@/features/categories/contexts/CategoryDetailContext";
import { useEffect } from "react";
const AllCategoriesPage = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto max-w-6xl p-4">
            <CategoryDetailBreadcrumb categoryName="All Categories" />
            <h1 className="text-2xl font-bold text-cyan-600">
                All Categories
            </h1>
            <p className="text-gray-600 mb-6">
                Explore a wide range of categories to find the perfect quiz for
                you.
            </p>
            <CategoryDetailProvider>
                <CategoryGrid categories={categories} isLoading={isLoading} />
            </CategoryDetailProvider>
        </div>
    );
};

export default AllCategoriesPage;
