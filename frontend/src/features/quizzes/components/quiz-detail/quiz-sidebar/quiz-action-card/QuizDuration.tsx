import { Clock } from "lucide-react";

interface Props {
    timeMinutes: number;
}

const QuizDuration = ({ timeMinutes }: Props) => {
    return (
        <div className="flex flex-col w-full items-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-gray-500 mb-1" />
            <span className="text-sm text-gray-500">Duration</span>
            <span className="font-medium">{timeMinutes} mins</span>
        </div>
    );
};

export default QuizDuration;
