import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuizSummary = () => {
    const { quiz, getAnsweredQuestionsCount, flaggedQuestions } = useTakeQuiz();
    return (
        <div className="text-xs space-y-2">
            <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-medium">{quiz.questions?.length}</span>
            </div>
            <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-medium">
                    {getAnsweredQuestionsCount()}
                </span>
            </div>
            <div className="flex justify-between">
                <span>Flagged:</span>
                <span className="font-medium">{flaggedQuestions.length}</span>
            </div>
            <div className="flex justify-between">
                <span>Remaining:</span>
                <span className="font-medium">
                    {(quiz.questions?.length ?? 0) -
                        getAnsweredQuestionsCount()}
                </span>
            </div>
        </div>
    );
};

export default QuizSummary;
