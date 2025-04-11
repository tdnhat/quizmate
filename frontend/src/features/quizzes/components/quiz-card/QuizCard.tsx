import { Quiz } from "@/types/quiz";
import { Link } from "react-router-dom";
import QuizThumbnail from "./QuizThumbnail";
import AuthorInfo from "./AuthorInfo";
import RatingDisplay from "./RatingDisplay";
import QuizStatistics from "./QuizStatistics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuizCardProps {
    quiz: Quiz;
    viewMode?: "grid" | "list";
}

const QuizCard = ({ quiz, viewMode = "grid" }: QuizCardProps) => {
    const isListView = viewMode === "list";

    return (
        <Link
            to={`/quizzes/${quiz.slug}`}
            className="block h-full group"
            style={{ backgroundColor: "white" }}
        >
            <Card 
                className={cn(
                    "h-full border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden",
                    isListView ? "flex items-stretch py-0" : "py-0"
                )}
            >
                {/* Thumbnail with overlay */}
                <div
                    className={cn(
                        "overflow-hidden",
                        isListView ? "flex-shrink-0 w-48 self-stretch" : ""
                    )}
                >
                    <div className={isListView ? "h-full" : ""}>
                        <QuizThumbnail quiz={quiz} viewMode={viewMode} />
                    </div>
                </div>

                {/* Quiz info */}
                <div className={cn(
                    "flex flex-col",
                    isListView ? "flex-1 justify-between" : ""
                )}>
                    <CardContent className={cn(
                        "p-4",
                        isListView ? "mb-auto" : ""
                    )}>
                        <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {quiz.title}
                        </h3>

                        <p
                            className={cn(
                                "text-gray-500 text-sm mt-1",
                                !isListView && "line-clamp-2 h-10"
                            )}
                        >
                            {quiz.description}
                        </p>
                    </CardContent>

                    <CardFooter className={cn(
                        "p-4 pt-0 flex-col items-start",
                        isListView ? "mt-3" : ""
                    )}>
                        <div
                            className={cn(
                                "flex items-center w-full",
                                isListView ? "justify-between" : "mt-3 justify-between"
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
                            questionCount={quiz.questionCount}
                            completions={quiz.completions}
                        />
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
};

export default QuizCard;
