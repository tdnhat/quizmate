import { Quiz } from "@/types/quiz";
import QuizMainContent from "./quiz-main-content/QuizMainContent";
import QuizSidebar from "./QuizSidebar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface QuizDetailContainerProps {
    quiz: Quiz;
}

const QuizDetailContainer = ({ quiz }: QuizDetailContainerProps) => {
    const navigate = useNavigate();

    const handleBackToDiscover = () => {
        navigate("/discover");
    };

    return (
        <div className="space-y-4">
            <Button
                variant="outline"
                size="sm"
                className="text-gray-500 cursor-pointer"
                onClick={handleBackToDiscover}
            >
                <ChevronLeft className="h-5 w-5" />
                Back to Discover
            </Button>
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
