import CategoryGrid from "@/features/discover/components/CategoryGrid";
import ErrorMessage from "@/components/shared/components/ErrorMessage";
import SectionHeader from "@/features/discover/components/SectionHeader";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { ArrowRight } from "lucide-react";

const CategoriesSection = () => {
    const { featuredCategories, isLoading, error } = useCategories();

    if (error) {
        return (
            <div className="flex flex-col w-full">
                <SectionHeader
                    title="Categories"
                    actionLink="/categories"
                    actionText="View all"
                    icon={<ArrowRight size={16} />}
                />
                <ErrorMessage message={error} />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <SectionHeader
                title="Categories"
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
