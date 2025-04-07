import { useParams } from "react-router-dom";
import { useParticipateQuiz } from "@/features/quizzes/hooks";
import { HubConnectionState } from "@microsoft/signalr";
import { QuizSessionState } from "../../../features/quizzes/types/quizSession";
import {
    ParticipantLayout,
    LoadingState,
    ErrorState,
    WaitingToStartState,
    ActiveQuestionState,
    EndedState,
} from "@/features/quizzes/components/participant";
import { ParticipantQuestionTransition } from "@/features/quizzes/components/participant/ParticipantQuestionTransition";

export const ParticipateQuizPage = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const {
        quizTitle,
        currentQuestion,
        selectedOption,
        sessionState,
        hasSubmitted,
        timeRemaining,
        feedback,
        error,
        isLoading,
        connectionState,
        selectOption,
        submitAnswer,
        score,
        participants,
    } = useParticipateQuiz({ sessionId });

    const showWaitingToStart = sessionState === QuizSessionState.WaitingToStart;
    const showBetweenQuestions =
        sessionState === QuizSessionState.BetweenQuestions;
    const showEnded = sessionState === QuizSessionState.Ended;

    // Show loading state - but only if not ended
    if (isLoading && !showEnded) {
        return <LoadingState />;
    }

    // Show connection error - but only if not ended
    if (error && !showEnded) {
        return <ErrorState error={error} />;
    }

    // Show reconnecting state - but only if not ended
    if (connectionState === HubConnectionState.Reconnecting && !showEnded) {
        return <LoadingState message="Reconnecting to quiz session..." />;
    }

    // Wrap the content in the participant layout
    return (
        <ParticipantLayout>
            {/* Waiting to start */}
            {showWaitingToStart && (
                <WaitingToStartState quizTitle={quizTitle} score={score} />
            )}

            {/* Between questions */}
            {showBetweenQuestions && (
                <ParticipantQuestionTransition
                    quizTitle={quizTitle}
                    score={score}
                    currentQuestion={currentQuestion}
                    selectedOption={selectedOption}
                    feedback={feedback}
                    participants={participants || []}
                />
            )}

            {/* Session ended */}
            {showEnded && (
                <EndedState 
                    quizTitle={quizTitle}
                    score={score}
                    participants={participants || []}
                />
            )}

            {/* Active question */}
            {!showWaitingToStart && !showBetweenQuestions && !showEnded && (
                <ActiveQuestionState
                    quizTitle={quizTitle}
                    score={score}
                    currentQuestion={currentQuestion}
                    selectedOption={selectedOption}
                    hasSubmitted={hasSubmitted}
                    timeRemaining={timeRemaining}
                    onSelectOption={selectOption}
                    onSubmitAnswer={submitAnswer}
                />
            )}
        </ParticipantLayout>
    );
};
