import { useParams } from "react-router-dom";
import { useQuizResults } from "../../hooks/useQuizResults";
import { useEffect } from "react";
import ResultsSummary from "./results-summary/ResultsSummary";
import QuestionReview from "./question-review/QuestionReview";
import Loader from "@/components/shared/components/Loader";

const QuizResultsContainer = () => {
    const { quizId } = useParams();
    const { quizResult, isLoading, error, fetchQuizResult } = useQuizResults();

    useEffect(() => {
        if (quizId) {
            fetchQuizResult(quizId);
        }
    }, [quizId, fetchQuizResult]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p>{error}</p>
                <button
                    onClick={() => quizId && fetchQuizResult(quizId)}
                    className="mt-2 text-sm text-red-700 underline"
                >
                    Retry
                </button>
            </div>
        );
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
            <ResultsSummary result={quizResult} />

            {/* Question Review Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Question Review</h2>
                <QuestionReview result={quizResult} />
            </div>
        </div>
    );
};

export default QuizResultsContainer;
