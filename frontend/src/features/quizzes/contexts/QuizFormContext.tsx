import { createContext, ReactNode, useEffect, useState } from "react";
import { QuestionFormValues, QuizFormValues } from "../schemas/quizFormSchema";
import { Quiz } from "@/types/quiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitCreateQuizForm, uploadQuizThumbnail, uploadQuestionImage } from "@/api/quiz";

type QuizFormStep = "basic-details" | "questions" | "review";

export type SubmitQuizPayload = Partial<QuizFormValues> & { 
    isDraft: boolean;
    thumbnailUrl?: string;
};

export type SubmitQuizResponse = Quiz;

interface QuizFormContextType {
    formValues: Partial<QuizFormValues>;
    questions: QuestionFormValues[];
    currentStep: QuizFormStep;
    isLoading: boolean;
    isSubmitting: boolean;
    isUploadingThumbnail: boolean;
    isUploadingQuestionImage: boolean;
    uploadingQuestionIndex: number | null;
    submissionError: string | null;
    submittedQuizId: string | null;
    setFormValues: (values: Partial<QuizFormValues>) => void;
    loadGeneratedQuiz: (data: Partial<QuizFormValues>) => void;
    addQuestion: (question: QuestionFormValues) => void;
    updateQuestion: (index: number, question: QuestionFormValues) => void;
    removeQuestion: (index: number) => void;
    goToStep: (step: QuizFormStep) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    resetForm: () => void;
    refetchQuizzes: () => void;
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
    const queryClient = useQueryClient();
    const [formValues, setFormValues] = useState<Partial<QuizFormValues>>(
        initialValues || {}
    );
    const [questions, setQuestions] = useState<QuestionFormValues[]>(
        initialValues?.questions || []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
    const [isUploadingQuestionImage, setIsUploadingQuestionImage] = useState(false);
    const [uploadingQuestionIndex, setUploadingQuestionIndex] = useState<number | null>(null);
    const [submittedQuizId, setSubmittedQuizId] = useState<string | null>(null);

    const {
        mutateAsync,
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

    // Add a separate mutation for thumbnail upload
    const thumbnailMutation = useMutation({
        mutationFn: uploadQuizThumbnail,
        onSuccess: (data) => {
            console.log("Thumbnail uploaded successfully:", data);
        },
        onError: (error) => {
            console.error("Error uploading thumbnail:", error);
        },
    });

    // Add a separate mutation for question image upload
    const questionImageMutation = useMutation({
        mutationFn: uploadQuestionImage,
        onSuccess: (data) => {
            console.log("Question image uploaded successfully:", data);
        },
        onError: (error) => {
            console.error("Error uploading question image:", error);
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

    // Special method for loading a generated quiz with all fields pre-filled
    const loadGeneratedQuiz = (data: Partial<QuizFormValues>) => {
        setIsLoading(true);
        
        // Set all form values at once
        setFormValues(data);
        
        // Set questions array
        if (data.questions) {
            setQuestions(data.questions);
        }
        
        // Move to questions step automatically
        setCurrentStep("questions");
        
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    const submitQuiz = async (
        isDraft: boolean
    ): Promise<SubmitQuizResponse | undefined> => {
        try {
            setIsSubmitting(true);
            // Handle thumbnail upload if exists
            let thumbnailUrl = formValues.thumbnailUrl;
            if (formValues.thumbnailFile) {
                try {
                    setIsUploadingThumbnail(true);
                    const uploadResponse = await thumbnailMutation.mutateAsync(formValues.thumbnailFile);
                    thumbnailUrl = uploadResponse.thumbnailUrl;
                } catch (error) {
                    console.error("Error uploading thumbnail:", error);
                } finally {
                    setIsUploadingThumbnail(false);
                }
            }

            // Handle question image uploads
            const processedQuestions = [...questions];
            for (let i = 0; i < processedQuestions.length; i++) {
                const question = processedQuestions[i];
                if (question.imageFile) {
                    try {
                        setIsUploadingQuestionImage(true);
                        setUploadingQuestionIndex(i);
                        const uploadResponse = await questionImageMutation.mutateAsync(question.imageFile);
                        if (uploadResponse && uploadResponse.thumbnailUrl) {
                            processedQuestions[i] = {
                                ...question,
                                imageUrl: uploadResponse.thumbnailUrl,
                                imageFile: undefined
                            };
                        }
                    } catch (error) {
                        console.error(`Error uploading image for question ${i}:`, error);
                    }
                }
            }
            setIsUploadingQuestionImage(false);
            setUploadingQuestionIndex(null);

            // Update questions with the processed ones
            setQuestions(processedQuestions);

            const payload: SubmitQuizPayload = {
                ...formValues,
                thumbnailUrl,
                questions: processedQuestions,
                isDraft,
            };
            
            const response = await mutateAsync(payload);
            return response;
        } catch (error) {
            console.error("Error submitting quiz:", error);
            return undefined;
        } finally {
            setIsSubmitting(false);
        }
    };

    const refetchQuizzes = () => {
        queryClient.invalidateQueries({ queryKey: ["quizzes"] });
        queryClient.refetchQueries({ queryKey: ["quizzes"] });
    };

    return (
        <QuizFormContext.Provider
            value={{
                formValues,
                questions,
                currentStep,
                isLoading,
                isSubmitting,
                isUploadingThumbnail,
                isUploadingQuestionImage,
                uploadingQuestionIndex,
                submissionError: submissionError?.message || null,
                submittedQuizId,
                setFormValues: handleSetFormValues,
                loadGeneratedQuiz,
                addQuestion,
                updateQuestion,
                removeQuestion,
                goToStep,
                goToNextStep,
                goToPreviousStep,
                resetForm,
                refetchQuizzes,
                submitQuiz,
            }}
        >
            {children}
        </QuizFormContext.Provider>
    );
};
