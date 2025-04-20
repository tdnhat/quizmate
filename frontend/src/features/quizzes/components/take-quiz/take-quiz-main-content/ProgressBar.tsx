import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import { Progress } from "@/components/ui/progress";
const ProgressBar = () => {
    const { quiz, getAnsweredQuestionsCount } = useTakeQuiz();

    const answeredQuestionsCount = getAnsweredQuestionsCount();
    const progress =
        (answeredQuestionsCount / (quiz.questions?.length || 0)) * 100;

    return (
        <div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 flex justify-between text-xs">
                <span>Progress: {Math.round(progress)}%</span>
                <span>
                    {answeredQuestionsCount} of {quiz.questions?.length}{" "}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
