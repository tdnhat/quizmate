import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import QuizThumbnail from "./QuizThumbnail";
import AuthorInfo from "./AuthorInfo";
import RatingDisplay from "./RatingDisplay";
import QuizStatistics from "./QuizStatistics";

interface QuizCardProps {
    quiz: Quiz;
    viewMode?: "grid" | "list";
}

const QuizCard = ({ quiz, viewMode = "grid" }: QuizCardProps) => {
    const isListView = viewMode === "list";

    return (
        <Link
            to={`/quizzes/${quiz.slug}`}
            className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group ${
                isListView ? "flex" : ""
            }`}
        >
            {/* Thumbnail with overlay */}
            <div className={isListView ? "flex-shrink-0 w-48" : ""}>
                <QuizThumbnail quiz={quiz} />
            </div>

            {/* Quiz info */}
            <div className={`p-4 ${isListView ? "flex-1 flex flex-col justify-between" : ""}`}>
                <div className={isListView ? "mb-auto" : ""}>
                    <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {quiz.title}
                    </h3>

                    <p className={`text-gray-500 text-sm ${isListView ? "mt-1" : "mt-1 line-clamp-2 h-10"}`}>
                        {quiz.description}
                    </p>
                </div>

                <div className={`${isListView ? "mt-3" : ""}`}>
                    <div className={`flex items-center ${isListView ? "justify-between" : "mt-3 justify-between"}`}>
                        <AuthorInfo
                            userName={quiz.appUser.userName}
                            displayName={quiz.appUser.displayName}
                            avatarUrl={quiz.appUser.avatarUrl}
                        />

                        <RatingDisplay rating={quiz.rating} />
                    </div>

                    <QuizStatistics
                        timeMinutes={quiz.timeMinutes}
                        questionCount={quiz.questionCount}
                        completions={quiz.completions}
                    />
                </div>
            </div>
        </Link>
    );
};

export default QuizCard;
