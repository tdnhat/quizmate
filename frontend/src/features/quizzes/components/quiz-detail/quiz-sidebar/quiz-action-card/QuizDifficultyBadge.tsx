import { Badge } from "@/components/ui/badge";
import { getDifficultyColor } from "@/lib/utils";
import { DifficultyLevel } from "@/types/quiz";

interface QuizDifficultyBadgeProps {
    difficulty: DifficultyLevel;
}

const QuizDifficultyBadge = ({ difficulty }: QuizDifficultyBadgeProps) => {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Difficulty Level
            </h3>
            <Badge className={`${getDifficultyColor(difficulty)} font-medium`}>
                {difficulty}
            </Badge>
        </div>
    );
};

export default QuizDifficultyBadge;
