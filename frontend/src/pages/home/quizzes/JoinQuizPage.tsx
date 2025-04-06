import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useJoinQuiz } from "@/features/quizzes/hooks";
import {
    JoinQuizLayout,
    JoinQuizCard,
    AuthRequired,
    SessionInfo,
    LoadingState,
    ErrorState,
} from "@/features/quizzes/components/join";

export const JoinQuizPage = () => {
    const { joinCode } = useParams<{ joinCode: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { sessionInfo, isLoading, error, handleJoin } = useJoinQuiz({
        joinCode,
    });

    const onJoinClick = () => {
        handleJoin(navigate);
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (error && isAuthenticated) {
        return <ErrorState error={error} />;
    }

    return (
        <JoinQuizLayout>
            <JoinQuizCard
                title="Join Quiz"
                sessionInfo={sessionInfo}
                buttonText={isAuthenticated ? "Join Quiz" : "Sign in to Join"}
                onButtonClick={onJoinClick}
            >
                {!isAuthenticated ? (
                    <AuthRequired joinCode={joinCode} />
                ) : sessionInfo ? (
                    <SessionInfo sessionInfo={sessionInfo} />
                ) : error ? (
                    <ErrorState error={error} isFullPage={false} />
                ) : (
                    <div className="text-center">
                        <p>
                            Quiz information will appear here once you sign
                            in.
                        </p>
                    </div>
                )}
            </JoinQuizCard>
        </JoinQuizLayout>
    );
};
