import { useQuizResults } from "../../hooks/useQuizResults";
import ResultsSummary from "./results-summary/ResultsSummary";
import QuestionReview from "./question-review/QuestionReview";
import Loader from "@/components/shared/components/Loader";

const QuizResultsContainer = () => {
    const { quizResult, isLoading } = useQuizResults();

    if (isLoading) {
        return <Loader />;
    }

    if (!quizResult) {
        return <div>No results available</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <h1 className="text-2xl font-bold">Quiz Results</h1>
                <p className="text-gray-500">{quizResult.quiz.title}</p>
            </div>

            {/* Score Summary Section */}
            <ResultsSummary />

            {/* Question Review Section */}
            <QuestionReview />

        </div>
    );
};

export default QuizResultsContainer;
