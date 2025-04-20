import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";
import { QuestionOptions } from "./QuestionOptions";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
import { SmoothProgress } from "@/components/ui/smooth-progress";

interface Question {
    text: string;
    imageUrl?: string;
    options: { id: string; text: string }[];
    timeLimit?: number;
}

interface ActiveQuestionStateProps {
    quizTitle: string;
    score: number;
    currentQuestion: Question | null;
    selectedOption?: string | null;
    hasSubmitted: boolean;
    timeRemaining: number;
    onSelectOption: (optionId: string) => void;
    onSubmitAnswer: () => void;
}

export const ActiveQuestionState = ({
    quizTitle,
    score,
    currentQuestion,
    selectedOption,
    hasSubmitted,
    timeRemaining,
    onSelectOption,
    onSubmitAnswer,
}: ActiveQuestionStateProps) => {
    if (!currentQuestion) {
        return (
            <QuizCard
                title={quizTitle}
                headerChildren={<ScoreBadge score={score} />}
            >
                <div className="text-center space-y-4">
                    <DotLoader />
                    <p>Waiting for a question to be displayed...</p>
                </div>
            </QuizCard>
        );
    }

    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
            footerChildren={
                <Button
                    className="w-full text-md py-6 bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                    disabled={!selectedOption || hasSubmitted}
                    onClick={onSubmitAnswer}
                >
                    Submit Answer
                </Button>
            }
        >
            <div>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <Clock
                            className={cn(
                                "h-4 w-4",
                                timeRemaining <= 5
                                    ? "text-red-600 animate-pulse"
                                    : timeRemaining <= 10
                                      ? "text-yellow-600"
                                      : "text-gray-600"
                            )}
                        />
                        <span
                            className={cn(
                                timeRemaining <= 5
                                    ? "text-red-600 font-bold"
                                    : timeRemaining <= 10
                                      ? "text-yellow-600 font-semibold"
                                      : "text-gray-600"
                            )}
                        >
                            {timeRemaining}s
                        </span>
                    </div>
                </div>
                <SmoothProgress
                    value={
                        (timeRemaining / (currentQuestion?.timeLimit || 1)) *
                        100
                    }
                    colorMode="timer"
                    height="6px"
                    transitionSpeed={100}
                    className={cn(
                        timeRemaining <= 5
                            ? "bg-red-200"
                            : timeRemaining <= 10
                              ? "bg-yellow-200"
                              : undefined
                    )}
                />

                <div className="space-y-6 mt-4">
                    <div>
                        <h3 className="text-xl font-medium mb-4">
                            {currentQuestion.text}
                        </h3>
                        {currentQuestion.imageUrl && (
                            <div className="my-4 flex justify-center">
                                <img
                                    src={currentQuestion.imageUrl}
                                    alt={quizTitle}
                                    className="max-w-full h-auto rounded-md object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <QuestionOptions
                        options={currentQuestion.options}
                        selectedOption={selectedOption || undefined}
                        disabled={hasSubmitted}
                        onSelectOption={onSelectOption}
                    />
                </div>
            </div>
        </QuizCard>
    );
};
