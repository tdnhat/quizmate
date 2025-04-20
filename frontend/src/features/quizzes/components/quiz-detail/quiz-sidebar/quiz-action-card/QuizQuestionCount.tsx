import { MessageCircleQuestion } from "lucide-react";
interface Props {
    count: number;
}

const QuizQuestionCount = ({ count }: Props) => {
    return (
        <div className="flex flex-col w-full items-center p-3 bg-gray-50 rounded-lg">
            <MessageCircleQuestion className="h-6 w-6 text-gray-500 mb-1" />
            <span className="text-sm text-gray-500">Questions</span>
            <span className="font-medium">{count}</span>
        </div>
    );
};

export default QuizQuestionCount;
