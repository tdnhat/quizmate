import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import QuestionGridItem from "./QuestionGridItem";

const QuestionGrid = () => {
    const { quiz } = useTakeQuiz();

    if (!quiz) return null;

    const questionCount = quiz.questions?.length || 0;

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {Array.from({ length: questionCount }).map((_, index) => (
                <QuestionGridItem key={index} index={index} />
            ))}
        </div>
    );
};
export default QuestionGrid;
