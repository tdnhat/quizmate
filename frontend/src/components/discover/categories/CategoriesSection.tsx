import { ArrowRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

// Define the category type
interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    quizCount: number;
    color: string;
}

const CategoriesSection = () => {
    const categories: Category[] = [
        {
            id: "math",
            name: "Mathematics",
            image: "/categories/mathematics.png",
            description: "Algebra, calculus, geometry and more",
            quizCount: 42,
            color: "from-blue-500 to-cyan-400",
        },
        {
            id: "science",
            name: "Science",
            image: "/categories/science.jpg",
            description: "Physics, chemistry, biology and astronomy",
            quizCount: 38,
            color: "from-green-500 to-emerald-400",
        },
        {
            id: "languages",
            name: "Languages",
            image: "/categories/languages.jpg",
            description: "English, Spanish, French and more",
            quizCount: 29,
            color: "from-orange-500 to-amber-400",
        },
        {
            id: "history",
            name: "History",
            image: "/categories/history.jpg",
            description: "World history, civilizations and events",
            quizCount: 35,
            color: "from-red-500 to-pink-500",
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Categories</h2>
                <Link
                    to="/categories"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                >
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
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
                                    (
                                        e.target as HTMLImageElement
                                    ).style.display = "none";
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
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
