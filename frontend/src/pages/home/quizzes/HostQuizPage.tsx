import HostQuizContainer from "@/features/quizzes/components/quiz-session/HostQuizContainer";
import { HostQuizProvider } from "@/features/quizzes/contexts/HostQuizContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HostQuizPage = () => {
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
            <HostQuizProvider quiz={quiz}>
                <HostQuizContainer />
            </HostQuizProvider>
        </div>
    );
};

export default HostQuizPage;