import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizCTAButtonProps {
    quizId: string;
}

const QuizCTAButton = ({ quizId }: QuizCTAButtonProps) => {
    const navigate = useNavigate();

    const handleTakeQuiz = () => {
        navigate(`/quizzes/${quizId}/take`);
    };
    return (
        <Button
            className="w-full text-lg py-6 bg-cyan-500 text-white cursor-pointer hover:bg-cyan-700 transition-colors"
            size="lg"
            onClick={handleTakeQuiz}
        >
            Take Quiz
            <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
    );
};

export default QuizCTAButton;
