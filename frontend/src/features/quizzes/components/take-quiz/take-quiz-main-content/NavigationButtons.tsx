import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const NavigationButtons = () => {
    const {
        currentQuestionIndex,
        goToNextQuestion,
        goToPreviousQuestion,
        quiz,
    } = useTakeQuiz();

    if (!quiz.questions) return null;

    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div className="flex justify-between">
            <Button
                variant="outline"
                className="hover:cursor-pointer"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>

            <Button
                onClick={goToNextQuestion}
                className="bg-cyan-600 hover:bg-cyan-700 text-white hover:cursor-pointer transition-colors"
                disabled={isLastQuestion}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default NavigationButtons;
