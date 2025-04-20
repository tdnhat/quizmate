import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { QuestionOptions } from "./QuestionOptions";

interface Question {
    text: string;
    imageUrl?: string;
    options: { id: string; text: string }[];
    timeLimit?: number;
}

interface Feedback {
    isCorrect?: boolean;
    timedOut?: boolean;
    points?: number;
    basePoints?: number;
    timeBonus?: number;
    timeTaken?: number;
}

interface BetweenQuestionsStateProps {
    quizTitle: string;
    score: number;
    currentQuestion?: Question | null;
    selectedOption?: string | null;
    feedback?: Feedback | null;
}

export const BetweenQuestionsState = ({
    quizTitle,
    score,
    currentQuestion,
    selectedOption,
    feedback,
}: BetweenQuestionsStateProps) => {
    if (!feedback) {
        return (
            <QuizCard
                title={quizTitle}
                headerChildren={<ScoreBadge score={score} />}
            >
                <div className="text-center">
                    <p className="text-lg font-medium mb-2">
                        Get ready for the next question
                    </p>
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                </div>
            </QuizCard>
        );
    }

    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
        >
            <div className="space-y-6">

                {currentQuestion && feedback && (
                    <div className="space-y-6 p-4 rounded-lg">
                        <div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {feedback.isCorrect ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <h3 className="text-xl font-medium">
                                    {currentQuestion.text}
                                </h3>
                            </div>
                            {currentQuestion.imageUrl && (
                                <img
                                    className="max-w-full h-auto rounded-md object-contain mx-auto my-4"
                                    src={currentQuestion.imageUrl}
                                    alt={quizTitle}
                                />
                            )}
                        </div>

                        <QuestionOptions
                            options={currentQuestion.options}
                            selectedOption={selectedOption || undefined}
                            showFeedback={true}
                            isCorrect={!!feedback.isCorrect}
                            onSelectOption={() => {}}
                        />

                        <FeedbackDisplay
                            feedback={feedback}
                            selectedOption={selectedOption || undefined}
                        />
                    </div>
                )}

                {feedback && !currentQuestion && (
                    <FeedbackDisplay
                        feedback={feedback}
                        selectedOption={selectedOption || undefined}
                    />
                )}
            </div>
        </QuizCard>
    );
};
