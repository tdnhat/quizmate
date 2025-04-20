import { cn } from "@/lib/utils";

interface AnswerFeedback {
    isCorrect?: boolean;
    timedOut?: boolean;
    points?: number;
    basePoints?: number;
    timeBonus?: number;
    timeTaken?: number;
}

interface FeedbackDisplayProps {
    feedback: AnswerFeedback;
    selectedOption?: string;
}

export const FeedbackDisplay = ({ feedback, selectedOption }: FeedbackDisplayProps) => {
    return (
        <div
            className={cn(
                "p-4 rounded-md text-center font-medium",
                feedback.timedOut
                    ? "bg-amber-100 text-amber-800"
                    : feedback.isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
            )}
        >
            <p className="text-lg font-bold">
                {feedback.timedOut
                    ? "Time's Up!"
                    : feedback.isCorrect
                        ? "Correct!"
                        : "Incorrect"}
            </p>

            {feedback.timedOut && !selectedOption ? (
                <p>You didn't select an answer in time.</p>
            ) : (
                <>
                    <p>You earned {feedback.points || 0} points</p>
                    {feedback.isCorrect && feedback.timeBonus && feedback.timeBonus > 0 && (
                        <p className="text-sm mt-1">
                            (Base: {feedback.basePoints} + Time Bonus: {feedback.timeBonus})
                        </p>
                    )}
                </>
            )}

            {feedback.timeTaken !== undefined && !feedback.timedOut && (
                <p className="text-sm mt-1">
                    Answered in {feedback.timeTaken.toFixed(1)} seconds
                </p>
            )}
        </div>
    );
}; 