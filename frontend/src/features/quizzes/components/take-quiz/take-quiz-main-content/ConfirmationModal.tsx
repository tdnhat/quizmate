import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmationModal = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const handleExitQuiz = () => {
        navigate(`/quizzes/${quizId}`);
    };

    return (
        <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={handleExitQuiz}
        >
            Exit Quiz
        </Button>
    );
};

export default ConfirmationModal;
