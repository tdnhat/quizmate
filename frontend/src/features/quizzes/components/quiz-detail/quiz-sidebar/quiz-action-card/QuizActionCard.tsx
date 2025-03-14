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
                <QuizCTAButton quizId={quiz.id} />
                <QuizStatistics
                    timeMinutes={quiz.timeMinutes}
                    questionCount={quiz.questions?.length || 0}
                    difficulty={quiz.difficulty}
                    tags={quiz.tags}
                    author={quiz.author}
                />
            </CardContent>
        </Card>
    );
};

export default QuizActionCard;
