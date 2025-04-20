import QuizActionCard from "./quiz-action-card/QuizActionCard";
import QuizShareCard from "./quiz-share-card/QuizShareCard";

const QuizSidebar = () => {
    return (
        <div className="flex flex-col gap-6">
            <QuizActionCard />
            <QuizShareCard />
        </div>
    )
}

export default QuizSidebar