import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MultiStepQuizForm } from "@/features/quizzes/components/quiz-form/MultiStepQuizForm";
import { QuizFormProvider } from "@/features/quizzes/contexts/QuizFormContext";

const CreateQuizPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get state from navigation and store it
    const initialState = {
        initialValues: location.state?.initialValues,
        isFromModal: !!location.state?.isFromModal,
    };

    // Effect to clear navigation state after reading it
    useEffect(() => {
        // This prevents the state persisting in the browser history
        if (location.state?.isFromModal) {
            // Replace current history entry to remove state
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="container mx-auto max-w-6xl py-8">
            <h1 className="text-2xl font-bold mb-6">Create a New Quiz</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <QuizFormProvider initialValues={initialState.initialValues}>
                    <MultiStepQuizForm />
                </QuizFormProvider>
            </div>
        </div>
    );
};

export default CreateQuizPage;
