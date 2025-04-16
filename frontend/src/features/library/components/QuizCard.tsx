import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import QuizThumbnail from "@/features/quizzes/components/quiz-card/QuizThumbnail";
import AuthorInfo from "@/features/quizzes/components/quiz-card/AuthorInfo";
import RatingDisplay from "@/features/quizzes/components/quiz-card/RatingDisplay";
import QuizStatistics from "@/features/quizzes/components/quiz-card/QuizStatistics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookmarkIcon, Bookmark } from "lucide-react";
import { useToggleSaveQuizMutation } from "../hooks/useLibraryMutations";
import { useIsSaved } from "../hooks/useIsSaved";
import { useState, useEffect } from "react";

interface QuizCardProps {
    quiz: Quiz;
    viewMode?: "grid" | "list";
}

const QuizCard = ({ quiz, viewMode = "grid" }: QuizCardProps) => {
    const isListView = viewMode === "list";
    const { mutate: toggleSave } = useToggleSaveQuizMutation();
    const { data: savedData } = useIsSaved(quiz.id);

    // Local state for optimistic UI updates
    const [isSaved, setIsSaved] = useState(false);

    // Sync with server data when it changes
    useEffect(() => {
        if (savedData?.isSaved !== undefined) {
            setIsSaved(savedData.isSaved);
        }
    }, [savedData]);

    const handleToggleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistically update UI
        setIsSaved(!isSaved);

        toggleSave({
            quizId: quiz.id,
            title: quiz.title,
        });
    };

    return (
        <div className="h-full group">
            <Card
                className={cn(
                    "h-full gap-0 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden",
                    isListView ? "flex flex-row items-stretch py-0" : "py-0"
                )}
            >
                {/* Thumbnail with overlay */}
                <div
                    className={cn(
                        "overflow-hidden relative",
                        isListView ? "flex-shrink-0 w-48 self-stretch" : ""
                    )}
                >
                    <div className={isListView ? "h-full" : ""}>
                        <QuizThumbnail quiz={quiz} viewMode={viewMode} />
                    </div>
                    <button
                        onClick={handleToggleSave}
                        className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600 bg-white/80 rounded-full p-1 transition-all"
                        aria-label={
                            isSaved ? "Remove from library" : "Add to library"
                        }
                    >
                        {isSaved ? (
                            <Bookmark className="w-5 h-5 fill-yellow-500" />
                        ) : (
                            <BookmarkIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Quiz info */}
                <div
                    className={cn(
                        "flex flex-col",
                        isListView ? "flex-1 justify-between" : ""
                    )}
                >
                    <CardContent
                        className={cn("p-4", isListView ? "mb-auto" : "")}
                    >
                        <Link to={`/quizzes/${quiz.slug}`} className="block">
                            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {quiz.title}
                            </h3>
                        </Link>

                        <p
                            className={cn(
                                "text-gray-500 text-sm mt-1",
                                !isListView && "line-clamp-2"
                            )}
                        >
                            {quiz.description}
                        </p>
                    </CardContent>

                    <CardFooter
                        className={cn(
                            "p-4 pt-0 flex-col items-start mt-auto",
                            isListView ? "mt-3" : ""
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center w-full",
                                isListView
                                    ? "justify-between"
                                    : "justify-between"
                            )}
                        >
                            <AuthorInfo
                                userName={quiz.appUser.userName}
                                displayName={quiz.appUser.displayName}
                                avatarUrl={quiz.appUser.avatarUrl}
                            />

                            <RatingDisplay rating={quiz.rating} />
                        </div>

                        <QuizStatistics
                            timeMinutes={quiz.timeMinutes}
                            questionCount={quiz.questionCount || 0}
                            completions={quiz.completions}
                        />
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
};

export default QuizCard;
