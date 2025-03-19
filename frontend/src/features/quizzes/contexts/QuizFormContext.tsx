import { createContext, ReactNode, useEffect, useState } from "react";
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
    const [questions, setQuestions] = useState<QuestionFormValues[]>(
        initialValues?.questions || []
    );

    // Sync questions with formValues whenever either changes
    useEffect(() => {
        // Update formValues when questions change
        setFormValues((prev) => ({
            ...prev,
            questions: questions,
        }));
    }, [questions]);

    // Update questions array when formValues.questions changes from outside
    useEffect(() => {
        if (formValues.questions) {
            setQuestions(formValues.questions);
        }
    }, [formValues.questions]);

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

    // Custom setFormValues that preserves questions state
    const handleSetFormValues = (values: Partial<QuizFormValues>) => {
        setFormValues((prev) => {
            const newValues = {
                ...prev,
                ...values,
            };
            
            // If new values include questions, update the questions state
            if (values.questions) {
                setQuestions(values.questions);
            }
            
            return newValues;
        });
    };

    return (
        <QuizFormContext.Provider
            value={{
                formValues,
                questions,
                currentStep,
                setFormValues: handleSetFormValues,
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
