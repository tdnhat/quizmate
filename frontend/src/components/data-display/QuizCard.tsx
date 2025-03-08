import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import QuizThumbnail from "../common/QuizThumbnail";
import AuthorInfo from "../common/AuthorInfo";
import RatingDisplay from "../common/RatingDisplay";
import QuizStatistics from "../common/QuizStatistics";

interface QuizCardProps {
    quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
    return (
        <Link
            to={`/quizzes/${quiz.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-gray-200 group"
        >
            {/* Thumbnail with overlay */}
            <QuizThumbnail quiz={quiz} />

            {/* Quiz info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">
                    {quiz.description}
                </p>

                <div className="flex items-center mt-3 justify-between">
                    <AuthorInfo author={quiz.author} />

                    <RatingDisplay rating={quiz.rating} />
                </div>

                <QuizStatistics
                    timeMinutes={quiz.timeMinutes}
                    questionCount={quiz.questionCount}
                    completions={quiz.completions}
                />
            </div>
        </Link>
    );
};

export default QuizCard;
