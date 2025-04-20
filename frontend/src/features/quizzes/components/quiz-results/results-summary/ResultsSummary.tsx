import { Button } from "@/components/ui/button";
import ResultStatistics from "./ResultsStatistics";
import { useQuizResults } from "@/features/quizzes/hooks/useQuizResults";
import { Link } from "react-router-dom";

const ResultsSummary = () => {
    const { quizResult } = useQuizResults();

    if (!quizResult) {
        return <div>No results available</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center gap-4">
                {/* Score */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-5xl font-bold text-cyan-700">
                        {quizResult.score}{" "}
                        <span className="text-xl font-semibold text-gray-500">
                            / {quizResult.maxScore}
                        </span>
                    </span>
                </div>

                {/* Result Statistics */}
                <ResultStatistics />

                <span>Keep up the good work!</span>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <Link to="/quizzes">
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-52 cursor-pointer transition-all duration-300"
                        >
                            Explore More Quizzes
                        </Button>
                    </Link>
                    <Link to="/home">
                        <Button
                            size="lg"
                            className="w-52 cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultsSummary;
