import { FormStepIndicator } from "./FormStepIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { BasicDetailsStep } from "./BasicDetailsStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { QuizFormValues, QuestionFormValues } from "../../schemas/quizFormSchema";

interface GeneratedQuestion {
    text: string;
    imageUrl?: string;
    explanation?: string;
    answers: Array<{
        text: string;
        isCorrect: boolean;
    }>;
}

interface GeneratedQuiz {
    title: string;
    description: string;
    categoryId: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    timeMinutes?: number;
    tags?: string[];
    questions: GeneratedQuestion[];
}

export const MultiStepQuizForm = () => {
    const {
        currentStep,
        goToStep,
        submitQuiz,
        isSubmitting,
        submissionError,
        refetchQuizzes,
        setFormValues,
    } = useQuizForm();
    
    const location = useLocation();
    const navigate = useNavigate();
    const quizProcessedRef = useRef(false);
    
    const isFromModal = !!location.state?.isFromModal;
    const generatedQuiz = location.state?.generatedQuiz as GeneratedQuiz | undefined;

    // Handle navigation from modal or auto-fill generated quiz
    useEffect(() => {
        if (generatedQuiz && !quizProcessedRef.current) {
            // Mark as processed to prevent duplicate toast
            quizProcessedRef.current = true;
            
            // Map the generated quiz data to our form structure
            const formattedQuiz: Partial<QuizFormValues> = {
                title: generatedQuiz.title,
                description: generatedQuiz.description,
                categoryId: generatedQuiz.categoryId,
                difficulty: generatedQuiz.difficulty,
                timeMinutes: generatedQuiz.timeMinutes || 10,
                tags: generatedQuiz.tags || [],
                passingScore: 60,
                isPublic: true,
                questions: generatedQuiz.questions.map((q): QuestionFormValues => ({
                    text: q.text,
                    questionType: "SingleChoice",
                    points: 10,
                    imageUrl: q.imageUrl || '',
                    explanation: q.explanation || '',
                    answers: q.answers.map((a) => ({
                        text: a.text,
                        isCorrect: a.isCorrect,
                        explanation: '',
                    })),
                })),
            };
            
            // Set form values with the generated quiz data
            setFormValues(formattedQuiz);
            
            // Navigate to questions step
            goToStep("questions");
            
            // Show success toast only once
            toast.success("Quiz generated successfully! You can now review and edit the questions.");
        } else if (isFromModal) {
            goToStep("questions");
        }
    }, [isFromModal, generatedQuiz, goToStep, setFormValues]);

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
