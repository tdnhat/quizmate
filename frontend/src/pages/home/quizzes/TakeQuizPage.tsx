import TakeQuizContainer from "@/features/quizzes/components/take-quiz/TakeQuizContainer";
import { TakeQuizProvider } from "@/features/quizzes/contexts/TakeQuizContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TakeQuizPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const quiz = location.state?.quiz;

    // If no quiz data is passed, redirect to quiz detail page
    useEffect(() => {
        if (!quiz) {
            navigate(-1);
        }
    }, [quiz, navigate]);

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
