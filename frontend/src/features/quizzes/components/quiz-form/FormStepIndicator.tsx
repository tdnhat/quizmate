import { CheckIcon } from "lucide-react";
import { useQuizForm } from "../../hooks/useQuizForm";

type QuizFormStep = "basic-details" | "questions" | "review";

export const FormStepIndicator = () => {
    const { currentStep, goToStep, formValues, questions } = useQuizForm();

    const steps = [
        {
            id: "basic-details" as QuizFormStep,
            label: "Basic Details",
            isCompleted: !!formValues.title,
        },
        {
            id: "questions" as QuizFormStep,
            label: "Questions",
            isCompleted: questions.length > 0,
        },
        { id: "review" as QuizFormStep, label: "Review", isCompleted: false },
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
        <nav aria-label="Progress" className="px-2 py-4 md:py-6">
            {/* Use a container div to set the overall layout */}
            <div className="relative w-full">
                {/* The actual steps list with proper spacing */}
                <ol className="flex items-center w-full">
                    {steps.map((step, index) => (
                        <li
                            key={step.id}
                            className={`
                                flex items-center 
                                ${index === 0 ? "" : "flex-1"}
                            `}
                        >
                            {/* Connecting Line (before each step except the first) */}
                            {index > 0 && (
                                <div className="flex-grow mr-2 md:mr-4">
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
                            <div className="flex flex-col md:flex-row items-center">
                                {/* Step Circle */}
                                <div
                                    className={`
                                        flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-full 
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
                                        goToStep(step.id)
                                    }
                                >
                                    {step.isCompleted ? (
                                        <CheckIcon
                                            className={`h-4 w-4 md:h-5 md:w-5 ${currentStep === step.id ? "text-cyan-600" : "text-white"}`}
                                        />
                                    ) : (
                                        <span
                                            className={`text-xs md:text-sm font-medium 
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
                                    mt-1 md:mt-0 md:ml-3 text-xs md:text-sm font-medium transition-colors text-center md:text-left
                                    ${
                                        currentStep === step.id
                                            ? "text-cyan-600 font-semibold"
                                            : step.isCompleted
                                                ? "text-gray-900"
                                                : "text-gray-500"
                                    }
                                `}
                                >
                                    {/* Full label for screens > 400px */}
                                    <span className="hidden sm:inline">{step.label}</span>
                                    
                                    {/* Short label for screens < 400px */}
                                    <span className="sm:hidden">{
                                        index === 0 ? "Details" : 
                                        index === 1 ? "Quest" : 
                                        "Review"
                                    }</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};