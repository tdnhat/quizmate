import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuestionGrid from "./QuestionGrid";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import QuestionLegend from "./QuestionLegend";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingIndicator from "@/components/shared/components/LoadingIndicator";
import QuizSummary from "./QuizSummary";

const QuestionOverview = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { submitQuiz, quiz } = useTakeQuiz();
    const navigate = useNavigate();

    const handleSubmitQuiz = async () => {
        try {
            setIsLoading(true);
            // await submitQuiz();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Quiz submitted successfully");
            navigate(`/quizzes/${quiz.id}/results`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Question Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <QuestionGrid />

                <Separator />

                {/* Question Legends */}
                <QuestionLegend />

                <Separator />

                {/* Quiz Summary */}
                <QuizSummary />

                <Separator />

                <Button
                    onClick={handleSubmitQuiz}
                    disabled={isLoading}
                    className="bg-cyan-500 w-full hover:bg-cyan-600 text-white hover:cursor-pointer transition-colors"
                >
                    {isLoading ? (
                        <>
                            <LoadingIndicator />
                            <span>Submitting...</span>
                        </>
                    ) : (
                        "Submit Quiz"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default QuestionOverview;
