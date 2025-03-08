import { Quiz } from "@/types/quiz";
import QuizCard from "../data-display/QuizCard";
import QuizSkeleton from "../feedback/QuizSkeleton";

interface QuizGridProps {
    quizzes: Quiz[];
    isLoading?: boolean;
    count?: number;
}

const QuizGrid = ({ quizzes, isLoading, count = 10 }: QuizGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
                ? Array.from({ length: count }).map((_, index) => (
                    <QuizSkeleton key={index} />
                ))
                : quizzes
                    .map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
        </div>
    );
};

export default QuizGrid;
