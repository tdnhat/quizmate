import { useCategories } from "@/features/categories/hooks/useCategories";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    QuestionFormValues,
    QuizFormValues,
} from "@/features/quizzes/schemas/quizFormSchema";
import { MultiStepQuizForm } from "@/features/quizzes/components/quiz-form/MultiStepQuizForm";
import { QuizFormProvider } from "@/features/quizzes/contexts/QuizFormContext";

const CreateQuizPage = () => {
    const { categories } = useCategories();
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (
        values: QuizFormValues,
        questions: QuestionFormValues[]
    ) => {
        try {
            setIsLoading(true);

            const formValues = {
                ...values,
                questions: questions,
            };

            console.log("Form values:", formValues);

            // API call would go here
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Navigate to questions editor or quiz detail page
            // navigate(`/quizzes/${newQuizId}/edit`);
        } catch (error) {
            console.error("Failed to create quiz:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container max-w-3xl py-8">
            <h1 className="text-2xl font-bold mb-6">Create a New Quiz</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <QuizFormProvider initialValues={initialState.initialValues}>
                    <MultiStepQuizForm
                        categories={categories}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </QuizFormProvider>
            </div>
        </div>
    );
};

export default CreateQuizPage;
