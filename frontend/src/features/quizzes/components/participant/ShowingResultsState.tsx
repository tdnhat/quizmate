import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";

interface ShowingResultsStateProps {
    quizTitle: string;
    score: number;
}

export const ShowingResultsState = ({
    quizTitle,
    score,
}: ShowingResultsStateProps) => {
    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
        >
            <div className="text-center space-y-4">
                <p>Results are being displayed</p>
                <p className="text-sm text-muted-foreground">
                    Wait for the host to continue to the next
                    question or end the quiz
                </p>
            </div>
        </QuizCard>
    );
}; 