import { createContext, ReactNode, useEffect, useState } from "react";
import { QuestionFormValues, QuizFormValues } from "../schemas/quizFormSchema";
import { Quiz } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { submitCreateQuizForm } from "@/api/quiz";

type QuizFormStep = "basic-details" | "questions" | "review";

export type SubmitQuizPayload = Partial<QuizFormValues> & { isDraft: boolean };

export type SubmitQuizResponse = Quiz;

interface QuizFormContextType {
    formValues: Partial<QuizFormValues>;
    questions: QuestionFormValues[];
    currentStep: QuizFormStep;
    isLoading: boolean;
    isSubmitting: boolean;
    submissionError: string | null;
    submittedQuizId: string | null;
    setFormValues: (values: Partial<QuizFormValues>) => void;
    addQuestion: (question: QuestionFormValues) => void;
    updateQuestion: (index: number, question: QuestionFormValues) => void;
    removeQuestion: (index: number) => void;
    goToStep: (step: QuizFormStep) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    resetForm: () => void;
    submitQuiz: (isDraft: boolean) => Promise<SubmitQuizResponse | undefined>;
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
    const [isLoading, setIsLoading] = useState(false);
    const [submittedQuizId, setSubmittedQuizId] = useState<string | null>(null);

    const {
        mutateAsync,
        isPending: isSubmitting,
        error: submissionError,
        reset: resetMutation,
    } = useMutation<SubmitQuizResponse, Error, SubmitQuizPayload>({
        mutationFn: (payload: SubmitQuizPayload) => submitCreateQuizForm(payload),
        onSuccess: (data) => {
            console.log("Quiz submitted successfully:", data);
            setSubmittedQuizId(data.id);
        },
        onError: (error) => {
            console.error("Error submitting quiz:", error);
            setSubmittedQuizId(null);
        },
    });

    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            questions: questions,
        }));
    }, [questions]);

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
        setSubmittedQuizId(null);
        resetMutation();
    };

    const handleSetFormValues = (values: Partial<QuizFormValues>) => {
        setIsLoading(true);
        setFormValues((prev) => {
            const newValues = {
                ...prev,
                ...values,
            };

            if (values.questions) {
                setQuestions(values.questions);
            }

            return newValues;
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    const submitQuiz = async (
        isDraft: boolean
    ): Promise<SubmitQuizResponse | undefined> => {
        try {
            const payload: SubmitQuizPayload = {
                ...formValues,
                questions,
                isDraft,
            };
            
            const response = await mutateAsync(payload);
            return response;
        } catch (error) {
            console.error("Error submitting quiz:", error);
            return undefined;
        }
    };

    return (
        <QuizFormContext.Provider
            value={{
                formValues,
                questions,
                currentStep,
                isLoading,
                isSubmitting,
                submissionError: submissionError?.message || null,
                submittedQuizId,
                setFormValues: handleSetFormValues,
                addQuestion,
                updateQuestion,
                removeQuestion,
                goToStep,
                goToNextStep,
                goToPreviousStep,
                resetForm,
                submitQuiz,
            }}
        >
            {children}
        </QuizFormContext.Provider>
    );
};
