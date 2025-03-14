import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuestionText = () => {
    const { getCurrentQuestion } = useTakeQuiz();
    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) return null;

    return (
        <h3 className="font-medium leading-tight">
            {currentQuestion.text}{" "}
            {currentQuestion.points && (
                <span className="text-gray-500 text-sm">
                    {`(${currentQuestion.points} points)`}
                </span>
            )}
        </h3>
    );
};

export default QuestionText;
