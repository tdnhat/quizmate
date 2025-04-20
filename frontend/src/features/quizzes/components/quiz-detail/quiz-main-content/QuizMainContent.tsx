import QuizThumbnail from "./QuizThumbnail";
import QuizTitle from "./QuizTitle";
import QuizRating from "./QuizRating";
import QuizDescription from "./QuizDescription";
import QuizPreviewQuestions from "./QuizPreviewQuestions";
import { Separator } from "@/components/ui/separator";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuizMainContent = () => {
    const { quiz } = useTakeQuiz();

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="space-y-6">
            <QuizThumbnail thumbnail={quiz.thumbnail || ""} />
            <QuizTitle title={quiz.title || ""} />
            <QuizRating rating={quiz.rating || 0} completions={quiz.completions || 0} />
            <QuizDescription description={quiz.description || ""} />

            <Separator />

            <QuizPreviewQuestions questions={quiz.questions || []} />
        </div>
    );
};

export default QuizMainContent;
