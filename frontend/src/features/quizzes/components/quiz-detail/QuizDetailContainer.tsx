import QuizMainContent from "./quiz-main-content/QuizMainContent";
import QuizSidebar from "./quiz-sidebar/QuizSidebar";
import QuizDetailBreadcrumb from "./QuizDetailBreadcrumb";

const QuizDetailContainer = () => {
    return (
        <div className="space-y-4">
            <QuizDetailBreadcrumb />
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                <div className="flex-1">
                    <QuizMainContent />
                </div>

                <aside className="w-full lg:w-[350px] flex-shrink-0">
                    <QuizSidebar />
                </aside>
            </div>
        </div>
    );
};

export default QuizDetailContainer;
