import { Link } from "react-router-dom";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Quiz } from "@/types/quiz";

// Difficulty to color mapping
const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
};

const RecommendedSection = () => {
    // Mock data for recommended quizzes
    const recommendedQuizzes: Quiz[] = [
        {
            id: "web-dev-basics",
            title: "Web Development Fundamentals",
            description:
                "Test your knowledge of HTML, CSS and JavaScript basics",
            author: {
                name: "Sarah Johnson",
                avatar: "/avatars/sarah.jpg",
            },
            thumbnail: "/quizzes/web-development.jpg",
            timeMinutes: 15,
            questionCount: 20,
            difficulty: "Beginner",
            rating: 4.8,
            tags: ["Web", "HTML", "CSS", "JavaScript"],
            completions: 1245,
        },
        {
            id: "python-intermediate",
            title: "Python Programming: Beyond the Basics",
            description: "Challenge yourself with intermediate Python concepts",
            author: {
                name: "Michael Chen",
                avatar: "/avatars/michael.jpg",
            },
            thumbnail: "/quizzes/python.jpg",
            timeMinutes: 25,
            questionCount: 15,
            difficulty: "Intermediate",
            rating: 4.6,
            tags: ["Python", "Programming", "Data Structures"],
            completions: 890,
        },
        {
            id: "data-science-ml",
            title: "Introduction to Machine Learning",
            description:
                "Learn the fundamentals of machine learning algorithms",
            author: {
                name: "Alex Rodriguez",
                avatar: "/avatars/alex.jpg",
            },
            thumbnail: "/quizzes/machine-learning.jpg",
            timeMinutes: 30,
            questionCount: 25,
            difficulty: "Advanced",
            rating: 4.9,
            tags: ["Data Science", "Machine Learning", "AI"],
            completions: 678,
        },
        {
            id: "uiux-design",
            title: "UI/UX Design Principles",
            description:
                "Test your knowledge about user interface and experience design",
            author: {
                name: "Emma Wilson",
                avatar: "/avatars/emma.jpg",
            },
            thumbnail: "/quizzes/uiux-design.jpg",
            timeMinutes: 20,
            questionCount: 18,
            difficulty: "Intermediate",
            rating: 4.7,
            tags: ["Design", "UI", "UX", "User Research"],
            completions: 532,
        },
    ];

    return (
        <div className="flex flex-col w-full mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recommended for You</h2>
                <Link
                    to="/quizzes"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                >
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedQuizzes.map((quiz) => (
                    <Link
                        key={quiz.id}
                        to={`/quizzes/${quiz.id}`}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group"
                    >
                        {/* Thumbnail with overlay */}
                        <div className="relative h-36">
                            <img
                                src={quiz.thumbnail}
                                alt={quiz.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to a gradient if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    target.parentElement!.classList.add(
                                        "bg-gradient-to-r",
                                        "from-purple-400",
                                        "to-indigo-500"
                                    );
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[quiz.difficulty]}`}
                                >
                                    {quiz.difficulty}
                                </span>
                            </div>
                        </div>

                        {/* Quiz info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {quiz.title}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">
                                {quiz.description}
                            </p>

                            <div className="flex items-center mt-3 justify-between">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={quiz.author.avatar}
                                        alt={quiz.author.name}
                                        className="w-6 h-6 rounded-full"
                                        onError={(e) => {
                                            // Replace broken avatar with initials
                                            const target =
                                                e.target as HTMLImageElement;
                                            target.style.display = "none";
                                            const parent =
                                                target.parentElement!;
                                            const initials = quiz.author.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("");
                                            const div =
                                                document.createElement("div");
                                            div.className =
                                                "w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold";
                                            div.textContent = initials;
                                            parent.appendChild(div);
                                        }}
                                    />
                                    <span className="text-xs text-gray-600 truncate max-w-[100px]">
                                        {quiz.author.name}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <Star
                                        size={14}
                                        className="text-yellow-400 fill-yellow-400"
                                    />
                                    <span className="text-xs text-gray-600 ml-1">
                                        {quiz.rating}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                <div className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    {quiz.timeMinutes} min
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-1">
                                        {quiz.questionCount}
                                    </span>{" "}
                                    questions
                                </div>
                                <div className="flex items-center">
                                    <Users size={14} className="mr-1" />
                                    {quiz.completions > 1000
                                        ? `${(quiz.completions / 1000).toFixed(1)}k`
                                        : quiz.completions}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecommendedSection;
