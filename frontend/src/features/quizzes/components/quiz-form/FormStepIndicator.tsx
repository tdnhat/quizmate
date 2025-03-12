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
            steps[index - 1]?.isCompleted || // Allow navigating to the next step if previous is completed
            index <= currentIndex // Allow navigating to previous steps
        );
    };

    // Get progress status for the connecting line between steps
    const getLineStatus = (index: number) => {
        if (index >= steps.length - 1) return ""; // No line after last step

        const currentIndex = steps.findIndex((step) => step.id === currentStep);

        if (index < currentIndex - 1) return "completed"; // Steps before current - 1
        if (index === currentIndex - 1) return "current"; // Step right before current
        return "upcoming"; // Steps after current
    };

    return (
        <nav aria-label="Progress" className="px-2">
            {/* Use a container div to set the overall layout */}
            <div className="relative w-full">
                {/* The actual steps list with proper spacing */}
                <ol className="flex items-center w-full">
                    {steps.map((step, index) => (
                        <li
                            key={step.id}
                            className={`
                                flex items-center mr-4
                                ${index === 0 ? "" : "flex-1"}
                            `}
                        >
                            {/* Connecting Line (before each step except the first) */}
                            {index > 0 && (
                                <div className="flex-grow mr-4">
                                    <div className="h-0.5 w-full relative">
                                        {/* Background line (gray) */}
                                        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

                                        {/* Progress line (colored) */}
                                        <div
                                            className={`
                                                absolute inset-0 rounded-full transition-all duration-500
                                                ${
                                                    getLineStatus(index - 1) === "completed"
                                                        ? "bg-cyan-600 w-full"
                                                        : getLineStatus(index - 1) === "current"
                                                            ? "bg-cyan-500 w-full"
                                                            : "bg-transparent w-0"
                                                }
                                            `}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Step Circle and Label */}
                            <div className="flex items-center">
                                {/* Step Circle */}
                                <div
                                    className={`
                                        flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full 
                                        border-2 transition-all duration-200 z-10
                                        ${
                                            currentStep === step.id
                                                ? "border-cyan-600 bg-cyan-50 shadow-md shadow-cyan-100"
                                                : step.isCompleted
                                                    ? "border-cyan-600 bg-cyan-600"
                                                    : "border-gray-300 bg-white"
                                        }
                                        ${
                                            canNavigateToStep(step.id, index)
                                                ? "cursor-pointer hover:shadow-md"
                                                : "cursor-not-allowed opacity-60"
                                        }
                                    `}
                                    onClick={() =>
                                        canNavigateToStep(step.id, index) &&
                                        goToStep(step.id as any)
                                    }
                                >
                                    {step.isCompleted ? (
                                        <CheckIcon
                                            className={`h-5 w-5 ${currentStep === step.id ? "text-cyan-600" : "text-white"}`}
                                        />
                                    ) : (
                                        <span
                                            className={`text-sm font-medium 
                                                ${
                                                    currentStep === step.id
                                                        ? "text-cyan-600"
                                                        : "text-gray-500"
                                                }
                                            `}
                                        >
                                            {index + 1}
                                        </span>
                                    )}
                                </div>

                                {/* Step Label */}
                                <span
                                    className={`
                                    ml-3 text-sm font-medium transition-colors
                                    ${
                                        currentStep === step.id
                                            ? "text-cyan-600 font-semibold"
                                            : step.isCompleted
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                    }
                                `}
                                >
                                    {step.label}
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};