import { useQuizResults } from "@/features/quizzes/hooks/useQuizResults";
import { formatTime } from "@/lib/utils";

const ResultStatistics = () => {
    const { quizResult } = useQuizResults();

    if (!quizResult) {
        return <div>No results available</div>;
    }

    console.log(quizResult);

    const {
        correctAnswersCount,
        incorrectAnswersCount,
        unansweredCount,
        timeTaken,
    } = quizResult;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="text-2xl font-bold">{correctAnswersCount}</div>
                <div className="text-sm text-gray-500">
                    Correct Answers
                </div>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="text-2xl font-bold">
                    {incorrectAnswersCount}
                </div>
                <div className="text-sm text-gray-500">
                    Incorrect Answers
                </div>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="text-2xl font-bold">{unansweredCount}</div>
                <div className="text-sm text-gray-500">Unanswered</div>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="text-2xl font-bold">
                    {formatTime(timeTaken)}
                </div>
                <div className="text-sm text-gray-500">Time Taken</div>
            </div>
        </div>
    );
};

export default ResultStatistics;
