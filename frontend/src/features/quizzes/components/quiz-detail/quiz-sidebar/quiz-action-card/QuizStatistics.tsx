import QuizDuration from "./QuizDuration";
import { Quiz } from "@/types/quiz";
import QuizQuestionCount from "./QuizQuestionCount";
import QuizDifficultyBadge from "./QuizDifficultyBadge";
import QuizTagsList from "./QuizTagsList";
import { Separator } from "@/components/ui/separator";
import QuizAuthorInfo from "./QuizAuthorInfo";
interface Props {
    quiz: Quiz;
}

const QuizStatistics = ({ quiz }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full gap-4">
                <QuizDuration timeMinutes={quiz.timeMinutes} />
                <QuizQuestionCount quiz={quiz} />
            </div>

            <QuizDifficultyBadge difficulty={quiz.difficulty} />

            <QuizTagsList tags={quiz.tags} />

            <Separator />

            <QuizAuthorInfo author={quiz.author} />
        </div>
    );
};

export default QuizStatistics;
