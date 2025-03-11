import { useCategories } from "@/features/categories/hooks/useCategories";
import { CreateQuizFormValues } from "@/components/shared/schemas/CreateQuizFormSchema";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizBasicForm } from "@/features/quizzes/components/quiz-form/QuizBasicForm";

const CreateQuizPage = () => {
    const { categories } = useCategories();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const initialValues = location.state?.initialValues;

    const handleSubmit = async (values: CreateQuizFormValues) => {
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
                <QuizBasicForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={initialValues}
                    submitLabel="Create Quiz"
                />
            </div>
        </div>
    );
};

export default CreateQuizPage;
