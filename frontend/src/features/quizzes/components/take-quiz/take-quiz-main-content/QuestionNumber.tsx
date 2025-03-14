import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuestionNumber = () => {
    const { currentQuestionIndex } = useTakeQuiz();

    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-medium text-primary-foreground">
            {currentQuestionIndex + 1}
        </div>
    );
};

export default QuestionNumber;
