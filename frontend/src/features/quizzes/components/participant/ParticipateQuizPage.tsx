import { useParams } from "react-router-dom";
import { useParticipateQuiz } from "../../hooks/participant/useParticipateQuiz";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Clock, CheckCircle, Award, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HubConnectionState } from "@microsoft/signalr";
import { QuizSessionState } from "../../types/quizSession";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
    } = useParticipateQuiz({ sessionId });

    const showWaitingToStart = sessionState === QuizSessionState.WaitingToStart;
    const showBetweenQuestions = sessionState === QuizSessionState.BetweenQuestions;
    const showEnded = sessionState === QuizSessionState.Ended;
    const showShowingResults = sessionState === QuizSessionState.ShowingResults;

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg">Connecting to quiz session...</p>
                </div>
            </div>
        );
    }

    // Show connection error
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    // Show reconnecting state
    if (connectionState === HubConnectionState.Reconnecting) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg">Reconnecting to quiz session...</p>
                </div>
            </div>
        );
    }

    // Waiting to start
    if (showWaitingToStart) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{quizTitle}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>Score: {score}</span>
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-4">
                            <p>Waiting for the host to start the quiz...</p>
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Between questions
    if (showBetweenQuestions) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{quizTitle}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>Score: {score}</span>
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-lg font-medium mb-2">Get ready for the next question</p>
                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        </div>
                        
                        {currentQuestion && feedback && (
                            <div className="space-y-6 border p-4 rounded-lg shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="mr-2">
                                        {feedback.isCorrect ? (
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-600" />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
                                </div>
                                
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option) => {
                                        // Determine if this is the selected option
                                        const isSelectedOption = selectedOption === option.id;
                                        
                                        let optionClassName = "p-3 rounded-md border";
                                        
                                        if (isSelectedOption && feedback.isCorrect) {
                                            // Selected and correct
                                            optionClassName += " bg-green-50 border-green-300";
                                        } else if (isSelectedOption && !feedback.isCorrect) {
                                            // Selected but wrong
                                            optionClassName += " bg-red-50 border-red-300";
                                        } else {
                                            // Not selected
                                            optionClassName += " border-gray-200";
                                        }
                                        
                                        return (
                                            <div key={option.id} className={optionClassName}>
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 mr-2">
                                                        {isSelectedOption && feedback.isCorrect && (
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        )}
                                                        {isSelectedOption && !feedback.isCorrect && (
                                                            <XCircle className="h-4 w-4 text-red-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-grow">
                                                        {option.text}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className={cn(
                                    "p-4 rounded-md text-center font-medium",
                                    feedback.timedOut
                                        ? "bg-amber-100 text-amber-800"
                                        : feedback.isCorrect
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                )}>
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
                                            <p>You earned {feedback.points} points</p>
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
                            </div>
                        )}
                        
                        {feedback && !currentQuestion && (
                            <div
                                className={cn(
                                    "mt-6 p-4 rounded-md text-center",
                                    feedback.timedOut
                                        ? "bg-amber-100 text-amber-800"
                                        : feedback.isCorrect
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                )}
                            >
                                <p className="font-bold">
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
                                        <p>You earned {feedback.points} points</p>
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
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Session ended
    if (showEnded) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{quizTitle}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>Score: {score}</span>
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-4">
                            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                            <p className="text-xl font-bold">Quiz Completed!</p>
                            <p>Thank you for participating.</p>
                            {feedback && (
                                <div
                                    className={cn(
                                        "mt-6 p-4 rounded-md text-center",
                                        feedback.timedOut
                                            ? "bg-amber-100 text-amber-800"
                                            : feedback.isCorrect
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                    )}
                                >
                                    <p className="font-bold">
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
                                            <p>You earned {feedback.points} points on your last answer</p>
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
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Showing results
    if (showShowingResults) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{quizTitle}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>Score: {score}</span>
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-4">
                            <p>Results are being displayed</p>
                            <p className="text-sm text-muted-foreground">
                                Wait for the host to continue to the next
                                question or end the quiz
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Active question
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                        <CardTitle>{quizTitle}</CardTitle>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>Score: {score}</span>
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Clock className={cn(
                                "h-4 w-4",
                                timeRemaining <= 5 
                                    ? "text-red-600 animate-pulse" 
                                    : timeRemaining <= 10 
                                        ? "text-yellow-600" 
                                        : "text-gray-600"
                            )} />
                            <span className={cn(
                                timeRemaining <= 5 
                                    ? "text-red-600 font-bold" 
                                    : timeRemaining <= 10 
                                        ? "text-yellow-600 font-semibold" 
                                        : "text-gray-600"
                            )}>
                                {timeRemaining}s
                            </span>
                        </div>
                    </div>
                    <Progress
                        value={
                            (timeRemaining /
                                (currentQuestion?.timeLimit || 1)) *
                            100
                        }
                        className={cn(
                            timeRemaining <= 5 
                                ? "bg-red-200" 
                                : timeRemaining <= 10 
                                    ? "bg-yellow-200" 
                                    : undefined
                        )}
                    />
                </CardHeader>
                <CardContent>
                    {currentQuestion && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-medium mb-4">
                                    {currentQuestion.text}
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => selectOption(option.id)}
                                        disabled={hasSubmitted}
                                        className={cn(
                                            "w-full p-4 rounded-md border text-left transition",
                                            selectedOption === option.id
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50 hover:bg-muted"
                                        )}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        disabled={!selectedOption || hasSubmitted}
                        onClick={submitAnswer}
                    >
                        Submit Answer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}; 