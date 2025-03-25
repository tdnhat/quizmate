import { Clock, Users } from "lucide-react";

interface QuizStatisticsProps {
    timeMinutes: number;
    questionCount: number;
    completions: number;
}

const QuizStatistics = ({
    timeMinutes,
    questionCount,
    completions,
}: QuizStatisticsProps) => {
    return (
        <div className="flex w-full items-center justify-start gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {timeMinutes} min
            </div>
            <div className="flex items-center">
                <span className="mr-1">{questionCount}</span> questions
            </div>
            <div className="flex items-center">
                <Users size={14} className="mr-1" />
                {completions > 1000
                    ? `${(completions / 1000).toFixed(1)}k`
                    : completions}
            </div>
        </div>
    );
};

export default QuizStatistics;
