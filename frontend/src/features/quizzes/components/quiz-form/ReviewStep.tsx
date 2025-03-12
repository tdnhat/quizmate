import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/shared/components/LoadingIndicator";
import { useQuizForm } from "../../hooks/useQuizForm";
import { ChevronLeftIcon } from "lucide-react";

interface ReviewStepProps {
    onSubmit: () => Promise<any>;
    isLoading: boolean;
}

export const ReviewStep = ({ onSubmit, isLoading }: ReviewStepProps) => {
    const { formValues, questions, goToPreviousStep } = useQuizForm();

    const handleSubmit = async () => {
        await onSubmit();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-medium mb-4">Review Your Quiz</h2>
                
                <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                    <div>
                        <h3 className="text-md font-medium mb-2">Basic Details</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Title</dt>
                                <dd className="mt-1 text-sm">{formValues.title}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Category</dt>
                                <dd className="mt-1 text-sm">{formValues.category}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Time Limit</dt>
                                <dd className="mt-1 text-sm">{formValues.timeMinutes} minutes</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                                <dd className="mt-1 text-sm">{formValues.difficulty}</dd>
                            </div>
                            {formValues.description && (
                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm">{formValues.description}</dd>
                                </div>
                            )}
                            {formValues.tags && formValues.tags.length > 0 && (
                                <div className="col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                                    <dd className="mt-1 flex flex-wrap gap-1">
                                        {formValues.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded-full text-xs bg-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                    
                    <div>
                        <h3 className="text-md font-medium mb-2">Questions ({questions.length})</h3>
                        <ul className="space-y-3">
                            {questions.map((question, index) => (
                                <li key={index} className="bg-white p-3 rounded border">
                                    <p className="font-medium">{index + 1}. {question.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {question.type} • {question.points} {question.points === 1 ? 'point' : 'points'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between pt-4">
                <Button 
                    type="button"
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="flex items-center"
                    disabled={isLoading}
                >
                    <ChevronLeftIcon className="mr-2 h-4 w-4" />
                    Back to Questions
                </Button>
                
                <Button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                >
                    {isLoading ? (
                        <>
                            <LoadingIndicator />
                            <span>Creating Quiz...</span>
                        </>
                    ) : (
                        "Create Quiz"
                    )}
                </Button>
            </div>
        </div>
    );
};