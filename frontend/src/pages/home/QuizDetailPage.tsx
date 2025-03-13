import QuizDetailContainer from "@/features/quizzes/components/quiz-detail/QuizDetailContainer";
import { useQuizzes } from "@/features/quizzes/hooks/useQuizzes";
import { useParams } from "react-router-dom";

const QuizDetailPage = () => {
    const { quizId } = useParams();
    const { quizzes} = useQuizzes();

    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <QuizDetailContainer quiz={quiz} />
        </div>
    )
}

export default QuizDetailPage;