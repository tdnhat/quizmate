import CategoryGrid from "@/components/layout/CategoryGrid";
import ErrorMessage from "@/components/feedback/ErrorMessage";
import SectionHeader from "@/components/layout/SectionHeader";
import { useCategories } from "@/hooks/useCategories";
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
