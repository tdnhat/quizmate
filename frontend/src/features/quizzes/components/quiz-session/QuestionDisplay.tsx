import { Button } from "@/components/ui/button";
import { QuestionData } from "@/services/signalr/hubs/quizSessionHub";
import { ChevronRight, Play } from "lucide-react";
import SessionSummarize from "./SessionSummarize";
import { Participant } from "../../types/session";
import { useState } from "react";
import AutoTransitionTimer from "./AutoTransitionTimer";
import BetweenQuestionsState from "./BetweenQuestionsState";

interface QuestionDisplayProps {
    currentQuestion: QuestionData | null;
    onNextQuestion: () => Promise<void>;
    onEndSession: () => Promise<void>;
    isLoading: boolean;
    questionNumber: number;
    totalQuestions: number;
    participants?: Participant[];
    autoTransitionDuration?: number;
    betweenQuestionsDuration?: number;
}

const QuestionDisplay = ({
    currentQuestion,
    onNextQuestion,
    onEndSession,
    isLoading,
    questionNumber,
    totalQuestions,
    participants = [],
    autoTransitionDuration = 30, // Default to 30 seconds
    betweenQuestionsDuration = 5, // Default to 5 seconds
}: QuestionDisplayProps) => {
    const isLastQuestion = questionNumber === totalQuestions - 1;
    const [showingBetweenState, setShowingBetweenState] = useState(false);

    // Handle proceeding to the next question
    const handleNextQuestion = async () => {
        await onNextQuestion();
    };

    // This is called after the between-questions countdown finishes
    const handleBetweenStateComplete = () => {
        setShowingBetweenState(true);
    };

    // If we're showing the between questions state
    if (showingBetweenState) {
        return (
            <BetweenQuestionsState
                onNextQuestion={handleNextQuestion}
                currentQuestionNumber={questionNumber}
                totalQuestions={totalQuestions}
                countdownSeconds={betweenQuestionsDuration}
            />
        );
    }

    if (!currentQuestion) {
        return (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center min-h-[400px] space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-3">Ready to Begin</h2>
                    <p className="text-gray-500 mb-6">
                        Click the button below to start the quiz session and
                        reveal the first question.
                    </p>
                </div>
                <Button
                    size="lg"
                    onClick={onNextQuestion}
                    disabled={isLoading}
                    className="text-md py-6 bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                >
                    <Play className="mr-2 h-5 w-5" />
                    Start First Question
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Question {questionNumber + 1} of {totalQuestions}
                </span>
            </div>

            {/* Auto transition timer */}
            <AutoTransitionTimer
                defaultDuration={autoTransitionDuration}
                onTimeEnd={handleBetweenStateComplete}
                isLastQuestion={isLastQuestion}
            />

            <h2 className="text-xl font-bold">{currentQuestion.text}</h2>

            {currentQuestion.imageUrl && (
                <div className="my-4 flex justify-center">
                    <img
                        src={currentQuestion.imageUrl}
                        alt="Question"
                        className="max-w-full rounded-lg max-h-[300px] object-contain"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {currentQuestion.answers.map((answer) => (
                    <div
                        key={answer.id}
                        className="p-4 border rounded-lg hover:border-cyan-500 hover:shadow-sm transition-all"
                    >
                        {answer.text}
                    </div>
                ))}
            </div>

            <div className="flex justify-center md:justify-end items-center space-x-3 mt-6">
                {isLastQuestion ? (
                    <SessionSummarize
                        participants={participants}
                        onEndSession={onEndSession}
                        isLoading={isLoading}
                    />
                ) : (
                    <Button
                        onClick={handleBetweenStateComplete}
                        disabled={isLoading}
                        className="bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                    >
                        Next Question <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QuestionDisplay;
