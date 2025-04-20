import { Quiz } from "@/types/quiz";
import QuizCard from "./QuizCard";
import QuizSkeleton from "@/features/quizzes/components/quiz-card/QuizSkeleton";
import { useViewportSize } from "@/hooks/useViewportSize";
import { useLibraryContext } from "../context/LibraryContext";
import NoQuizzesFound from "@/components/shared/components/NoQuizzesFound";

interface QuizListProps {
    quizzes: Quiz[];
    isLoading: boolean;
    error: Error | null;
}

const QuizList = ({ quizzes, isLoading, error }: QuizListProps) => {
    const { width } = useViewportSize();
    const { viewMode } = useLibraryContext();

    // Force grid view on smaller screens
    const effectiveViewMode = width < 970 ? "grid" : viewMode;

    const gridClassName =
        effectiveViewMode === "list"
            ? "space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>Error loading saved quizzes</p>
                <p className="text-sm">{error.message}</p>
            </div>
        );
    }

    if (!isLoading && quizzes.length === 0) {
        return (
            <NoQuizzesFound />
        );
    }

    return (
        <div>
            {isLoading ? (
                <div className="space-y-8">
                    <div className={gridClassName}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <QuizSkeleton
                                key={i}
                                viewMode={effectiveViewMode}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={gridClassName}>
                    {quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            viewMode={effectiveViewMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizList;
