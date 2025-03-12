import { useCategories } from "@/features/categories/hooks/useCategories";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizFormValues } from "@/features/quizzes/schemas/quizFormSchema";
import { MultiStepQuizForm } from "@/features/quizzes/components/quiz-form/MultiStepQuizForm";

const CreateQuizPage = () => {
    const { categories } = useCategories();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Get state from navigation
    const stateFromModal = location.state?.isFromModal
        ? {
              initialValues: location.state?.initialValues,
              isFromModal: true,
          }
        : null;

    // Use state with local state to keep it and clear it when needed
    const [formState, setFormState] = useState(stateFromModal);

    // Effect to clear navigation state after reading it
    useEffect(() => {
        // This prevents the state persisting in the browser history
        if (location.state?.isFromModal) {
            // Replace current history entry to remove state
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleSubmit = async (values: QuizFormValues) => {
        try {
            setIsLoading(true);
            console.log("Creating quiz with:", values);

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
                <MultiStepQuizForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default CreateQuizPage;
