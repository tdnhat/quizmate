import { FormStepIndicator } from "./FormStepIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { BasicDetailsStep } from "./BasicDetailsStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const MultiStepQuizForm = () => {
    const {
        currentStep,
        goToStep,
        submitQuiz,
        isSubmitting,
        submissionError,
        refetchQuizzes,
    } = useQuizForm();
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const isFromModal = !!location.state?.isFromModal;

    // Handle navigation from modal
    useEffect(() => {
        if (isFromModal) {
            goToStep("questions");
        }
    }, [isFromModal, goToStep]);

    // Handle submission errors
    useEffect(() => {
        if (submissionError) {
            console.error("Quiz submission failed:", submissionError);
            toast.error(`Failed to submit quiz: ${submissionError}`);
        }
    }, [submissionError]);

    // Handle form submission
    const handleSubmit = async (isDraft: boolean) => {
        try {
            const result = await submitQuiz(isDraft);
            
            if (result) {
                toast.success(
                    isDraft
                        ? "Quiz saved as draft successfully!"
                        : "Quiz published successfully!"
                );

                // Refetch the quizzes
                refetchQuizzes();
                
                // Navigate to the appropriate page after successful submission
                navigate("/quizzes");
            }
            
            return result;
        } catch (error) {
            // Error is already handled by the context and the effect above
            console.error("Error in handleSubmit:", error);
            return undefined;
        }
    };

    return (
        <div className="space-y-6">
            <FormStepIndicator />

            <div className="py-4">
                {currentStep === "basic-details" && <BasicDetailsStep />}
                {currentStep === "questions" && <QuestionsStep />}
                {currentStep === "review" && (
                    <ReviewStep
                        onSubmit={handleSubmit}
                        isLoading={isSubmitting}
                    />
                )}
            </div>
        </div>
    );
};
