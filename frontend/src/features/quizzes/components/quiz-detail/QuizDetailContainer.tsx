import { Quiz } from "@/types/quiz";
import QuizMainContent from "./quiz-main-content/QuizMainContent";
import QuizSidebar from "./quiz-sidebar/QuizSidebar";
import BackButton from "@/components/shared/components/BackButton";

interface QuizDetailContainerProps {
    quiz: Quiz;
}

const QuizDetailContainer = ({ quiz }: QuizDetailContainerProps) => {
    return (
        <div className="space-y-4">
            <BackButton route="/discover" label="Back to Discover" />
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                {/* Left Column (Main Content) */}
                <div className="flex-1">
                    <QuizMainContent quiz={quiz} />
                </div>

                {/* Right Column (Sidebar) */}
                <aside className="w-full md:w-[350px] flex-shrink-0">
                    <QuizSidebar quiz={quiz} />
                </aside>
            </div>
        </div>
    );
};

export default QuizDetailContainer;
