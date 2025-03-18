import QuizResultsContainer from "@/features/quizzes/components/quiz-results/QuizResultsContainer";
import { QuizResultsProvider } from "@/features/quizzes/contexts/QuizResultsContext";
const QuizResultsPage = () => {
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <QuizResultsProvider>
                <QuizResultsContainer />
            </QuizResultsProvider>
        </div>
    );
};

export default QuizResultsPage;
