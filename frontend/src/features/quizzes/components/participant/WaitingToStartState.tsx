import { Loader2 } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { ScoreBadge } from "./ScoreBadge";

interface WaitingToStartStateProps {
    quizTitle: string;
    score: number;
}

export const WaitingToStartState = ({ quizTitle, score }: WaitingToStartStateProps) => {
    return (
        <QuizCard
            title={quizTitle}
            headerChildren={<ScoreBadge score={score} />}
        >
            <div className="text-center space-y-4">
                <p>Waiting for the host to start the quiz...</p>
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
        </QuizCard>
    );
};
