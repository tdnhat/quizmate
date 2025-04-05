import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";

const QuizCTAButtons = () => {
    const { quiz } = useTakeQuiz();
    const navigate = useNavigate();

    const handleHostQuiz = () => {
        navigate(`/quizzes/${quiz?.slug}/host`, {
            state: {
                quiz,
            },
        });
    };

    const handleTakeQuiz = () => {
        navigate(`/quizzes/${quiz?.slug}/take`, {
            state: { quiz },
        });
    };
    return (
        <>
        <Button
                className="w-full text-lg py-6 bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                size="lg"
                onClick={handleHostQuiz}
            >
                Host Quiz
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
                className="w-full text-lg py-6 cursor-pointer border border-gray-200 hover:shadow transition-colors"
                size="lg"
                variant="secondary"
                onClick={handleTakeQuiz}
            >
                Practice
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
        </>
    );
};

export default QuizCTAButtons;
