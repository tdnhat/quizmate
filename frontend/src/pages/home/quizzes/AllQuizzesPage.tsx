import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";
import { QuizzesProvider } from "@/features/quizzes/contexts/QuizzesContext";
import NoQuizzesFound from "@/components/shared/components/NoQuizzesFound";
import { useContext, useEffect } from "react";
import { QuizzesContext } from "@/features/quizzes/contexts/QuizzesContext";

// Wrapper component to handle the conditional rendering
const QuizzesContent = () => {
    const context = useContext(QuizzesContext);

    if (!context) {
        return null; // Return null if context is undefined
    }

    const { quizzes, isLoading } = context;

    if (isLoading) {
        return (
            <QuizGrid
                quizzes={[]}
                isLoading={true}
                showFilters={true}
                showSearch={true}
                showSort={true}
                showViewToggle={true}
            />
        );
    }

    if (!quizzes || quizzes.length === 0) {
        return (
            <div>
                <QuizGrid
                    quizzes={[]}
                    isLoading={false}
                    showFilters={true}
                    showSearch={true}
                    showSort={true}
                    showViewToggle={true}
                />
                <NoQuizzesFound />
            </div>
        );
    }

    return (
        <QuizGrid
            quizzes={quizzes}
            isLoading={false}
            showFilters={true}
            showSearch={true}
            showSort={true}
            showViewToggle={true}
        />
    );
};

const AllQuizzesPage = () => {
    // Move on top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <QuizzesBreadcrumb currentPage="all" />
            <h1 className="text-2xl font-bold text-cyan-600">All Quizzes</h1>
            <p className="text-gray-600 mb-6">
                Browse all quizzes on various topics.
            </p>
            <QuizzesProvider>
                <QuizzesContent />
            </QuizzesProvider>
        </div>
    );
};

export default AllQuizzesPage;
