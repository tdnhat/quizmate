import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuestionGrid from "./QuestionGrid";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import QuestionLegend from "./QuestionLegend";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/shared/components/LoadingIndicator";
import QuizSummary from "./QuizSummary";
import { toast } from "react-hot-toast";
const QuestionOverview = () => {
    const { submitQuiz, quiz, isSubmitting } = useTakeQuiz();
    const navigate = useNavigate();

    const handleSubmitQuiz = async () => {
        try {
            const resultId = await submitQuiz();
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate(`/quizzes/${quiz.slug}/results/${resultId}`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            toast.error("Error submitting quiz");
        }
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-cyan-600">Question Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between space-y-3 flex-1">
                <QuestionGrid />

                <Separator />

                {/* Question Legends */}
                <QuestionLegend />

                <Separator />

                {/* Quiz Summary */}
                <QuizSummary />

                <Button
                    onClick={handleSubmitQuiz}
                    disabled={isSubmitting}
                    className="bg-cyan-600 w-full hover:bg-cyan-700 text-white hover:cursor-pointer transition-colors"
                >
                    {isSubmitting ? (
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
