import { Users } from "lucide-react";
import { Quiz } from "@/types/quiz";

interface Props {
    quiz: Quiz;
}

const QuizQuestionCount = ({ quiz }: Props) => {
    return (
        <div className="flex flex-col w-full items-center p-3 bg-gray-50 rounded-lg">
            <Users className="h-6 w-6 text-gray-500 mb-1" />
            <span className="text-sm text-gray-500">Questions</span>
            <span className="font-medium">{quiz.questionCount}</span>
        </div>
    );
};

export default QuizQuestionCount;
