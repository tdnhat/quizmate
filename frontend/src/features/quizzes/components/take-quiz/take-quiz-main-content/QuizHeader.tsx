import Timer from "./Timer";
import { useTakeQuiz } from "../../../hooks/useTakeQuiz";
import ConfirmationModal from "./ConfirmationModal";
import ProgressBar from "./ProgressBar";
interface QuizHeaderProps {
    title: string;
}

const QuizHeader = ({ title }: QuizHeaderProps) => {
    const { quizCompleted } = useTakeQuiz();

    if (quizCompleted) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{title}</h3>
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
