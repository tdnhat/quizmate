import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "@/api/quiz";
import QuizGrid from "@/features/quizzes/components/quiz-card/QuizGrid";
import QuizzesBreadcrumb from "@/features/quizzes/components/quizzes/QuizzesBreadcrumb";

const RecentlyAddedQuizzesPage = () => {
    const { data: quizzes = [], isLoading } = useQuery({
        queryKey: ["quizzes"],
        queryFn: () =>
            getQuizzes({
                page: 1,
                pageSize: 10,
                isDescending: true,
                sortBy: "createdAt",
            }),
    });

    return (
        <div className="container mx-auto py-8 px-4 md:px-8">
            <QuizzesBreadcrumb currentPage="recent" />
            <h1 className="text-2xl font-bold mb-6">Recently Added Quizzes</h1>
            <QuizGrid quizzes={quizzes} isLoading={isLoading} />
        </div>
    );
};

export default RecentlyAddedQuizzesPage;
