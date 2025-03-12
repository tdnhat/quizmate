import { Category } from "@/types/category";
import { QuizFormValues } from "../../schemas/quizFormSchema";
import { FormStepIndicator } from "./FormStepIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { BasicDetailsStep } from "./BasicDetailsStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";

interface MultiStepQuizFormProps {
    categories: Category[];
    onSubmit: (values: QuizFormValues, questions: any[]) => Promise<void>;
    isLoading: boolean;
}

export const MultiStepQuizForm = ({
    categories,
    onSubmit,
    isLoading,
}: MultiStepQuizFormProps) => {
    const { currentStep, formValues, questions } = useQuizForm();

    const handleSubmit = async () => {
        if (formValues.title) {
            return await onSubmit(formValues as QuizFormValues, questions);
        }
    };

    return (
        <div className="space-y-6">
            <FormStepIndicator />
            
            <div className="py-4">
                {currentStep === 'basic-details' && (
                    <BasicDetailsStep categories={categories} />
                )}
                
                {currentStep === 'questions' && (
                    <QuestionsStep />
                )}
                
                {currentStep === 'review' && (
                    <ReviewStep 
                        onSubmit={handleSubmit} 
                        isLoading={isLoading} 
                    />
                )}
            </div>
        </div>
    );
};
