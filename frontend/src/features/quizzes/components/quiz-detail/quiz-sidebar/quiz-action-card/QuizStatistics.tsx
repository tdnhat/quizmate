import QuizDuration from "./QuizDuration";
import QuizQuestionCount from "./QuizQuestionCount";
import QuizDifficultyBadge from "./QuizDifficultyBadge";
import QuizTagsList from "./QuizTagsList";
import { Separator } from "@/components/ui/separator";
import QuizAuthorInfo from "./QuizAuthorInfo";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuizStatistics = () => {
    const { quiz } = useTakeQuiz();
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full gap-4">
                <QuizDuration timeMinutes={quiz.timeMinutes || 0} />
                <QuizQuestionCount count={quiz.questions?.length || 0} />
            </div>

            <QuizDifficultyBadge difficulty={quiz.difficulty} />

            <QuizTagsList tags={quiz.tags || []} />

            <Separator />

            <QuizAuthorInfo author={quiz.appUser || {}} />
        </div>
    );
};

export default QuizStatistics;
