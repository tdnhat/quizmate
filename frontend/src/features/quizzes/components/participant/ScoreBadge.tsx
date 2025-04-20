import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
    score: number;
}

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
    return (
        <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Score: {score}</span>
        </Badge>
    );
}; 