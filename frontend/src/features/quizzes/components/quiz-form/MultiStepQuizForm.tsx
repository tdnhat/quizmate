import { Category } from "@/types/category";
import {
    QuestionFormValues,
    QuizFormValues,
} from "../../schemas/quizFormSchema";
import { FormStepIndicator } from "./FormStepIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { BasicDetailsStep } from "./BasicDetailsStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MultiStepQuizFormProps {
    categories: Category[];
    onSubmit: (
        values: QuizFormValues,
        questions: QuestionFormValues[]
    ) => Promise<void>;
    isLoading: boolean;
}

export const MultiStepQuizForm = ({
    categories,
    onSubmit,
    isLoading,
}: MultiStepQuizFormProps) => {
    const { currentStep, formValues, questions, goToStep } =
        useQuizForm();

        const location = useLocation();

        const isFromModal = !!location.state?.isFromModal;

    useEffect(() => {
        if (isFromModal) {
            goToStep("questions");
        }
    }, [isFromModal, goToStep]);

    const handleSubmit = async () => {
        if (formValues.title) {
            return await onSubmit(formValues as QuizFormValues, questions);
        }
    };

    return (
        <div className="space-y-6">
            <FormStepIndicator />

            <div className="py-4">
                {currentStep === "basic-details" && (
                    <BasicDetailsStep categories={categories} />
                )}

                {currentStep === "questions" && <QuestionsStep />}

                {currentStep === "review" && (
                    <ReviewStep onSubmit={handleSubmit} isLoading={isLoading} />
                )}
            </div>
        </div>
    );
};
