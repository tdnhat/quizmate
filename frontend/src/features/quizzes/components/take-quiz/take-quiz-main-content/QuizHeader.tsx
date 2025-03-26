import Timer from "./Timer";
import { useTakeQuiz } from "../../../hooks/useTakeQuiz";
import ConfirmationModal from "./ConfirmationModal";
import ProgressBar from "./ProgressBar";

const QuizHeader = () => {
    const { getCurrentQuestion, quizCompleted } = useTakeQuiz();

    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) return null;

    if (quizCompleted) {
        return null;
    }

    return (
        <div className="w-full mb-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">
                        {currentQuestion.text}
                    </h3>
                    <div className="flex items-center gap-4">
                        <Timer />
                        <ConfirmationModal />
                    </div>
                </div>
                <ProgressBar />
            </div>
        </div>
    );
};

export default QuizHeader;
