import { Badge } from "@/components/ui/badge";
import { getScoreGradientColors } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface ScoreBadgeProps {
    score: number | undefined;
    hasChanged: boolean;
}

const ScoreBadge = ({ score, hasChanged }: ScoreBadgeProps) => {
    const colorClass = getScoreGradientColors(score || 0);

    return (
        <motion.div
            key={`score-${score}`}
            initial={{ scale: hasChanged ? 1.5 : 1 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
            }}
        >
            <Badge
                className={`${colorClass} flex items-center gap-1 font-medium`}
            >
                <Award className="h-3.5 w-3.5" />
                {score || 0} pts
            </Badge>
        </motion.div>
    );
};

export default ScoreBadge;
