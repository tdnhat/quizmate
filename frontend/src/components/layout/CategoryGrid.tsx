import { Category } from "@/types/category";
import CategoryCard from "../data-display/CategoryCard";
import CategorySkeleton from "../feedback/CategorySkeleton";

interface CategoryGrid {
    categories: Category[];
    isLoading?: boolean;
}

const CategoryGrid = ({ categories, isLoading }: CategoryGrid) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CategorySkeleton key={index} />
                ))
                : categories
                    .slice(0, 5)
                    .map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
        </div>
    );
};

export default CategoryGrid;
