import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, LogIn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useJoinQuiz } from "../../hooks/participant";

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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg">Loading quiz information...</p>
                </div>
            </div>
        );
    }

    if (error && isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Join Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    {!isAuthenticated ? (
                        <div className="space-y-4">
                            <div className="flex flex-col items-center gap-3">
                                <LogIn className="h-12 w-12 text-primary" />
                                <h2 className="text-xl font-semibold">
                                    Authentication Required
                                </h2>
                            </div>
                            <p className="text-center">
                                You need to sign in to join this quiz session.
                            </p>
                            {joinCode && (
                                <div className="bg-muted p-4 rounded-md text-center">
                                    <p className="text-sm">
                                        You'll be redirected back to this page
                                        after signing in.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : sessionInfo ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">
                                    {sessionInfo.quizTitle}
                                </h2>
                                <p className="text-muted-foreground mt-1">
                                    Hosted by {sessionInfo.hostId}
                                </p>
                            </div>

                            <div className="bg-muted p-4 rounded-md">
                                <p className="text-sm">
                                    Click the button below to join this quiz and
                                    start answering questions!
                                </p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-destructive">
                            <AlertTriangle className="h-10 w-10 mx-auto mb-2" />
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>
                                Quiz information will appear here once you sign
                                in.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={onJoinClick}>
                        {isAuthenticated ? "Join Quiz" : "Sign in to Join"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}; 