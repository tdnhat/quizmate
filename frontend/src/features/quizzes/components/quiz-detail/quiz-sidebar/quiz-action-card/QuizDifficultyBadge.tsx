import { Badge } from "@/components/ui/badge";
import { DifficultyLevel } from "@/types/quiz";

interface QuizDifficultyBadgeProps {
    difficulty: DifficultyLevel;
}

const QuizDifficultyBadge = ({ difficulty }: QuizDifficultyBadgeProps) => {
    // Get difficulty color
    const getDifficultyColor = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "Intermediate":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "Advanced":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Difficulty
            </h3>
            <Badge className={`${getDifficultyColor(difficulty)} font-medium`}>
                {difficulty}
            </Badge>
        </div>
    );
};

export default QuizDifficultyBadge;
