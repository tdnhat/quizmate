import TakeQuizContainer from "@/features/quizzes/components/take-quiz/TakeQuizContainer";
import { TakeQuizProvider } from "@/features/quizzes/contexts/TakeQuizContext";
import { useQuizzes } from "@/features/quizzes/hooks/useQuizzes";
import { useParams } from "react-router-dom";

const TakeQuizPage = () => {
    const { quizId } = useParams();
    const { quizzes } = useQuizzes();

    const quiz = quizzes.find((quiz) => quiz.id === quizId);

    if (!quiz) {
        return null;
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <TakeQuizProvider quiz={quiz}>
                <TakeQuizContainer />
            </TakeQuizProvider>
        </div>
    );
};

export default TakeQuizPage;
