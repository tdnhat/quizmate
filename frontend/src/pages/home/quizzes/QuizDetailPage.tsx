import { getQuizBySlug } from "@/api/quiz";
import QuizDetailContainer from "@/features/quizzes/components/quiz-detail/QuizDetailContainer";
import QuizDetailSkeleton from "@/features/quizzes/components/quiz-detail/QuizDetailSkeleton";
import { TakeQuizProvider } from "@/features/quizzes/contexts/TakeQuizContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const QuizDetailPage = () => {
    const { quizSlug } = useParams();

    const {
        data: quiz,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["quiz", quizSlug],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            return getQuizBySlug(quizSlug);
        },
        enabled: !!quizSlug,
    });

    if (isLoading) {
        return <QuizDetailSkeleton />;
    }

    if (error) {
        return <div>Error fetching quiz</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <TakeQuizProvider quiz={quiz}>
                <QuizDetailContainer />
            </TakeQuizProvider>
        </div>
    );
};

export default QuizDetailPage;
