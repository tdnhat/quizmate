import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/types/quiz";
import QuizCTAButton from "./QuizCTAButton";
import QuizStatistics from "./QuizStatistics";
interface QuizActionCardProps {
    quiz: Quiz;
}

const QuizActionCard = ({ quiz }: QuizActionCardProps) => {
    return (
        <Card>
            <CardContent className="space-y-4">
                <QuizCTAButton />
                <QuizStatistics quiz={quiz} />
            </CardContent>
        </Card>
    );
};

export default QuizActionCard;
