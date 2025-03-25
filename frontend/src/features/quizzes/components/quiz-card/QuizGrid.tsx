import { Quiz } from "@/types/quiz";
import QuizCard from "./QuizCard";
import QuizSkeleton from "./QuizSkeleton";

interface QuizGridProps {
    quizzes: Quiz[];
    isLoading?: boolean;
    count?: number;
    viewMode?: "grid" | "list"; // New prop for switching between view modes
}

const QuizGrid = ({
    quizzes,
    isLoading,
    count = 10,
    viewMode = "grid",
}: QuizGridProps) => {
    // Determine the grid layout based on viewMode
    const gridClassName =
        viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col space-y-4";

    return (
        <div className={gridClassName}>
            {isLoading
                ? Array.from({ length: count }).map((_, index) => (
                    <QuizSkeleton key={index} viewMode={viewMode} />
                ))
                : quizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                ))}
        </div>
    );
};

export default QuizGrid;
