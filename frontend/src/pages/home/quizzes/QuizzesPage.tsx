import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "@/api/quiz";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Grid2X2, ArrowRight } from "lucide-react";
import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";

const QuizzesPage = () => {
    const {
        data: quizzes = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["quizzes"],
        queryFn: () => getQuizzes(),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto max-w-6xl p-4">
            <QuizzesBreadcrumb />
            <h1 className="text-2xl font-bold">Explore Quizzes</h1>
            <p className="text-gray-600 mb-6">
                Discover a wide range of quizzes on various topics.
            </p>

            {/* Popular Quizzes Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp size={24} className="text-red-500 mr-2" />
                        Popular Quizzes
                    </h2>
                </div>
                <QuizGrid
                    quizzes={quizzes.slice(0, 4)}
                    isLoading={isLoading}
                    showFilters={false}
                    showSearch={false}
                    showSort={false}
                    showViewToggle={false}
                />
            </section>

            {/* Recently Added Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock size={24} className="text-blue-500 mr-2" />
                        Recently Added
                    </h2>
                </div>
                <QuizGrid
                    quizzes={quizzes.slice(0, 4)}
                    isLoading={isLoading}
                    showFilters={false}
                    showSearch={false}
                    showSort={false}
                    showViewToggle={false}
                />
            </section>

            {/* All Quizzes Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Grid2X2 size={24} className="text-green-500 mr-2" />
                        Browse All Quizzes
                    </h2>
                    <Link
                        to="/quizzes/all"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        <span>View all</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
                <QuizGrid
                    quizzes={quizzes}
                    isLoading={isLoading}
                    showFilters={false}
                    showSearch={false}
                    showSort={false}
                    showViewToggle={false}
                />
            </section>
        </div>
    );
};

export default QuizzesPage;
