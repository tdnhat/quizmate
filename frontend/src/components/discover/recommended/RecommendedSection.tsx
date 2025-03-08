import { ArrowRight } from "lucide-react";
import SectionHeader from "../../layout/SectionHeader";
import { useQuizzes } from "@/hooks/useQuizzes";
import QuizGrid from "@/components/layout/QuizGrid";

const RECOMMENDED_QUIZ_COUNT = 16;

const RecommendedSection = () => {
    // Mock data for recommended quizzes
    const { quizzes, isLoading } = useQuizzes();
    const recommendedQuizzes = quizzes.slice(0, RECOMMENDED_QUIZ_COUNT);

    return (
        <div className="flex flex-col w-full mt-8">
            <SectionHeader
                title="Recommended for you"
                actionLink="/quizzes"
                actionText="View all"
                icon={<ArrowRight size={16} />}
            />

            <QuizGrid
                quizzes={recommendedQuizzes}
                isLoading={isLoading}
                count={RECOMMENDED_QUIZ_COUNT}
            />
        </div>
    );
};

export default RecommendedSection;
