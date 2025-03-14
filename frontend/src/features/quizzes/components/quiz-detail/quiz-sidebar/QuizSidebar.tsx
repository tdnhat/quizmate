import { Quiz } from "@/types/quiz";
import QuizActionCard from "./quiz-action-card/QuizActionCard";
import QuizShareCard from "./quiz-share-card/QuizShareCard";
interface QuizSidebarProps {
    quiz: Quiz;
}

const QuizSidebar = ({ quiz }: QuizSidebarProps) => {
    return (
        <div className="flex flex-col gap-6">
            <QuizActionCard quiz={quiz} />
            <QuizShareCard />
        </div>
    )
}

export default QuizSidebar