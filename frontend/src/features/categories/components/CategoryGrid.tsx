import { Category } from "@/types/category";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";

interface CategoryGrid {
    categories: Category[];
    isLoading?: boolean;
}

const CategoryGrid = ({ categories, isLoading }: CategoryGrid) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {isLoading
                ? Array.from({ length: categories.length }).map((_, index) => (
                    <CategorySkeleton key={index} />
                ))
                : categories
                    .map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
        </div>
    );
};

export default CategoryGrid;
