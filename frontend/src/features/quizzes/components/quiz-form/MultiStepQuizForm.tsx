import { Category } from "@/types/category";
import { FormStepIndicator } from "./FormStepIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { BasicDetailsStep } from "./BasicDetailsStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MultiStepQuizFormProps {
    categories: Category[];
}

export const MultiStepQuizForm = ({ categories }: MultiStepQuizFormProps) => {
    const { currentStep, formValues, goToStep } = useQuizForm();
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    const isFromModal = !!location.state?.isFromModal;

    useEffect(() => {
        if (isFromModal) {
            goToStep("questions");
        }
    }, [isFromModal, goToStep]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            console.log("Form values:", formValues);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Failed to create quiz:", error);
        } finally {
            setIsLoading(false);
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
