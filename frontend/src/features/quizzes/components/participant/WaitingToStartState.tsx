import { Participant } from "../../types/session";
import { ParticipantList } from "../quiz-session";
import { QuizCard } from "./QuizCard";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
interface WaitingToStartStateProps {
    quizTitle: string;
    participants: Participant[];
    hostId?: string;
}

export const WaitingToStartState = ({
    quizTitle,
    participants,
    hostId,
}: WaitingToStartStateProps) => {
    return (
        <QuizCard title={quizTitle}>
            <div className="text-center space-y-4">
                <DotLoader />
                <p>Waiting for the host to start the quiz...</p>
            </div>
            <div className="mt-4">
                <ParticipantList
                    participants={participants}
                    showScores={true}
                    isSearchable={true}
                    hostId={hostId}
                />
            </div>
        </QuizCard>
    );
};
