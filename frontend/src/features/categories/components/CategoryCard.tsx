import { Category } from "@/types/category";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    category: Category;
}

const CategoryCard = ({ category }: Props) => {
    return (
        <Link
            to={`/categories/${category.id}`}
            className="group relative block h-40 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
            {/* Background gradient overlay with fallback color */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}
            ></div>

            {/* Optional: Image background (with fallback) */}
            {category.image && (
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
                    onError={(e) => {
                        // Remove broken image if it fails to load
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
            )}

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                        {category.name}
                    </h3>
                    <p className="text-white text-sm opacity-90">
                        {category.description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="bg-white bg-opacity-20 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                        {category.quizCount} quizzes
                    </span>
                    <span className="text-white text-sm group-hover:translate-x-1 transition-transform">
                        <MoveRight size={24} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
