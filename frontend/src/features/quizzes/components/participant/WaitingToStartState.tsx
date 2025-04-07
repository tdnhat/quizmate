import { QuizCard } from "./QuizCard";
import DotLoader from "@/components/shared/components/loaders/DotLoader";

interface WaitingToStartStateProps {
    quizTitle: string;
    score: number;
}

export const WaitingToStartState = ({
    quizTitle,
}: WaitingToStartStateProps) => {
    return (
        <QuizCard title={quizTitle}>
            <div className="text-center space-y-4">
                <DotLoader />
                <p>Waiting for the host to start the quiz...</p>
            </div>
        </QuizCard>
    );
};
