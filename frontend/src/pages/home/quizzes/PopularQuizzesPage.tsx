import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "@/api/quiz";
import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";

const PopularQuizzesPage = () => {
    const { data: quizzes = [], isLoading } = useQuery({
        queryKey: ["quizzes"],
        queryFn: () =>
            getQuizzes({
                page: 1,
                pageSize: 10,
                isDescending: true,
                sortBy: "completions",
            }),
    });

    return (
        <div className="container mx-auto p-4">
            <QuizzesBreadcrumb currentPage="popular" />
            <h1 className="text-2xl font-bold mb-6">Popular Quizzes</h1>
            <QuizGrid quizzes={quizzes} isLoading={isLoading} />
        </div>
    );
};

export default PopularQuizzesPage;
