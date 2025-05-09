import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "@/api/quiz";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, ArrowRight, List } from "lucide-react";
import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";
import QuizCarousel from "@/features/quizzes/components/quiz-card/QuizCarousel";
import { Button } from "@/components/ui/button";

const QuizzesPage = () => {
    // Fetch all quizzes
    const {
        data: quizzes = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["quizzes"],
        queryFn: () => getQuizzes(),
    });

    // Fetch popular quizzes sorted by completion
    const {
        data: popularQuizzes = [],
    } = useQuery({
        queryKey: ["quizzes", "popular"],
        queryFn: () => getQuizzes({ 
            sortBy: "completions", 
            isDescending: true, 
            pageSize: 6,
            page: 1 
        }),
    });

    // Fetch recently added quizzes sorted by creation date
    const {
        data: recentQuizzes = [],
    } = useQuery({
        queryKey: ["quizzes", "recent"],
        queryFn: () => getQuizzes({ 
            sortBy: "createdAt", 
            isDescending: true, 
            pageSize: 6,
            page: 1 
        }),
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
            <h1 className="text-2xl font-bold text-cyan-600">Explore Quizzes</h1>
            <p className="text-gray-600 mb-6">
                Discover a wide range of quizzes on various topics.
            </p>

            {/* Popular Quizzes Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <TrendingUp size={24} className="text-red-500 mr-2" />
                        Popular Quizzes
                    </h2>
                </div>
                <QuizCarousel quizzes={popularQuizzes} />
            </section>

            {/* Recently Added Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <Clock size={24} className="text-blue-500 mr-2" />
                        Recently Added
                    </h2>
                </div>
                <QuizCarousel quizzes={recentQuizzes} />
            </section>

            {/* All Quizzes Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center text-cyan-600 gap-2">
                        <List size={24} className="text-green-500 mr-2" />
                        Browse All Quizzes
                    </h2>
                    <Link
                        to="/quizzes/all"
                        className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-800 font-medium"
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

                {/* Browse All button */}
                <Link
                    to="/quizzes/all"
                    className="flex items-center justify-center gap-2 mt-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full md:w-auto cursor-pointer"
                    >
                        View all
                    </Button>
                </Link>
            </section>
        </div>
    );
};

export default QuizzesPage;
