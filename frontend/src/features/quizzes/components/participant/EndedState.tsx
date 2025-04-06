import { CheckCircle } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";
import { FeedbackDisplay } from "./FeedbackDisplay";

interface Feedback {
    isCorrect?: boolean;
    timedOut?: boolean;
    points?: number;
    basePoints?: number;
    timeBonus?: number;
    timeTaken?: number;
}

interface EndedStateProps {
    quizTitle: string;
    score: number;
    feedback?: Feedback | null;
    selectedOption?: string | null;
}

export const EndedState = ({
    quizTitle,
    score,
    feedback,
    selectedOption,
}: EndedStateProps) => {
    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
        >
            <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                <p className="text-xl font-bold">Quiz Completed!</p>
                <p>Thank you for participating.</p>
                {feedback && (
                    <FeedbackDisplay 
                        feedback={feedback}
                        selectedOption={selectedOption || undefined}
                    />
                )}
            </div>
        </QuizCard>
    );
}; 