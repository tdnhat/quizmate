import { Card, CardContent } from "@/components/ui/card";
import { useTakeQuiz } from "@/features/quizzes/hooks/useTakeQuiz";
import QuestionNumber from "./QuestionNumber";
import QuestionText from "./QuestionText";
import QuestionImage from "./QuestionImage";
import AnswersList from "./AnswersList";
import NavigationButtons from "./NavigationButtons";
import FlagButton from "./FlagButton";

const QuestionDisplay = () => {
    const { getCurrentQuestion } = useTakeQuiz();

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
        return <div>No question found</div>;
    }

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <QuestionNumber />
                        <div className="flex items-center justify-between w-full gap-2">
                            <QuestionText />
                            <FlagButton />
                        </div>
                    </div>

                    {currentQuestion.image && <QuestionImage />}

                    <AnswersList />
                    <NavigationButtons />
                </div>
            </CardContent>
        </Card>
    );
};

export default QuestionDisplay;
