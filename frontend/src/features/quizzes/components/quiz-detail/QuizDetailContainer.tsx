import { Quiz } from "@/types/quiz";
import QuizMainContent from "./quiz-main-content/QuizMainContent";
import QuizSidebar from "./QuizSidebar";

interface QuizDetailContainerProps {
    quiz: Quiz;
}

const QuizDetailContainer = ({ quiz }: QuizDetailContainerProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-8 px-6 py-8 max-w-6xl mx-auto">
            {/* Left Column (Main Content) */}
            <div className="flex-1">
                <QuizMainContent quiz={quiz} />
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="w-full md:w-[300px] flex-shrink-0">
                <QuizSidebar quiz={quiz} />
            </aside>
        </div>
    );
};

export default QuizDetailContainer;
