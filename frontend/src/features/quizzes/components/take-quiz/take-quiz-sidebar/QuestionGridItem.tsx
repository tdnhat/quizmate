import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import { CheckIcon } from "lucide-react";

interface QuestionGridItemProps {
    index: number;
}

const QuestionGridItem = ({ index }: QuestionGridItemProps) => {
    const {
        currentQuestionIndex,
        navigateToQuestion,
        isQuestionAnswered,
        quiz,
        isQuestionFlagged,
    } = useTakeQuiz();

    const question = quiz?.questions?.[index];

    const isAnswered = question ? isQuestionAnswered(question.id) : false;

    const isFlagged = question ? isQuestionFlagged(question.id) : false;

    const isCurrent = currentQuestionIndex === index;

    const handleClick = () => {
        navigateToQuestion(index);
    };

    const getButtonStyles = () => {
        if (isCurrent) {
            return "bg-cyan-600 text-white border-cyan-700 shadow-md";
        } else if (isAnswered && !isFlagged) {
            return "bg-green-100 text-green-800 border-green-300 hover:bg-green-200";
        } else if (!isAnswered && !isFlagged) {
            return "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200";
        } else if (isFlagged) {
            return "bg-amber-100 text-amber-600 border-amber-300";
        }
    };

    return (
        <button
            className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer 
                    transition-all border ${getButtonStyles()}`}
            onClick={handleClick}
            aria-label={`Question ${index + 1}`}
            title={isAnswered ? "Answered" : "Not Answered"}
        >
            {isAnswered && !isCurrent ? (
                <CheckIcon className="w-3 h-3 text-green-600" />
            ) : (
                <span className="text-xs font-medium">{index + 1}</span>
            )}
        </button>
    );
};

export default QuestionGridItem;
