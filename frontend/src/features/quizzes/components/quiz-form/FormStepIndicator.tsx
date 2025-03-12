import { CheckIcon } from "lucide-react";
import { useQuizForm } from "../../hooks/useQuizForm";

export const FormStepIndicator = () => {
    const { currentStep, goToStep, formValues, questions } = useQuizForm();

    const steps = [
        {
            id: "basic-details",
            label: "Basic Details",
            isCompleted: !!formValues.title,
        },
        {
            id: "questions",
            label: "Questions",
            isCompleted: questions.length > 0,
        },
        { id: "review", label: "Review", isCompleted: false },
    ];

    const canNavigateToStep = (stepId: string, index: number) => {
        const currentIndex = steps.findIndex((step) => step.id === currentStep);
        return (
            stepId === currentStep || // Allow navigating to the current step
            steps[index - 1]?.isCompleted || // Allow navigating to the previous step if it's completed
            index <= currentIndex // Allow navigating to the next step
        );
    };

    return (
        <nav aria-label="Progress">
            <ol className="flex items-center justify-between w-full">
                {steps.map((step, index) => (
                    <li key={step.id} className="relative flex items-center">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 
                                ${
                                    currentStep === step.id
                                        ? "border-cyan-600 bg-cyan-50"
                                        : step.isCompleted
                                            ? "border-cyan-600 bg-cyan-600"
                                            : "border-gray-300"
                                }
                                ${canNavigateToStep(step.id, index) ? "cursor-pointer hover:bg-gray-50" : "cursor-not-allowed"}`}
                            onClick={() =>
                                canNavigateToStep(step.id, index) &&
                                goToStep(step.id as any)
                            }
                        >
                            {step.isCompleted ? (
                                <CheckIcon className="h-4 w-4 text-white" />
                            ) : (
                                <span
                                    className={`text-sm font-medium ${currentStep === step.id ? "text-cyan-600" : "text-gray-500"}`}
                                >
                                    {index + 1}
                                </span>
                            )}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                            {step.label}
                        </span>

                        {index < steps.length - 1 && (
                            <div
                                className="absolute top-4 right-0 hidden h-px w-full md:block bg-gray-200"
                                style={{
                                    left: "calc(50% + 1rem)",
                                    right: "calc(-50% + 1rem)",
                                }}
                            />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
