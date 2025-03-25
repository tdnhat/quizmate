import { Category } from "@/types/category";
import { Link } from "react-router-dom";

interface Props {
    category: Category;
}

const CategoryCard = ({ category }: Props) => {
    return (
        <Link
            to={`/categories/${category.slug}`}
            className="group relative block h-40 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
            {/* Background gradient overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${
                    category.color
                        ? category.color
                        : "from-blue-700 to-blue-500"
                } transition-all duration-300 group-hover:opacity-90`}
            ></div>

            {category.image && (
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-500 ease-in-out transform group-hover:scale-110 group-hover:opacity-30"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                    }}
                />
            )}

            {/* Hover overlay for darkening effect */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                        {category.name}
                    </h3>
                    <p className="text-white text-sm opacity-90">
                        {category.description}
                    </p>
                </div>

                {/* Quiz count badge */}
                <div className="self-start transition-all duration-300 group-hover:translate-y-[-2px]">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white group-hover:bg-white/30">
                        {category.quizCount || 0}{" "}
                        {category.quizCount === 1 ? "quiz" : "quizzes"}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
