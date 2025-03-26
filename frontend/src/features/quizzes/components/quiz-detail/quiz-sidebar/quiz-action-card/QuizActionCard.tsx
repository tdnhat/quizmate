import { Card, CardContent } from "@/components/ui/card";
import QuizCTAButton from "./QuizCTAButton";
import QuizStatistics from "./QuizStatistics";

const QuizActionCard = () => {
    return (
        <Card>
            <CardContent className="space-y-4">
                <QuizCTAButton />
                <QuizStatistics />
            </CardContent>
        </Card>
    );
};

export default QuizActionCard;
