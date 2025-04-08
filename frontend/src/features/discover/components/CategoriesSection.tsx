import CategoryGrid from "@/features/categories/components/CategoryGrid";
import ErrorMessage from "@/components/shared/components/ErrorMessage";
import SectionHeader from "@/features/discover/components/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "@/api/category";
import { ArrowRight } from "lucide-react";

const CategoriesSection = () => {
    const {
        data: featuredCategories = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["categories", "featured"],
        queryFn: getFeaturedCategories,
    });

    if (error) {
        return (
            <div className="flex flex-col w-full">
                <SectionHeader
                    title="Featured Categories"
                    actionLink="/categories"
                    actionText="View all"
                    icon={<ArrowRight size={16} />}
                />
                <ErrorMessage message={error.message} />
            </div>
        );
    }

    return (
            <div className="flex flex-col w-full">
                <SectionHeader
                    title="Featured Categories"
                    actionLink="/categories"
                    actionText="View all"
                    icon={<ArrowRight size={16} />}
                />

                <CategoryGrid
                    categories={featuredCategories}
                    isLoading={isLoading}
                />
            </div>
    );
};

export default CategoriesSection;
