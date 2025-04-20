import { submitQuizResults } from "@/api/quiz";
import { Question, Quiz, QuizResultPayload } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

type QuizAnswer = {
    questionId: string;
    selectedOptionId: string;
};

type SubmitQuizResponse = {
    id: string;
};

type QuizContextType = {
    quiz: Quiz;
    currentQuestionIndex: number;
    answers: QuizAnswer[];
    timeRemaining: number;
    quizCompleted: boolean;
    flaggedQuestions: string[];
    isSubmitting: boolean;
    navigateToQuestion: (index: number) => void;
    goToNextQuestion: () => void;
    goToPreviousQuestion: () => void;
    updateTimeRemaining: (seconds: number) => void;
    submitAnswer: (questionId: string, selectedOptionId: string) => void;
    submitQuiz: () => Promise<string>;
    isQuestionAnswered: (questionId: string) => boolean;
    getSelectedOptionId: (questionId: string) => string | undefined;
    getCurrentQuestion: () => Question | undefined;
    getAnsweredQuestionsCount: () => number;
    toggleQuestionFlag: (questionId: string) => void;
    isQuestionFlagged: (questionId: string) => boolean;
};

const TakeQuizContext = createContext<QuizContextType | undefined>(undefined);

interface TakeQuizProviderProps {
    children: ReactNode;
    quiz: Quiz;
}

export const TakeQuizProvider = ({ children, quiz }: TakeQuizProviderProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(
        quiz.timeMinutes * 60 || 0
    );
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);

    const { mutateAsync, isPending: isSubmitting } = useMutation<
        SubmitQuizResponse,
        Error,
        QuizResultPayload
    >({
        mutationFn: submitQuizResults,
        onSuccess: () => {
            setQuizCompleted(true);
        },
    });

    const navigateToQuestion = (index: number) => {
        if (index >= 0 && index < (quiz.questions?.length || 0)) {
            setCurrentQuestionIndex(index);
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < (quiz.questions?.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const updateTimeRemaining = (seconds: number) => {
        setTimeRemaining(seconds);
    };

    const submitAnswer = (questionId: string, selectedOptionId: string) => {
        const existingAnswerIndex = answers.findIndex(
            (a) => a.questionId === questionId
        );

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex] = {
                questionId,
                selectedOptionId,
            };
            setAnswers(updatedAnswers);
        } else {
            setAnswers([...answers, { questionId, selectedOptionId }]);
        }
    };

    const submitQuiz = async (): Promise<string> => {
            const response = await mutateAsync({
                quizId: quiz.id,
                timeTaken: quiz.timeMinutes * 60 - timeRemaining,
                resultAnswers: answers.map((a) => ({
                    questionId: a.questionId,
                    answerId: a.selectedOptionId,
            })),
        });
        console.log(response);
        return response.id;
    };

    const isQuestionAnswered = (questionId: string) => {
        return answers.some((a) => a.questionId === questionId);
    };

    const getSelectedOptionId = (questionId: string) => {
        const answer = answers.find((a) => a.questionId === questionId);
        return answer ? answer.selectedOptionId : undefined;
    };

    const getCurrentQuestion = () => {
        return quiz.questions?.[currentQuestionIndex];
    };

    const getAnsweredQuestionsCount = () => {
        return answers.length;
    };

    const toggleQuestionFlag = (questionId: string) => {
        if (flaggedQuestions.includes(questionId)) {
            setFlaggedQuestions(
                flaggedQuestions.filter((id) => id !== questionId)
            );
        } else {
            setFlaggedQuestions([...flaggedQuestions, questionId]);
        }
    };

    const isQuestionFlagged = (questionId: string) => {
        return flaggedQuestions.includes(questionId);
    };

    const value = {
        quiz,
        currentQuestionIndex,
        answers,
        timeRemaining,
        quizCompleted,
        flaggedQuestions,
        isSubmitting,
        navigateToQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
        updateTimeRemaining,
        submitAnswer,
        submitQuiz,
        isQuestionAnswered,
        getSelectedOptionId,
        getCurrentQuestion,
        getAnsweredQuestionsCount,
        toggleQuestionFlag,
        isQuestionFlagged,
    };

    return (
        <TakeQuizContext.Provider value={value}>
            {children}
        </TakeQuizContext.Provider>
    );
};

export default TakeQuizContext;
