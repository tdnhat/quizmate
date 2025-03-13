import { DifficultyLevel } from "@/types/quiz";
import { getDifficultyColor } from "@/lib/utils";
interface DifficultyBadgeProps {
    difficulty: DifficultyLevel;
};

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    return (
        <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}
        >
            {difficulty}
        </span>
    );
};

export default DifficultyBadge;
