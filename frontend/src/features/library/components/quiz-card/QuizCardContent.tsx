import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import AuthorInfo from "@/features/quizzes/components/quiz-card/AuthorInfo";
import RatingDisplay from "@/features/quizzes/components/quiz-card/RatingDisplay";
import QuizStatistics from "@/features/quizzes/components/quiz-card/QuizStatistics";
import { CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizCardContentProps {
    quiz: Quiz;
    viewMode: "grid" | "list";
}

const QuizCardContent = ({ quiz, viewMode }: QuizCardContentProps) => {
    const isListView = viewMode === "list";
    
    return (
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
    );
};

export default QuizCardContent; 