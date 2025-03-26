import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useQuizzes } from "@/features/quizzes/hooks/useQuizzes";
import QuizGrid from "../../quizzes/components/quiz-card/QuizGrid";
import ErrorMessage from "@/components/shared/components/ErrorMessage";

const RECOMMENDED_QUIZ_COUNT = 16;

const RecommendedSection = () => {
    // Mock data for recommended quizzes
    const { quizzes, isLoading, error } = useQuizzes();

    if (error) {
        return (
            <div className="flex flex-col w-full">
                <SectionHeader
                    title="Recommended for you"
                    actionLink="/quizzes"
                    actionText="View all"
                    icon={<ArrowRight size={16} />}
                />
                <ErrorMessage message={error} />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full mt-8">
            <SectionHeader
                title="Recommended for you"
                actionLink="/quizzes"
                actionText="View all"
                icon={<ArrowRight size={16} />}
            />

            <QuizGrid
                quizzes={quizzes}
                isLoading={isLoading}
                count={RECOMMENDED_QUIZ_COUNT}
            />
        </div>
    );
};

export default RecommendedSection;
