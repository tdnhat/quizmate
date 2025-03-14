import { Button } from "@/components/ui/button";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import { Flag } from "lucide-react";

const FlagButton = () => {
    const { getCurrentQuestion, isQuestionFlagged, toggleQuestionFlag } =
        useTakeQuiz();

    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) return null;

    const isFlagged = isQuestionFlagged(currentQuestion.id);

    const handleClick = () => {
        toggleQuestionFlag(currentQuestion.id);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className={`cursor-pointer ${isFlagged ? "text-amber-500" : "text-gray-500"}`}
            title={
                isFlagged
                    ? "Unflag this question"
                    : "Flag this question for review"
            }
        >
            <Flag className={`h-4 w-4 ${isFlagged ? "fill-amber-500" : ""}`} />
        </Button>
    );
};

export default FlagButton;
