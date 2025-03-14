import QuizDuration from "./QuizDuration";
import QuizQuestionCount from "./QuizQuestionCount";
import QuizDifficultyBadge from "./QuizDifficultyBadge";
import QuizTagsList from "./QuizTagsList";
import { Separator } from "@/components/ui/separator";
import QuizAuthorInfo from "./QuizAuthorInfo";
import { DifficultyLevel, QuizAuthor } from "@/types/quiz";
interface Props {
    timeMinutes: number;
    questionCount: number;
    difficulty: DifficultyLevel;
    tags: string[];
    author: QuizAuthor;
}

const QuizStatistics = ({
    timeMinutes,
    questionCount,
    difficulty,
    tags,
    author,
}: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full gap-4">
                <QuizDuration timeMinutes={timeMinutes} />
                <QuizQuestionCount count={questionCount} />
            </div>

            <QuizDifficultyBadge difficulty={difficulty} />

            <QuizTagsList tags={tags} />

            <Separator />

            <QuizAuthorInfo author={author} />
        </div>
    );
};

export default QuizStatistics;
