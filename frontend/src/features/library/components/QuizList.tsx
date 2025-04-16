import { Quiz } from "@/types/quiz";
import QuizCard from "./QuizCard";
import QuizSkeleton from "@/features/quizzes/components/quiz-card/QuizSkeleton";
import { useState, useEffect } from "react";
import { useViewportSize } from "@/hooks/useViewportSize";
import { ViewModeToggle } from "@/features/quizzes/components/ViewModeToggle";

interface QuizListProps {
  quizzes: Quiz[];
  isLoading: boolean;
  error: Error | null;
  showViewToggle?: boolean;
}

const QuizList = ({ 
  quizzes, 
  isLoading, 
  error, 
  showViewToggle = true
}: QuizListProps) => {
  const { width } = useViewportSize();
  const [isMobileView, setIsMobileView] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update mobile view state based on viewport width
  useEffect(() => {
      setIsMobileView(width < 970);
  }, [width]);

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
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">No saved quizzes found</p>
        <p className="mt-2">Start saving quizzes to build your library</p>
      </div>
    );
  }

  return (
    <div>
      {showViewToggle && (
        <div className={isMobileView ? "hidden" : "flex justify-end items-center mb-4 gap-x-2"}>
          <ViewModeToggle
            value={viewMode}
            onChange={setViewMode}
          />
        </div>
      )}

      <div className={gridClassName}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <QuizSkeleton key={i} viewMode={effectiveViewMode} />
            ))
          : quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                viewMode={effectiveViewMode}
              />
            ))}
      </div>
    </div>
  );
};

export default QuizList; 