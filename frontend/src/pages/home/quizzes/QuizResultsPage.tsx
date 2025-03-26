import QuizResultsContainer from "@/features/quizzes/components/quiz-results/QuizResultsContainer";
import { QuizResultsProvider } from "@/features/quizzes/contexts/QuizResultsContext";
import { useParams } from "react-router-dom";

const QuizResultsPage = () => {
    const { resultId } = useParams<{ resultId: string }>();

    if (!resultId) {
        return <div>Result not found</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <QuizResultsProvider resultId={resultId}>
                <QuizResultsContainer />
            </QuizResultsProvider>
        </div>
    );
};

export default QuizResultsPage;
