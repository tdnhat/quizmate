import { createContext, ReactNode, useState } from "react";
import { QuestionFormValues, QuizFormValues } from "../schemas/quizFormSchema";

type QuizFormStep = "basic-details" | "questions" | "review";

interface QuizFormContextType {
    formValues: Partial<QuizFormValues>;
    questions: QuestionFormValues[];
    currentStep: QuizFormStep;
    setFormValues: (values: Partial<QuizFormValues>) => void;
    addQuestion: (question: QuestionFormValues) => void;
    updateQuestion: (index: number, question: QuestionFormValues) => void;
    removeQuestion: (index: number) => void;
    goToStep: (step: QuizFormStep) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    resetForm: () => void;
}

export const QuizFormContext = createContext<QuizFormContextType | undefined>(
    undefined
);

interface QuizFormProviderProps {
    children: ReactNode;
    initialValues?: Partial<QuizFormValues>;
}

export const QuizFormProvider = ({
    children,
    initialValues,
}: QuizFormProviderProps) => {
    const [formValues, setFormValues] = useState<Partial<QuizFormValues>>(
        initialValues || {}
    );
    const [questions, setQuestions] = useState<QuestionFormValues[]>([]);
    const [currentStep, setCurrentStep] =
        useState<QuizFormStep>("basic-details");

    const steps: QuizFormStep[] = ["basic-details", "questions", "review"];

    const goToStep = (step: QuizFormStep) => {
        setCurrentStep(step);
    };

    const goToNextStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const goToPreviousStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const addQuestion = (question: QuestionFormValues) => {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
    };

    const updateQuestion = (index: number, question: QuestionFormValues) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, i) => (i === index ? question : q))
        );
    };

    const removeQuestion = (index: number) => {
        setQuestions((prevQuestions) =>
            prevQuestions.filter((_, i) => i !== index)
        );
    };

    const resetForm = () => {
        setFormValues({});
        setQuestions([]);
        setCurrentStep("basic-details");
    };

    return (
        <QuizFormContext.Provider
            value={{
                formValues,
                questions,
                currentStep,
                setFormValues,
                addQuestion,
                updateQuestion,
                removeQuestion,
                goToStep,
                goToNextStep,
                goToPreviousStep,
                resetForm,
            }}
        >
            {children}
        </QuizFormContext.Provider>
    );
};
