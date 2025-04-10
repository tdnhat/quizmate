import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";
import { QuizzesProvider } from "@/features/quizzes/contexts/QuizzesContext";

const AllQuizzesPage = () => {
    return (
        <div className="container mx-auto p-4">
            <QuizzesBreadcrumb currentPage="all" />
            <h1 className="text-2xl font-bold mb-6">All Quizzes</h1>
            <QuizzesProvider>
                <QuizGrid
                    showFilters={true}
                    showSearch={true}
                    showSort={true}
                    showViewToggle={true}
                />
            </QuizzesProvider>
        </div>
    );
};

export default AllQuizzesPage;
