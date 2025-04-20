import { Card, CardContent } from "@/components/ui/card";
import BetweenQuestionsCountdown from "./BetweenQuestionsCountdown";
import { Button } from "@/components/ui/button";

interface BetweenQuestionsStateProps {
    onNextQuestion: () => void;
    currentQuestionNumber: number;
    totalQuestions: number;
    countdownSeconds?: number;
}

const BetweenQuestionsState = ({
    onNextQuestion,
    currentQuestionNumber,
    totalQuestions,
    countdownSeconds = 5,
}: BetweenQuestionsStateProps) => {
    return (
        <Card className="w-full max-w-4xl mx-auto bg-white shadow-md overflow-hidden">
            <CardContent>
                <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">
                        Question {currentQuestionNumber} of {totalQuestions}{" "}
                        completed
                    </p>
                    <h2 className="text-xl font-semibold mt-1">
                        Get ready for the next question!
                    </h2>
                </div>

                <BetweenQuestionsCountdown
                    seconds={countdownSeconds}
                    onComplete={onNextQuestion}
                    className="my-8"
                />

                <div className="text-center mt-4 text-sm text-gray-600">
                    <p>Prepare yourself...</p>
                </div>

                <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={onNextQuestion} className="cursor-pointer">
                        Skip
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BetweenQuestionsState;
