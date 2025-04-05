import { Button } from "@/components/ui/button";
import { RefreshCcw, Play, Square, Clock, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ParticipantsList from "./ParticipantList";
import useHostQuiz from "../../hooks/useHostQuiz";
import QuestionDisplay from "./QuestionDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JoinInformation from "./JoinInformation";

const HostQuizContainer = () => {
    const {
        quiz,
        sessionId,
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
    const [sessionTime, setSessionTime] = useState(0);

    // Session timer
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isSessionStarted) {
            interval = setInterval(() => {
                setSessionTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isSessionStarted]);

    // Format session time as mm:ss
    const formatSessionTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    if (!quiz) {
        return <div>No quiz found</div>;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                    <p>Loading session...</p>
                </div>
            </div>
        );
    }

    const handleEndSession = async () => {
        await endSession();
        navigate(`/quizzes/${quiz.slug}`);
    };

    // Force page refresh to reset the connection
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-2xl">
                            Quiz Session Dashboard
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                            {quiz.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <span className="text-sm text-muted-foreground">
                                SESSION TIME
                            </span>
                            <p className="font-mono text-xl">
                                {formatSessionTime(sessionTime)}
                            </p>
                        </div>
                        {!isSessionStarted && (
                            <Badge variant="outline">Inactive</Badge>
                        )}
                        {isSessionStarted && (
                            <Badge className="bg-green-100 text-green-800">
                                Active
                            </Badge>
                        )}
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
                                <CardContent className="p-6">
                                    <ParticipantsList
                                        participants={participants}
                                        onRefresh={handleRefresh}
                                    />
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
                                            onClick={handleRefresh}
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
                            {/* Quiz Controls - Now at top */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Controls</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={startSession}
                                        disabled={isLoading}
                                    >
                                        <Play className="mr-2 h-5 w-5" />
                                        Start Quiz for All Participants
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleEndSession}
                                    >
                                        <Square className="mr-2 h-5 w-5" />
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
                                    <Button
                                        variant="link"
                                        className="p-0 h-auto"
                                        onClick={() =>
                                            navigate(`/quizzes/${quiz.slug}`)
                                        }
                                    >
                                        View Quiz Details{" "}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Session Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Session Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-xs uppercase text-blue-700">
                                                PARTICIPANTS
                                            </p>
                                            <p className="text-3xl font-bold text-blue-700">
                                                {participants.length}
                                            </p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-xs uppercase text-green-700">
                                                COMPLETED
                                            </p>
                                            <p className="text-3xl font-bold text-green-700">
                                                {isSessionStarted
                                                    ? currentQuestion?.questionIndex ||
                                                      0
                                                    : 0}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg col-span-2">
                                            <p className="text-xs uppercase text-purple-700">
                                                AVG. SCORE
                                            </p>
                                            <p className="text-3xl font-bold text-purple-700">
                                                --
                                            </p>
                                        </div>
                                    </div>
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
                            />
                        </div>
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <ParticipantsList
                                        participants={participants}
                                        onRefresh={handleRefresh}
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
