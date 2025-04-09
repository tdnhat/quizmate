import { Button } from "@/components/ui/button";
import {
    RefreshCcw,
    Play,
    ExternalLink,
    Pause,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ParticipantsList from "./ParticipantList";
import { useHostQuiz } from "../../hooks";
import QuestionDisplay from "./QuestionDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JoinInformation from "./JoinInformation";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
import QuizSessionBreadcrumb from "./QuizSessionBreadcrumb";

const HostQuizContainer = () => {
    const {
        quiz,
        sessionId,
        hostId,
        participants,
        currentQuestion,
        isLoading,
        isSessionStarted,
        startSession,
        nextQuestion,
        endSession,
        error,
    } = useHostQuiz();
    const navigate = useNavigate();
    const [isRefreshingParticipants, setIsRefreshingParticipants] =
        useState(false);

    if (!quiz) {
        return <div>No quiz found</div>;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-16">
                <DotLoader />
            </div>
        );
    }

    const handleEndSession = async () => {
        await endSession();
        navigate(`/quizzes/${quiz.slug}`);
    };

    // Refresh participants only instead of full page reload
    const handleRefresh = () => {
        setIsRefreshingParticipants(true);
        setTimeout(() => {
            setIsRefreshingParticipants(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <QuizSessionBreadcrumb quiz={quiz} />
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">
                            Quiz Session Dashboard
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                            {quiz.title}
                        </p>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {!isSessionStarted ? (
                    <>
                        {/* First column - Participants */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Join Information */}
                            <JoinInformation sessionId={sessionId} />
                            <Card>
                                <CardContent>
                                    {isRefreshingParticipants ? (
                                        <div className="flex justify-center items-center py-6">
                                            <DotLoader />
                                        </div>
                                    ) : (
                                        <ParticipantsList
                                            participants={participants}
                                            onRefresh={handleRefresh}
                                            hostId={hostId}
                                        />
                                    )}
                                </CardContent>
                            </Card>

                            {error && (
                                <Card className="border-red-200 bg-red-50 mt-6">
                                    <CardContent className="p-4">
                                        <p className="mb-2 font-semibold text-red-700">
                                            Error: {error}
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                            size="sm"
                                        >
                                            <RefreshCcw className="h-4 w-4 mr-2" />
                                            Refresh Connection
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Second column - Join Info & Controls */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Controls</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button
                                        size="lg"
                                        className="w-full text-md py-6 bg-cyan-600 text-white cursor-pointer hover:shadow hover:bg-cyan-700 transition-colors"
                                        onClick={startSession}
                                        disabled={isLoading}
                                    >
                                        <Play className="mr-2 h-5 w-5" />
                                        Start Session
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full text-md py-6 cursor-pointer border border-gray-200 hover:shadow transition-colors"
                                        onClick={handleEndSession}
                                    >
                                        <Pause className="mr-2 h-5 w-5" />
                                        End Session
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quiz Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Quiz Title
                                        </p>
                                        <p className="font-medium">
                                            {quiz.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Questions
                                        </p>
                                        <p className="font-medium">
                                            {quiz.questionCount ||
                                                quiz.questions?.length ||
                                                0}{" "}
                                            questions
                                        </p>
                                    </div>
                                    {quiz.timeMinutes && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Time Limit
                                            </p>
                                            <p className="font-medium">
                                                {quiz.timeMinutes} minutes
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Created By
                                        </p>
                                        <p className="font-medium">
                                            {quiz.appUser?.displayName || "You"}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/quizzes/${quiz.slug}`}
                                        className="cursor-pointer text-sm hover:underline text-blue-500 hover:text-blue-600 flex items-center"
                                    >
                                        View Quiz Details
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="lg:col-span-2">
                            <QuestionDisplay
                                currentQuestion={currentQuestion}
                                onNextQuestion={nextQuestion}
                                onEndSession={handleEndSession}
                                isLoading={isLoading}
                                questionNumber={
                                    currentQuestion?.questionIndex ?? 0
                                }
                                totalQuestions={quiz.questions?.length ?? 0}
                                participants={participants}
                                autoTransitionDuration={30}
                                betweenQuestionsDuration={5}
                            />
                        </div>
                        <div>
                            <Card>
                                <CardContent>
                                    <ParticipantsList
                                        participants={participants}
                                        onRefresh={handleRefresh}
                                        showScores={true}
                                        hostId={hostId}
                                        isSearchable={false}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HostQuizContainer;
