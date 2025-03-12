interface DifficultyBadgeProps {
    difficulty: "Beginner" | "Intermediate" | "Advanced";
};

// Difficulty to color mapping
const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
};

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    return (
        <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}
        >
            {difficulty}
        </span>
    );
};

export default DifficultyBadge;
