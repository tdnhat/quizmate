import { Quiz } from "@/types/quiz";
import DifficultyBadge from "./DifficultyBadge";

interface QuizThumbnailProps {
    quiz: Quiz;
}

const QuizThumbnail = ({ quiz }: QuizThumbnailProps) => {
    return (
        <div className="relative h-36 overflow-hidden">
            <img
                src={quiz.thumbnail}
                alt={quiz.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
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
                <DifficultyBadge difficulty={quiz.difficulty} />
            </div>
        </div>
    );
};

export default QuizThumbnail;
