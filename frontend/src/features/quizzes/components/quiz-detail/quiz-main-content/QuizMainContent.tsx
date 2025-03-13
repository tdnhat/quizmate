import { Quiz } from "@/types/quiz";
import QuizThumbnail from "./QuizThumbnail";
import QuizTitle from "./QuizTitle";
import QuizRating from "./QuizRating";
import QuizDescription from "./QuizDescription";
import QuizPreviewQuestions from "./QuizPreviewQuestions";
import { Separator } from "@/components/ui/separator";
interface QuizMainContentProps {
    quiz: Quiz;
}

const QuizMainContent = ({ quiz }: QuizMainContentProps) => {
    return (
        <div className="space-y-6">
            <QuizThumbnail thumbnail={quiz.thumbnail} />
            <QuizTitle title={quiz.title} />
            <QuizRating rating={quiz.rating} completions={quiz.completions} />
            <QuizDescription description={quiz.description} />

            <Separator />

            <QuizPreviewQuestions questions={quiz.questions} />
        </div>
    );
};

export default QuizMainContent;
